from datetime import datetime, timezone

from gex_engine.models import CotPositioning, InstrumentMap, OptionQuote, OptionType, PositioningModel, UnderlyingState
from gex_engine.normalize import fill_missing_iv
from gex_engine.positioning import infer_dealer_signs
from gex_engine.vendors.barchart import BarchartClient
from gex_engine.vendors.cftc import parse_cot


def test_cftc_parse_swap_dealer_net_short():
    cot = parse_cot(
        {
            "report_date_as_yyyy_mm_dd": "2026-08-25T00:00:00.000",
            "open_interest_all": "427957",
            "swap_positions_long_all": "16656",
            "swap__positions_short_all": "261683",
            "m_money_positions_long_all": "159819",
            "m_money_positions_short_all": "15072",
            "prod_merc_positions_long": "16861",
            "prod_merc_positions_short": "51419",
        }
    )
    assert cot.swap_net < 0
    assert cot.swap_dealer_bias == "SWAP_DEALERS_NET_SHORT_FUTURES"
    assert cot.managed_money_net > 0


def test_chain_inferred_signs_follow_cot_and_volume():
    expiry = datetime(2026, 9, 25, tzinfo=timezone.utc)
    quotes = [
        OptionQuote(
            expiry=expiry,
            strike=4500,
            option_type=OptionType.CALL,
            open_interest=1000,
            volume=800,
            implied_volatility=0.18,
        ),
        OptionQuote(
            expiry=expiry,
            strike=4300,
            option_type=OptionType.PUT,
            open_interest=1000,
            volume=10,
            implied_volatility=0.18,
        ),
    ]
    cot = CotPositioning(
        report_date="2026-08-25",
        open_interest=1,
        swap_long=1,
        swap_short=10,
        swap_net=-9,
        managed_money_long=10,
        managed_money_short=1,
        managed_money_net=9,
        producer_long=1,
        producer_short=5,
        producer_net=-4,
        swap_dealer_bias="SWAP_DEALERS_NET_SHORT_FUTURES",
    )
    signs, evidence = infer_dealer_signs(quotes, 4400, PositioningModel.CHAIN_INFERRED, cot)
    call_sign = signs[(expiry, 4500, OptionType.CALL)]
    put_sign = signs[(expiry, 4300, OptionType.PUT)]
    assert call_sign < 0
    assert put_sign > 0
    assert evidence.cot is not None


def test_barchart_option_parser():
    client = BarchartClient(api_key="unused")
    rows = [
        {
            "strike": "4400",
            "type": "Call",
            "expirationDate": "2026-09-25",
            "bid": 12.1,
            "ask": 12.6,
            "last": 12.4,
            "volume": "100",
            "openInterest": "2500",
            "impliedVolatility": "18.5",
        }
    ]
    client.option_chain = lambda contract: rows  # type: ignore[method-assign]
    quotes = client.fetch_chain("GCZ26")
    assert len(quotes) == 1
    assert quotes[0].option_type is OptionType.CALL
    assert quotes[0].strike == 4400
    assert quotes[0].open_interest == 2500


def test_fill_missing_iv_from_mid():
    expiry = datetime(2026, 9, 25, tzinfo=timezone.utc)
    quote = OptionQuote(
        expiry=expiry,
        strike=4375,
        option_type=OptionType.CALL,
        bid=35,
        ask=37,
        implied_volatility=0,
    )
    underlying = UnderlyingState(
        timestamp=datetime(2026, 8, 1, tzinfo=timezone.utc),
        spot=4360,
        futures_price=4372,
    )
    filled = fill_missing_iv([quote], underlying, InstrumentMap())
    assert filled
    assert filled[0].implied_volatility > 0
