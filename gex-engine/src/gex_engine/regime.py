from __future__ import annotations

from gex_engine.models import DealerRegime


def classify_regime(net_gex_value: float, spot: float, flip: float | None, atr_value: float | None) -> DealerRegime:
    proximity = (atr_value * 0.25) if atr_value else max(abs(spot) * 0.001, 1.0)
    if flip is not None and abs(spot - flip) <= proximity:
        return DealerRegime.TRANSITION
    if net_gex_value < 0:
        return DealerRegime.NEGATIVE_GAMMA
    return DealerRegime.POSITIVE_GAMMA
