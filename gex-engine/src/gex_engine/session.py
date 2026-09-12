"""Asia / London / New York range tracking from timestamped OHLC bars.

Session windows are conventional FX/gold buckets in UTC (not exchange hours):

    ASIA      00:00–07:00 UTC
    LONDON    07:00–12:00 UTC
    NEW_YORK  12:00–21:00 UTC
    OFF       21:00–00:00 UTC

Conditional probabilities such as P(NY continuation | London expansion from
Asian low) are counted from completed session days when enough intraday bars
exist. They are never assumed. Daily bars cannot form session ranges.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime, time, timezone
from statistics import median

from gex_engine.models import (
    Bar,
    CalibrationStatus,
    SessionConditional,
    SessionName,
    SessionRange,
    SessionSnapshot,
)

# Minimum completed session-days before a conditional is labeled COMPUTED.
MIN_CONDITIONAL_SAMPLES = 20
# Show a sample rate from this many days, still tagged INSUFFICIENT_HISTORY.
MIN_SAMPLE_HINT = 5
DAILY_BAR_SECONDS = 6 * 3600

ASIA_START = time(0, 0)
LONDON_START = time(7, 0)
NY_START = time(12, 0)
NY_END = time(21, 0)


def utc(ts: datetime) -> datetime:
    if ts.tzinfo is None:
        return ts.replace(tzinfo=timezone.utc)
    return ts.astimezone(timezone.utc)


def session_at(ts: datetime) -> SessionName:
    clock = utc(ts).timetz().replace(tzinfo=None)
    if ASIA_START <= clock < LONDON_START:
        return SessionName.ASIA
    if LONDON_START <= clock < NY_START:
        return SessionName.LONDON
    if NY_START <= clock < NY_END:
        return SessionName.NEW_YORK
    return SessionName.OFF


def infer_bar_seconds(bars: list[Bar]) -> float | None:
    if len(bars) < 2:
        return None
    ordered = sorted(bars, key=lambda b: utc(b.timestamp))
    deltas = [
        (utc(ordered[i].timestamp) - utc(ordered[i - 1].timestamp)).total_seconds()
        for i in range(1, len(ordered))
    ]
    positive = [d for d in deltas if d > 0]
    if not positive:
        return None
    return float(median(positive))


def bars_from_hlc(
    highs: list[float],
    lows: list[float],
    closes: list[float],
    *,
    end: datetime | None = None,
) -> list[Bar]:
    """Daily placeholder bars when only H/L/C series exist (no session resolution)."""
    n = min(len(highs), len(lows), len(closes))
    if n == 0:
        return []
    end = utc(end or datetime.now(timezone.utc)).replace(hour=0, minute=0, second=0, microsecond=0)
    bars: list[Bar] = []
    for i in range(n):
        close = closes[i]
        prev = closes[i - 1] if i else close
        ts = datetime.fromtimestamp(end.timestamp() - (n - 1 - i) * 86400, tz=timezone.utc)
        bars.append(
            Bar(
                timestamp=ts,
                open=prev,
                high=highs[i],
                low=lows[i],
                close=close,
            )
        )
    return bars


def _empty_range(name: SessionName) -> SessionRange:
    return SessionRange(name=name)


def _range_from_bars(name: SessionName, bars: list[Bar], spot: float) -> SessionRange:
    if not bars:
        return _empty_range(name)
    high = max(b.high for b in bars)
    low = min(b.low for b in bars)
    return SessionRange(
        name=name,
        open=bars[0].open,
        high=high,
        low=low,
        close=bars[-1].close,
        range=round(high - low, 4),
        distance_high=round(high - spot, 4),
        distance_low=round(spot - low, 4),
    )


def _session_day_key(ts: datetime) -> str:
    """Gold 'day' anchored at 00:00 UTC so Asia/London/NY of the same calendar date group together."""
    return utc(ts).date().isoformat()


def _group_session_days(bars: list[Bar]) -> dict[str, dict[SessionName, list[Bar]]]:
    grouped: dict[str, dict[SessionName, list[Bar]]] = defaultdict(lambda: defaultdict(list))
    for bar in sorted(bars, key=lambda b: utc(b.timestamp)):
        name = session_at(bar.timestamp)
        if name is SessionName.OFF:
            continue
        grouped[_session_day_key(bar.timestamp)][name].append(bar)
    return grouped


def _ohlc(bars: list[Bar]) -> tuple[float, float, float, float] | None:
    if not bars:
        return None
    return bars[0].open, max(b.high for b in bars), min(b.low for b in bars), bars[-1].close


def _london_expanded_from_asian_low(asia: tuple, london: tuple) -> bool:
    _ao, ah, al, _ac = asia
    _lo, lh, ll, _lc = london
    asian_range = ah - al
    if asian_range <= 0:
        return False
    broke_high = lh > ah
    held_low = ll >= al - 0.15 * asian_range
    return broke_high and held_low


def _london_expanded_from_asian_high(asia: tuple, london: tuple) -> bool:
    _ao, ah, al, _ac = asia
    _lo, lh, ll, _lc = london
    asian_range = ah - al
    if asian_range <= 0:
        return False
    broke_low = ll < al
    held_high = lh <= ah + 0.15 * asian_range
    return broke_low and held_high


def _conditional(
    name: str,
    given: str,
    hits: int,
    n: int,
    note: str,
) -> SessionConditional:
    if n < MIN_SAMPLE_HINT:
        return SessionConditional(
            name=name,
            given=given,
            n=n,
            p=None,
            status=CalibrationStatus.INSUFFICIENT_HISTORY,
            note=note + " Not enough completed session days in the bar window.",
        )
    p = hits / n if n else None
    status = (
        CalibrationStatus.SAMPLE_COMPUTED
        if n >= MIN_CONDITIONAL_SAMPLES
        else CalibrationStatus.INSUFFICIENT_HISTORY
    )
    if status is CalibrationStatus.INSUFFICIENT_HISTORY:
        note = note + f" Sample p shown for n={n}; need {MIN_CONDITIONAL_SAMPLES} days to treat as calibrated."
    return SessionConditional(name=name, given=given, n=n, p=p, status=status, note=note)


def session_conditionals(bars: list[Bar]) -> list[SessionConditional]:
    """Count historical session paths from the bars that exist. Never invent a prior."""
    days = _group_session_days(bars)
    ny_cont_up_hits = ny_cont_up_n = 0
    ny_cont_dn_hits = ny_cont_dn_n = 0
    london_from_asia_low_hits = london_from_asia_low_n = 0
    london_from_asia_high_hits = london_from_asia_high_n = 0

    for _day, sessions in days.items():
        asia = _ohlc(sessions.get(SessionName.ASIA, []))
        london = _ohlc(sessions.get(SessionName.LONDON, []))
        ny = _ohlc(sessions.get(SessionName.NEW_YORK, []))
        if asia and london:
            london_from_asia_low_n += 1
            if _london_expanded_from_asian_low(asia, london):
                london_from_asia_low_hits += 1
                if ny:
                    ny_cont_up_n += 1
                    if ny[1] > london[1]:
                        ny_cont_up_hits += 1
            london_from_asia_high_n += 1
            if _london_expanded_from_asian_high(asia, london):
                london_from_asia_high_hits += 1
                if ny:
                    ny_cont_dn_n += 1
                    if ny[2] < london[2]:
                        ny_cont_dn_hits += 1

    return [
        _conditional(
            "P(London expansion from Asian low)",
            "Asia range complete",
            london_from_asia_low_hits,
            london_from_asia_low_n,
            "Counted only when both Asia and London session bars exist for the same UTC day.",
        ),
        _conditional(
            "P(NY continuation | London expansion from Asian low)",
            "London high > Asian high and London held Asian low",
            ny_cont_up_hits,
            ny_cont_up_n,
            "NY high prints above London high after a London expansion from the Asian low.",
        ),
        _conditional(
            "P(London expansion from Asian high)",
            "Asia range complete",
            london_from_asia_high_hits,
            london_from_asia_high_n,
            "Counted only when both Asia and London session bars exist for the same UTC day.",
        ),
        _conditional(
            "P(NY continuation | London expansion from Asian high)",
            "London low < Asian low and London held Asian high",
            ny_cont_dn_hits,
            ny_cont_dn_n,
            "NY low prints below London low after a London breakdown from the Asian high.",
        ),
    ]


def build_session(bars: list[Bar], *, now: datetime, spot: float) -> SessionSnapshot:
    now = utc(now)
    bar_seconds = infer_bar_seconds(bars)
    intraday = bar_seconds is not None and bar_seconds < DAILY_BAR_SECONDS
    if not bars or not intraday:
        return SessionSnapshot(
            current=session_at(now),
            intraday_available=False,
            bar_seconds=bar_seconds,
            asia=_empty_range(SessionName.ASIA),
            london=_empty_range(SessionName.LONDON),
            new_york=_empty_range(SessionName.NEW_YORK),
            conditionals=[
                SessionConditional(
                    name="P(NY continuation | London expansion from Asian low)",
                    given="intraday session bars",
                    n=0,
                    p=None,
                    status=CalibrationStatus.INSUFFICIENT_HISTORY,
                    note="Session conditionals need timestamped intraday bars (e.g. 15m). Daily H/L/C cannot form Asia/London/NY ranges.",
                )
            ],
        )

    today = _group_session_days([b for b in bars if _session_day_key(b.timestamp) == now.date().isoformat()])
    sessions = today.get(now.date().isoformat(), {})
    return SessionSnapshot(
        current=session_at(now),
        intraday_available=True,
        bar_seconds=bar_seconds,
        asia=_range_from_bars(SessionName.ASIA, sessions.get(SessionName.ASIA, []), spot),
        london=_range_from_bars(SessionName.LONDON, sessions.get(SessionName.LONDON, []), spot),
        new_york=_range_from_bars(SessionName.NEW_YORK, sessions.get(SessionName.NEW_YORK, []), spot),
        conditionals=session_conditionals(bars),
    )
