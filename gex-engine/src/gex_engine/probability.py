"""Interpretable score fusion with documented placeholder priors.

Outputs P(breakout), P(rejection), P(continuation), P(reversal), P(target),
P(stop). These are CALIBRATED PLACEHOLDERS — logistic weights are conservative
research priors, not walk-forward estimates. Replace via walk-forward later.

Never treat a single feature as a trade rule. In particular, GEX / gamma is
evidence about pinning vs expansion, not a long/short switch.
"""

from __future__ import annotations

import math

from gex_engine.models import (
    CalibrationStatus,
    FeatureVector,
    ProbabilitySnapshot,
    SessionSnapshot,
    StructureSnapshot,
)

# Documented placeholder logits. Magnitude is intentionally small so no single
# feature can dominate. Replace after walk-forward; do not treat as edge.
PRIORS: dict[str, float] = {
    "breakout_bias": -0.35,
    "rejection_bias": -0.15,
    "continuation_bias": -0.20,
    "reversal_bias": -0.20,
    "target_bias": -0.25,
    "stop_bias": -0.10,
    # Expansion vs pin: negative GEX tilts breakout vs rejection, NOT direction.
    "w_gex_neg_breakout": 0.35,
    "w_gex_pos_rejection": 0.30,
    "w_range_left_breakout": 0.40,
    "w_range_consumed_rejection": 0.45,
    "w_session_expansion_continuation": 0.50,
    "w_near_wall_rejection": 0.25,
    "w_near_flip_transition": 0.20,
    "w_ny_session_continuation": 0.15,
    "w_high_vol_breakout": 0.20,
    "w_low_vol_rejection": 0.20,
    # Directional tilt comes from structure path, not gamma.
    "w_london_from_asia_low_long": 0.45,
    "w_london_from_asia_high_short": 0.45,
    "w_above_vwap_long": 0.15,
    "w_below_vwap_short": 0.15,
    "w_above_pdh_long": 0.20,
    "w_below_pdl_short": 0.20,
}

PRIOR_NOTE = (
    "Probabilities are logistic fusions of documented placeholder priors "
    f"({', '.join(sorted(PRIORS))}). They are NOT guaranteed win rates and are "
    "not walk-forward calibrated. Dealer GEX contributes to breakout vs "
    "rejection only; direction comes from session/structure features."
)


def _sigmoid(z: float) -> float:
    z = max(-20.0, min(20.0, z))
    return 1.0 / (1.0 + math.exp(-z))


def _clip01(p: float) -> float:
    return max(0.02, min(0.98, p))


def _get(features: FeatureVector, name: str, default: float = 0.0) -> float:
    return float(features.values.get(name, default))


