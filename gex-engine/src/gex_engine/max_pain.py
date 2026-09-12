from __future__ import annotations

from collections import defaultdict

from gex_engine.models import OptionQuote, OptionType


def max_pain(quotes: list[OptionQuote]) -> float | None:
    """Settlement price that minimises combined call and put intrinsic loss."""
    strikes = sorted({quote.strike for quote in quotes})
    if not strikes:
        return None

    call_oi: dict[float, float] = defaultdict(float)
    put_oi: dict[float, float] = defaultdict(float)
    for quote in quotes:
        if quote.option_type is OptionType.CALL:
            call_oi[quote.strike] += quote.open_interest
        else:
            put_oi[quote.strike] += quote.open_interest

    best_price = strikes[0]
    best_loss = float("inf")
    for settlement in strikes:
        loss = 0.0
        for strike, oi in call_oi.items():
            loss += oi * max(settlement - strike, 0.0)
        for strike, oi in put_oi.items():
            loss += oi * max(strike - settlement, 0.0)
        if loss < best_loss:
            best_loss = loss
            best_price = settlement
    return best_price
