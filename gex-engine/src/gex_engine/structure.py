"""Market-structure levels from a price series: PDH/PDL, ATR bands, VWAP."""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime

from gex_engine.models import Bar, SessionSnapshot, StructureRegime, StructureSnapshot, VolRegime
from gex_engine.session import utc
from gex_engine.volatility import atr, atr_bands, classify_vol_regime, realized_vol


def _date_key(ts: datetime) -> str:
    return utc(ts).date().isoformat()


def _group_days(bars: list[Bar]) -> dict[str, list[Bar]]:
    grouped: dict[str, list[Bar]] = defaultdict(list)
    for bar in sorted(bars, key=lambda b: utc(b.timestamp)):
        grouped[_date_key(bar.timestamp)].append(bar)
    return grouped


def previous_day_levels(bars: list[Bar], *, now: datetime) -> tuple[float | None, float | None, float | None]:
    days = _group_days(bars)
    if not days:
        return None, None, None
    today = utc(now).date().isoformat()
    keys = [k for k in sorted(days) if k < today] or sorted(days)[:-1]
    if not keys:
        return None, None, None
    prev = days[keys[-1]]
    return max(b.high for b in prev), min(b.low for b in prev), prev[0].open


def session_vwap(bars: list[Bar], *, now: datetime) -> float | None:
    today = [b for b in bars if _date_key(b.timestamp) == utc(now).date().isoformat()]
    if not today:
        return None
    num = 0.0
    den = 0.0
    for bar in today:
        typical = (bar.high + bar.low + bar.close) / 3.0
        vol = bar.volume if bar.volume > 0 else 1.0
        num += typical * vol
        den += vol
    if den <= 0:
        return None
    return num / den


def classify_structure(
    spot: float,
    pdh: float | None,
    pdl: float | None,
    vwap: float | None,
    session: SessionSnapshot,
) -> StructureRegime:
    """Descriptive regime from price vs levels. Not a directional trade rule."""
    asia = session.asia
    london = session.london
    if (
        asia.low is not None
        and asia.high is not None
        and london.high is not None
        and london.low is not None
        and london.high > asia.high
        and london.low >= (asia.low or london.low)
        and spot >= (london.open or spot)
    ):
        return StructureRegime.BREAKOUT
    if (
        asia.high is not None
        and asia.low is not None
        and london.low is not None
        and london.high is not None
        and london.low < asia.low
        and london.high <= (asia.high or london.high)
        and spot <= (london.open or spot)
    ):
        return StructureRegime.BREAKDOWN
    if pdh is not None and pdl is not None:
        mid = 0.5 * (pdh + pdl)
        width = pdh - pdl
        if width > 0 and spot > pdh:
            return StructureRegime.TRENDING_BULLISH
        if width > 0 and spot < pdl:
            return StructureRegime.TRENDING_BEARISH
        if width > 0 and abs(spot - mid) <= 0.35 * width:
            return StructureRegime.RANGE
    if vwap is not None:
        if spot > vwap * 1.001:
            return StructureRegime.TRENDING_BULLISH
        if spot < vwap * 0.999:
            return StructureRegime.TRENDING_BEARISH
    return StructureRegime.UNKNOWN


def build_structure(
    bars: list[Bar],
    *,
    spot: float,
    now: datetime,
    session: SessionSnapshot,
    highs: list[float] | None = None,
    lows: list[float] | None = None,
    closes: list[float] | None = None,
) -> StructureSnapshot:
    series_highs = highs if highs else [b.high for b in bars]
    series_lows = lows if lows else [b.low for b in bars]
    series_closes = closes if closes else [b.close for b in bars]
    atr5 = atr(series_highs, series_lows, series_closes, period=5)
    atr14 = atr(series_highs, series_lows, series_closes, period=14)
    atr20 = atr(series_highs, series_lows, series_closes, period=20)
    pdh, pdl, daily_open = previous_day_levels(bars, now=now)
    vwap = session_vwap(bars, now=now)
    band1_h = band1_l = band2_h = band2_l = None
    if atr14 and atr14 > 0:
        band1_h, band1_l = atr_bands(spot, atr14, 1.0)
        band2_h, band2_l = atr_bands(spot, atr14, 2.0)

    today = [b for b in bars if _date_key(b.timestamp) == utc(now).date().isoformat()]
    consumed = None
    remaining = None
    if today and atr14 and atr14 > 0:
        day_range = max(b.high for b in today) - min(b.low for b in today)
        consumed = max(0.0, min(1.5, day_range / atr14))
        remaining = max(0.0, atr14 - day_range)

    vol_name = classify_vol_regime(atr14, atr20)
    try:
        vol_regime = VolRegime(vol_name)
    except ValueError:
        vol_regime = VolRegime.UNKNOWN

    return StructureSnapshot(
        pdh=pdh,
        pdl=pdl,
        daily_open=daily_open,
        vwap=round(vwap, 4) if vwap is not None else None,
        atr_5=atr5,
        atr_14=atr14,
        atr_20=atr20,
        atr_band_1_high=band1_h,
        atr_band_1_low=band1_l,
        atr_band_2_high=band2_h,
        atr_band_2_low=band2_l,
        realized_vol=realized_vol(series_closes),
        vol_regime=vol_regime,
        structure_regime=classify_structure(spot, pdh, pdl, vwap, session),
        range_consumed_pct=round(consumed, 4) if consumed is not None else None,
        expected_remaining_range=round(remaining, 4) if remaining is not None else None,
    )
