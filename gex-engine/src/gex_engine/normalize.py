from __future__ import annotations

from datetime import datetime, timezone

from gex_engine.greeks import implied_vol
from gex_engine.models import InstrumentMap, OptionQuote, OptionType, UnderlyingState


def _tau(expiry: datetime, now: datetime) -> float:
    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)
    if now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    return max((expiry - now).total_seconds() / (365.25 * 24 * 3600), 1e-6)


def normalize_iv(value: float | None) -> float | None:
    if value is None:
        return None
    if value <= 0:
        return None
    if value > 3:
        return value / 100.0
    return value


def mid_price(quote: OptionQuote) -> float | None:
    if quote.bid and quote.ask and quote.bid > 0 and quote.ask > 0:
        return 0.5 * (quote.bid + quote.ask)
    if quote.last and quote.last > 0:
        return quote.last
    return None


def fill_missing_iv(
    quotes: list[OptionQuote],
    underlying: UnderlyingState,
    instruments: InstrumentMap,
) -> list[OptionQuote]:
    filled: list[OptionQuote] = []
    for quote in quotes:
        iv = normalize_iv(quote.implied_volatility)
        if iv is None:
            price = mid_price(quote)
            if price:
                iv = implied_vol(
                    price=price,
                    forward=underlying.futures_price,
                    strike=quote.strike,
                    tau=_tau(quote.expiry, underlying.timestamp),
                    rate=instruments.rate,
                    option_type=quote.option_type,
                )
        if iv is None:
            continue
        filled.append(quote.model_copy(update={"implied_volatility": iv}))
    return filled


def parse_option_type(value: str) -> OptionType:
    text = value.strip().lower()
    if text.startswith("p"):
        return OptionType.PUT
    return OptionType.CALL
