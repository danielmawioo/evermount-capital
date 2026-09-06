from __future__ import annotations

from datetime import datetime, timezone

from gex_engine.greeks import greeks
from gex_engine.models import (
    EnrichedOption,
    InstrumentMap,
    OptionQuote,
    PositioningModel,
    UnderlyingState,
)
from gex_engine.positioning import dealer_sign, quote_key


def _years_to_expiry(expiry: datetime, now: datetime) -> float:
    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)
    if now.tzinfo is None:
        now = now.replace(tzinfo=timezone.utc)
    seconds = (expiry - now).total_seconds()
    return max(seconds / (365.25 * 24 * 3600), 1e-6)


def enrich_chain(
    quotes: list[OptionQuote],
    underlying: UnderlyingState,
    instruments: InstrumentMap,
    model: PositioningModel,
    *,
    forward_override: float | None = None,
    signs: dict[tuple, float] | None = None,
) -> list[EnrichedOption]:
    forward = forward_override if forward_override is not None else underlying.futures_price
    enriched: list[EnrichedOption] = []
    for quote in quotes:
        tau = _years_to_expiry(quote.expiry, underlying.timestamp)
        g = greeks(
            forward=forward,
            strike=quote.strike,
            sigma=quote.implied_volatility,
            tau=tau,
            rate=instruments.rate,
            option_type=quote.option_type,
        )
        sign = (
            signs[quote_key(quote)]
            if signs is not None
            else dealer_sign(quote.option_type, model)
        )
        gex = (
            quote.open_interest
            * g["gamma"]
            * (forward**2)
            * instruments.contract_multiplier
            * 0.01
            * sign
        )
        vanna_exposure = quote.open_interest * g["vanna"] * sign
        enriched.append(
            EnrichedOption(
                quote=quote,
                time_to_expiry=tau,
                dealer_sign=sign,
                gex=gex,
                vanna_exposure=vanna_exposure,
                **g,
            )
        )
    return enriched


def net_gex(chain: list[EnrichedOption]) -> float:
    return sum(item.gex for item in chain)


def net_vanna(chain: list[EnrichedOption]) -> float:
    return sum(item.vanna_exposure for item in chain)
