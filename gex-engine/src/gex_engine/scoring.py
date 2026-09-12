from __future__ import annotations

from collections import defaultdict

from gex_engine.models import EnrichedOption, LevelScore, OptionType


def _bucket(value: float, high: float, medium: float) -> str:
    magnitude = abs(value)
    if magnitude >= high:
        return "HIGH"
    if magnitude >= medium:
        return "MEDIUM"
    return "LOW"


def score_levels(
    *,
    spot: float,
    atr_value: float | None,
    candidates: list[tuple[float, str]],
    chain: list[EnrichedOption],
) -> list[LevelScore]:
    oi_put: dict[float, float] = defaultdict(float)
    oi_call: dict[float, float] = defaultdict(float)
    gamma: dict[float, float] = defaultdict(float)
    gex: dict[float, float] = defaultdict(float)
    vanna: dict[float, float] = defaultdict(float)
    volume: dict[float, float] = defaultdict(float)

    for item in chain:
        k = item.quote.strike
        gamma[k] += abs(item.quote.open_interest * item.gamma)
        gex[k] += item.gex
        vanna[k] += item.vanna_exposure
        volume[k] += item.quote.volume
        if item.quote.option_type is OptionType.PUT:
            oi_put[k] += item.quote.open_interest
        else:
            oi_call[k] += item.quote.open_interest

    max_gex = max((abs(v) for v in gex.values()), default=1.0) or 1.0
    max_gamma = max(gamma.values(), default=1.0) or 1.0
    max_put = max(oi_put.values(), default=1.0) or 1.0
    max_call = max(oi_call.values(), default=1.0) or 1.0
    max_vol = max(volume.values(), default=1.0) or 1.0

    scored: list[LevelScore] = []
    seen: set[float] = set()
    for price, role in candidates:
        if price in seen:
            continue
        seen.add(price)
        nearest = min(gex.keys(), key=lambda k: abs(k - price), default=price)
        distance = spot - price
        gex_here = gex.get(nearest, 0.0)
        gamma_here = gamma.get(nearest, 0.0)
        put_here = oi_put.get(nearest, 0.0)
        call_here = oi_call.get(nearest, 0.0)
        vanna_here = vanna.get(nearest, 0.0)
        vol_here = volume.get(nearest, 0.0)

        atr_confluence = "NONE"
        if atr_value and atr_value > 0:
            atr_distance = abs(distance) / atr_value
            if abs(atr_distance - round(atr_distance)) <= 0.15 and 1 <= round(atr_distance) <= 2:
                atr_confluence = "HIGH"
            elif atr_distance <= 1.25:
                atr_confluence = "MEDIUM"
            else:
                atr_confluence = "LOW"

        score = 0
        reasons: list[str] = []
        gex_label = _bucket(gex_here / max_gex, 0.6, 0.3)
        if gex_label == "HIGH":
            score += 25
            reasons.append("GEX concentration")
        elif gex_label == "MEDIUM":
            score += 12

        put_label = _bucket(put_here / max_put, 0.6, 0.3)
        call_label = _bucket(call_here / max_call, 0.6, 0.3)
        if role == "support" and put_label == "HIGH":
            score += 20
            reasons.append("Put OI")
        if role == "resistance" and call_label == "HIGH":
            score += 20
            reasons.append("Call OI")

        gamma_label = _bucket(gamma_here / max_gamma, 0.6, 0.3)
        if gamma_label == "HIGH":
            score += 20
            reasons.append("Gamma concentration")
        elif gamma_label == "MEDIUM":
            score += 10

        vanna_label = "POSITIVE" if vanna_here > 0 else "NEGATIVE" if vanna_here < 0 else "FLAT"
        if (role == "support" and vanna_here > 0) or (role == "resistance" and vanna_here < 0):
            score += 10
            reasons.append("Vanna alignment")

        if atr_confluence == "HIGH":
            score += 15
            reasons.append("ATR confluence")
        elif atr_confluence == "MEDIUM":
            score += 8

        vol_label = _bucket(vol_here / max_vol, 0.6, 0.3)
        if vol_label == "HIGH":
            score += 10
        elif vol_label == "MEDIUM":
            score += 5
        else:
            vol_label = "NORMAL"

        score = min(100, score)
        scored.append(
            LevelScore(
                price=price,
                role=role,  # type: ignore[arg-type]
                gex_support=gex_label,
                put_oi=put_label,
                call_oi=call_label,
                gamma_concentration=gamma_label,
                vanna=vanna_label,
                atr_confluence=atr_confluence,
                volume=vol_label,
                distance_from_spot=round(distance, 4),
                score=score,
                reasons=reasons,
            )
        )
    return sorted(scored, key=lambda item: item.score, reverse=True)
