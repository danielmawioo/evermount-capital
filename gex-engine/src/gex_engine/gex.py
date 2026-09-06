from __future__ import annotations

from gex_engine.chain import enrich_chain, net_gex
from gex_engine.models import InstrumentMap, OptionQuote, PositioningModel, UnderlyingState


def gex_curve(
    quotes: list[OptionQuote],
    underlying: UnderlyingState,
    instruments: InstrumentMap,
    model: PositioningModel,
    *,
    low: float,
    high: float,
    step: float,
    signs: dict[tuple, float] | None = None,
) -> list[tuple[float, float]]:
    """GEX(P) across a hypothetical futures-price grid. OI and IV are held fixed."""
    points: list[tuple[float, float]] = []
    price = low
    while price <= high + 1e-9:
        chain = enrich_chain(
            quotes,
            underlying,
            instruments,
            model,
            forward_override=price,
            signs=signs,
        )
        points.append((round(price, 6), net_gex(chain)))
        price += step
    return points


def gamma_flip(curve: list[tuple[float, float]]) -> float | None:
    """Linearly interpolate the first GEX zero crossing on the curve."""
    if not curve:
        return None
    for (p0, g0), (p1, g1) in zip(curve, curve[1:]):
        if g0 == 0:
            return p0
        if g0 * g1 < 0:
            if g1 == g0:
                return p0
            t = abs(g0) / (abs(g0) + abs(g1))
            return round(p0 + t * (p1 - p0), 2)
    if curve[-1][1] == 0:
        return curve[-1][0]
    return None
