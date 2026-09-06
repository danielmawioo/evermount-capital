from datetime import datetime, timezone

import pytest

from gex_engine.gex import gamma_flip
from gex_engine.greeks import greeks
from gex_engine.max_pain import max_pain
from gex_engine.models import OptionQuote, OptionType, PositioningModel, UnderlyingState
from gex_engine.pipeline import AnalyticsEngine
from gex_engine.positioning import dealer_sign


def test_black76_gamma_is_positive_and_call_put_gamma_match():
    kwargs = dict(forward=4372.4, strike=4375, sigma=0.17, tau=24 / 365.25, rate=0.05)
    call = greeks(**kwargs, option_type=OptionType.CALL)
    put = greeks(**kwargs, option_type=OptionType.PUT)
    assert call["gamma"] > 0
    assert abs(call["gamma"] - put["gamma"]) < 1e-12
    assert call["delta"] > put["delta"]
    assert call["vanna"] == put["vanna"]


def test_gamma_flip_interpolates_zero_crossing():
    curve = [(4380.0, -100.0), (4390.0, 100.0)]
    assert abs(gamma_flip(curve) - 4385.0) < 0.01


def test_max_pain_is_the_minimum_loss_strike():
    expiry = datetime(2026, 9, 25, tzinfo=timezone.utc)
    quotes = [
        OptionQuote(expiry=expiry, strike=4370, option_type=OptionType.CALL, open_interest=10, implied_volatility=0.2),
        OptionQuote(expiry=expiry, strike=4370, option_type=OptionType.PUT, open_interest=1, implied_volatility=0.2),
        OptionQuote(expiry=expiry, strike=4375, option_type=OptionType.CALL, open_interest=1, implied_volatility=0.2),
        OptionQuote(expiry=expiry, strike=4375, option_type=OptionType.PUT, open_interest=1, implied_volatility=0.2),
        OptionQuote(expiry=expiry, strike=4380, option_type=OptionType.PUT, open_interest=10, implied_volatility=0.2),
        OptionQuote(expiry=expiry, strike=4380, option_type=OptionType.CALL, open_interest=1, implied_volatility=0.2),
    ]
    assert max_pain(quotes) == 4375


def test_standard_dealer_hedge_signs():
    assert dealer_sign(OptionType.CALL, PositioningModel.STANDARD_DEALER_HEDGE) == -1
    assert dealer_sign(OptionType.PUT, PositioningModel.STANDARD_DEALER_HEDGE) == 1
    assert dealer_sign(OptionType.PUT, PositioningModel.CUSTOMER_LONG_OPTIONS) == -1


def test_engine_snapshot_from_fixture_chain():
    expiry = datetime(2026, 9, 25, 18, 30, tzinfo=timezone.utc)
    quotes = [
        OptionQuote(
            expiry=expiry,
            strike=strike,
            option_type=option_type,
            open_interest=oi,
            volume=vol,
            implied_volatility=0.17,
        )
        for strike, option_type, oi, vol in [
            (4300, OptionType.PUT, 18400, 2100),
            (4350, OptionType.PUT, 22100, 3400),
            (4375, OptionType.PUT, 19800, 4100),
            (4375, OptionType.CALL, 18600, 3900),
            (4400, OptionType.CALL, 27400, 5200),
            (4450, OptionType.CALL, 19200, 2800),
        ]
    ]
    underlying = UnderlyingState(
        timestamp=datetime(2026, 9, 1, 12, 7, tzinfo=timezone.utc),
        spot=4367.86,
        futures_price=4372.4,
    )
    highs = [4340 + i for i in range(15)]
    lows = [4318 + i for i in range(15)]
    closes = [4326 + i for i in range(15)]
    snapshot = AnalyticsEngine().snapshot(quotes, underlying, highs=highs, lows=lows, closes=closes)

    assert snapshot.basis == pytest.approx(4372.4 - 4367.86)
    assert snapshot.max_pain is not None
    assert snapshot.call_walls
    assert snapshot.put_walls
    assert snapshot.atr_14 is not None
    assert snapshot.scored_levels
    assert snapshot.gex_curve
    assert 0 <= snapshot.scored_levels[0].score <= 100
    payload = snapshot.model_dump(mode="json")
    assert "gamma_flip" in payload
    assert "dealer_regime" in payload
