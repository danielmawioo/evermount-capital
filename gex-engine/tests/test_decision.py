from datetime import datetime, timedelta, timezone

from gex_engine.decision import build_decision
from gex_engine.live import LiveState
from gex_engine.models import (
    AccountState,
    Bar,
    CalibrationStatus,
    DecisionAction,
    FeatureVector,
    RiskCaps,
    SessionName,
    SessionRange,
    SessionSnapshot,
    StructureSnapshot,
    UnderlyingState,
    VolRegime,
)
from gex_engine.probability import estimate_probabilities
from gex_engine.risk import assess_risk, default_caps
from gex_engine.session import build_session, session_conditionals
from gex_engine.sizing import size_position


def _utc(y, m, d, h, minute=0) -> datetime:
    return datetime(y, m, d, h, minute, tzinfo=timezone.utc)


def _intraday_day(
    day: datetime,
    *,
    asia_low: float,
    asia_high: float,
    london_high: float,
    ny_high: float,
) -> list[Bar]:
    bars: list[Bar] = []
    price = asia_low + 2
    for hour in range(0, 21):
        for minute in (0, 15, 30, 45):
            ts = day.replace(hour=hour, minute=minute)
            if hour < 7:
                high = asia_high
                low = asia_low
                close = (high + low) / 2
            elif hour < 12:
                high = london_high
                low = asia_low + 4
                close = london_high - 3
            else:
                high = ny_high
                low = london_high - 8
                close = ny_high - 5
            bars.append(Bar(timestamp=ts, open=price, high=high, low=low, close=close, volume=1000))
            price = close
    return bars


def test_sizing_respects_dollar_risk_cap_not_full_margin():
    caps = default_caps()
    result = size_position(
        account=AccountState(equity=50_000, free_margin=45_000),
        caps=caps,
        stop_distance=180.0,
        spot=4400.0,
        confidence=1.0,
        ev_r=0.80,
        allow_entry=True,
    )
    full_margin_lots = 45_000 / ((4400.0 * 100.0) / 20.0)
    assert result.lots > 0
    assert result.lots < 0.2
    assert result.lots < full_margin_lots * 0.1
    assert result.risk_amount <= caps.max_risk_per_trade + 1e-6
    assert result.utilization_pct < 100.0
    assert result.utilization_pct < caps.max_margin_utilization * 100.0 + 1e-6


def test_sizing_never_uses_full_free_margin_even_if_cap_misconfigured():
    caps = RiskCaps(
        max_risk_per_trade=1_000_000,
        max_risk_pct=1.0,
        max_margin_utilization=1.0,
        max_leverage=100,
        max_position=100,
    )
    result = size_position(
        account=AccountState(equity=50_000, free_margin=45_000),
        caps=caps,
        stop_distance=5.0,
        spot=4400.0,
        confidence=1.0,
        ev_r=1.0,
        allow_entry=True,
    )
    assert result.utilization_pct < 100.0
    assert result.lots < 45_000 / ((4400.0 * 100.0) / 20.0)


def test_kill_switch_halts():
    caps = default_caps(kill_switch=True)
    risk = assess_risk(
        account=AccountState(),
        caps=caps,
        updated_at=datetime.now(timezone.utc),
    )
    assert risk.halt is True
    assert "Kill switch" in risk.reasons[0]


def test_stale_data_halts_decision():
    now = datetime(2026, 9, 4, 15, 0, tzinfo=timezone.utc)
    state = LiveState(
        updated_at=now - timedelta(minutes=10),
        source="test",
        underlying=UnderlyingState(timestamp=now, spot=4400, futures_price=4410),
        highs=[4380 + i for i in range(20)],
        lows=[4360 + i for i in range(20)],
        closes=[4370 + i for i in range(20)],
        bars=[],
    )
    dash = build_decision(state, now=now, caps=default_caps(stale_seconds=120))
    assert dash.recommendation is DecisionAction.HALT
    assert dash.position_size.lots == 0
    assert dash.risk.stale is True
    assert dash.mode.value == "PAPER"


def test_kill_switch_halts_decision_even_with_fresh_data():
    now = datetime(2026, 9, 4, 15, 0, tzinfo=timezone.utc)
    state = LiveState(
        updated_at=now,
        source="test",
        underlying=UnderlyingState(timestamp=now, spot=4400, futures_price=4410),
        highs=[4380 + i for i in range(20)],
        lows=[4360 + i for i in range(20)],
        closes=[4370 + i for i in range(20)],
    )
    dash = build_decision(state, now=now, caps=default_caps(kill_switch=True))
    assert dash.recommendation is DecisionAction.HALT
    assert dash.position_size.lots == 0
    assert dash.dealer_positioning["status"] == "ESTIMATED"


def test_session_ranges_from_intraday_bars():
    now = _utc(2026, 9, 4, 15, 30)
    bars = _intraday_day(
        now.replace(hour=0, minute=0),
        asia_low=4300,
        asia_high=4320,
        london_high=4350,
        ny_high=4375,
    )
    session = build_session(bars, now=now, spot=4360)
    assert session.intraday_available is True
    assert session.current.value == "NEW_YORK"
    assert session.asia.low == 4300
    assert session.asia.high == 4320
    assert session.london.high == 4350
    assert session.new_york.high == 4375


def test_session_conditionals_are_not_assumed():
    start = _utc(2026, 8, 3, 0, 0)
    bars: list[Bar] = []
    for i in range(6):
        day = start + timedelta(days=i)
        bars.extend(
            _intraday_day(day, asia_low=4300, asia_high=4320, london_high=4355, ny_high=4380)
        )
    conds = {c.name: c for c in session_conditionals(bars)}
    target = conds["P(NY continuation | London expansion from Asian low)"]
    assert target.n >= 5
    assert target.status is CalibrationStatus.INSUFFICIENT_HISTORY
    assert target.p is not None


def test_probability_placeholder_not_gamma_equals_long():
    session = SessionSnapshot(
        current=SessionName.NEW_YORK,
        intraday_available=False,
        asia=SessionRange(name=SessionName.ASIA),
        london=SessionRange(name=SessionName.LONDON),
        new_york=SessionRange(name=SessionName.NEW_YORK),
    )
    structure = StructureSnapshot(vol_regime=VolRegime.NORMAL_VOL)
    features = FeatureVector(values={"gex_sign": -1.0, "range_consumed_pct": 0.2}, missing=[], notes=[])
    probs = estimate_probabilities(features, session, structure)
    assert probs.calibration is CalibrationStatus.PLACEHOLDER_PRIORS
    assert probs.directional_bias == "FLAT"
    assert 0.02 <= probs.p_breakout <= 0.98
    assert "Negative GEX" in probs.evidence[0]