def estimate_probabilities(
    features: FeatureVector,
    session: SessionSnapshot,
    structure: StructureSnapshot,
) -> ProbabilitySnapshot:
    gex_sign = _get(features, "gex_sign", 0.0)
    range_consumed = _get(features, "range_consumed_pct", 0.5)
    range_left = max(0.0, 1.0 - range_consumed)
    london_up = _get(features, "london_expanded_from_asian_low")
    london_dn = _get(features, "london_expanded_from_asian_high")
    vwap_d = _get(features, "vwap_distance_atr", 0.0)
    pdh_d = _get(features, "pdh_distance_atr", 0.0)
    pdl_d = _get(features, "pdl_distance_atr", 0.0)
    call_d = abs(_get(features, "call_wall_distance_atr", 9.0))
    put_d = abs(_get(features, "put_wall_distance_atr", 9.0))
    flip_d = abs(_get(features, "gamma_flip_distance_atr", 9.0))
    near_wall = 1.0 if min(call_d, put_d) <= 0.35 else 0.0
    near_flip = 1.0 if flip_d <= 0.25 else 0.0
    ny = 1.0 if session.current.value == "NEW_YORK" else 0.0
    high_vol = 1.0 if structure.vol_regime.value in {"HIGH_VOL", "EXTREME_VOL"} else 0.0
    low_vol = 1.0 if structure.vol_regime.value == "LOW_VOL" else 0.0
    chain = 0.0 if "gex" in features.missing and "gex_sign" not in features.values else 1.0

    z_break = (
        PRIORS["breakout_bias"]
        + PRIORS["w_gex_neg_breakout"] * (1.0 if gex_sign < 0 else 0.0) * chain
        + PRIORS["w_range_left_breakout"] * range_left
        + PRIORS["w_high_vol_breakout"] * high_vol
        - PRIORS["w_near_flip_transition"] * near_flip
    )
    z_reject = (
        PRIORS["rejection_bias"]
        + PRIORS["w_gex_pos_rejection"] * (1.0 if gex_sign > 0 else 0.0) * chain
        + PRIORS["w_range_consumed_rejection"] * min(1.0, range_consumed)
        + PRIORS["w_near_wall_rejection"] * near_wall
        + PRIORS["w_low_vol_rejection"] * low_vol
    )
    z_cont = (
        PRIORS["continuation_bias"]
        + PRIORS["w_session_expansion_continuation"] * max(london_up, london_dn)
        + PRIORS["w_ny_session_continuation"] * ny
        + PRIORS["w_range_left_breakout"] * 0.5 * range_left
    )
    z_rev = (
        PRIORS["reversal_bias"]
        + PRIORS["w_range_consumed_rejection"] * 0.5 * min(1.0, range_consumed)
        + PRIORS["w_near_wall_rejection"] * 0.5 * near_wall
    )

    p_breakout = _clip01(_sigmoid(z_break))
    p_rejection = _clip01(_sigmoid(z_reject))
    p_continuation = _clip01(_sigmoid(z_cont))
    p_reversal = _clip01(_sigmoid(z_rev))

    # Softmax competing pairs so they are comparable but not a claimed partition.
    pair_br = math.exp(z_break) + math.exp(z_reject)
    p_breakout = _clip01(math.exp(z_break) / pair_br)
    p_rejection = _clip01(math.exp(z_reject) / pair_br)
    pair_cr = math.exp(z_cont) + math.exp(z_rev)
    p_continuation = _clip01(math.exp(z_cont) / pair_cr)
    p_reversal = _clip01(math.exp(z_rev) / pair_cr)

    # Target / stop: continuation and remaining range favor target; reversal favors stop.
    z_target = PRIORS["target_bias"] + 0.8 * (p_continuation - 0.5) + 0.4 * range_left - 0.3 * near_wall
    z_stop = PRIORS["stop_bias"] + 0.8 * (p_reversal - 0.5) + 0.3 * min(1.0, range_consumed)
    pair_ts = math.exp(z_target) + math.exp(z_stop)
    p_target = _clip01(math.exp(z_target) / pair_ts)
    p_stop = _clip01(math.exp(z_stop) / pair_ts)

    long_score = (
        PRIORS["w_london_from_asia_low_long"] * london_up
        + PRIORS["w_above_vwap_long"] * (1.0 if vwap_d > 0 else 0.0)
        + PRIORS["w_above_pdh_long"] * (1.0 if pdh_d > 0 else 0.0)
    )
    short_score = (
        PRIORS["w_london_from_asia_high_short"] * london_dn
        + PRIORS["w_below_vwap_short"] * (1.0 if vwap_d < 0 else 0.0)
        + PRIORS["w_below_pdl_short"] * (1.0 if pdl_d < 0 else 0.0)
    )
    delta = long_score - short_score
    if delta > 0.25:
        bias = "LONG"
    elif delta < -0.25:
        bias = "SHORT"
    else:
        bias = "FLAT"

    edge = abs(p_continuation - p_reversal) + abs(p_breakout - p_rejection)
    score = int(max(0, min(100, 50 + 40 * (delta if bias != "FLAT" else 0) + 20 * (edge - 0.2))))

    evidence: list[str] = []
    if gex_sign < 0:
        evidence.append("Negative GEX tilts P(breakout) vs P(rejection) (not a long signal)")
    elif gex_sign > 0:
        evidence.append("Positive GEX tilts P(rejection) vs P(breakout) (not a short signal)")
    if london_up:
        evidence.append("London expanded from Asian low (structure path, placeholder weight)")
    if london_dn:
        evidence.append("London expanded from Asian high (structure path, placeholder weight)")
    if chain < 1:
        evidence.append("Options features absent; fusion uses session/vol/structure only")
    evidence.append("Calibration: PLACEHOLDER_PRIORS — not a guaranteed win rate")

    return ProbabilitySnapshot(
        p_breakout=round(p_breakout, 4),
        p_rejection=round(p_rejection, 4),
        p_continuation=round(p_continuation, 4),
        p_reversal=round(p_reversal, 4),
        p_target=round(p_target, 4),
        p_stop=round(p_stop, 4),
        calibration=CalibrationStatus.PLACEHOLDER_PRIORS,
        signal_score=score,
        directional_bias=bias,  # type: ignore[arg-type]
        evidence=evidence,
        prior_note=PRIOR_NOTE,
    )
