from __future__ import annotations

from collections import defaultdict

from gex_engine.models import EnrichedOption, OptionType, WallSet


def _best_strike(scores: dict[float, float]) -> float | None:
    if not scores:
        return None
    return max(scores.items(), key=lambda item: abs(item[1]))[0]


def walls(chain: list[EnrichedOption], option_type: OptionType) -> WallSet:
    oi: dict[float, float] = defaultdict(float)
    gamma: dict[float, float] = defaultdict(float)
    gex: dict[float, float] = defaultdict(float)
    volume: dict[float, float] = defaultdict(float)

    for item in chain:
        if item.quote.option_type is not option_type:
            continue
        k = item.quote.strike
        oi[k] += item.quote.open_interest
        gamma[k] += item.quote.open_interest * item.gamma
        gex[k] += item.gex
        volume[k] += item.quote.volume

    return WallSet(
        oi=_best_strike(oi),
        gamma=_best_strike(gamma),
        gex=_best_strike(gex),
        volume=_best_strike(volume),
    )


def unique_walls(wall_set: WallSet, *, limit: int = 2) -> list[float]:
    ordered: list[float] = []
    for value in (wall_set.gex, wall_set.gamma, wall_set.oi, wall_set.volume):
        if value is not None and value not in ordered:
            ordered.append(value)
        if len(ordered) >= limit:
            break
    return ordered
