"""Feature extraction. Features are evidence, not trade rules."""

from __future__ import annotations

from gex_engine.models import (
    AnalyticsSnapshot,
    CotPositioning,
    FeatureVector,
    SessionName,
    SessionSnapshot,
    StructureSnapshot,
)


def _put(values: dict[str, float], missing: list[str], name: str, value: float | None) -> None:
    if value is None:
        missing.append(name)
        return
    values[name] = float(value)


def _atr_dist(level: float | None, spot: float, atr_value: float | None) -> float | None:
    if level is None or not atr_value or atr_value <= 0:
        return None
    return (spot - level) / atr_value


def extract_features(
    *,
    spot: float,
    futures: float,
    snapshot: AnalyticsSnapshot | None,
    session: SessionSnapshot,
    structure: StructureSnapshot,
    cot: CotPositioning | None,
) -> FeatureVector:
    values: dict[str, float] = {}
    missing: list[str] = []
    notes = [
        "Features contribute probabilistic evidence only.",
        "Dealer positioning is ESTIMATED; GEX sign is not a long/short rule.",
    ]
    atr_value = structure.atr_14
    _put(values, missing, "spot", spot)
    _put(values, missing, "futures", futures)
    _put(values, missing, "basis", futures - spot)
    _put(values, missing, "atr_5", structure.atr_5)
    _put(values, missing, "atr_14", structure.atr_14)
    _put(values, missing, "atr_20", structure.atr_20)
    _put(values, missing, "realized_vol", structure.realized_vol)
    _put(values, missing, "range_consumed_pct", structure.range_consumed_pct)
    _put(values, missing, "vwap_distance_atr", _atr_dist(structure.vwap, spot, atr_value))
    _put(values, missing, "pdh_distance_atr", _atr_dist(structure.pdh, spot, atr_value))
    _put(values, missing, "pdl_distance_atr", _atr_dist(structure.pdl, spot, atr_value))
    _put(values, missing, "dist_asian_high_atr", _atr_dist(session.asia.high, spot, atr_value))
    _put(values, missing, "dist_asian_low_atr", _atr_dist(session.asia.low, spot, atr_value))
    _put(values, missing, "dist_london_high_atr", _atr_dist(session.london.high, spot, atr_value))
    _put(values, missing, "dist_london_low_atr", _atr_dist(session.london.low, spot, atr_value))

    session_code = {
        SessionName.ASIA: 0.0,
        SessionName.LONDON: 1.0,
        SessionName.NEW_YORK: 2.0,
        SessionName.OFF: -1.0,
    }[session.current]
    values["session_code"] = session_code
    values["intraday_available"] = 1.0 if session.intraday_available else 0.0

    london_from_asia_low = 0.0
    london_from_asia_high = 0.0
    if session.asia.high is not None and session.asia.low is not None and session.london.high is not None:
        if session.london.high > session.asia.high and (
            session.london.low is None or session.london.low >= session.asia.low
        ):
            london_from_asia_low = 1.0
        if session.london.low is not None and session.london.low < session.asia.low and (
            session.london.high <= session.asia.high
        ):
            london_from_asia_high = 1.0
    values["london_expanded_from_asian_low"] = london_from_asia_low
    values["london_expanded_from_asian_high"] = london_from_asia_high

    if snapshot is None:
        missing.extend(
            [
                "gex",
                "gamma_flip_distance_atr",
                "call_wall_distance_atr",
                "put_wall_distance_atr",
                "atm_iv",
                "iv_rank",
            ]
        )
        notes.append("Options/GEX features missing until a COMEX chain is loaded.")
    else:
        gex = snapshot.gex
        scale = max(abs(gex), 1.0)
        values["gex_sign"] = 1.0 if gex > 0 else (-1.0 if gex < 0 else 0.0)
        values["gex_normalized"] = max(-1.0, min(1.0, gex / scale))
        _put(values, missing, "gamma_flip_distance_atr", _atr_dist(snapshot.gamma_flip, spot, atr_value))
        call_wall = snapshot.call_walls[0] if snapshot.call_walls else None
        put_wall = snapshot.put_walls[0] if snapshot.put_walls else None
        _put(values, missing, "call_wall_distance_atr", _atr_dist(call_wall, spot, atr_value))
        _put(values, missing, "put_wall_distance_atr", _atr_dist(put_wall, spot, atr_value))
        _put(values, missing, "atm_iv", snapshot.atm_iv)
        _put(values, missing, "iv_rank", snapshot.iv_rank)
        if snapshot.positioning:
            _put(values, missing, "dealer_sign_calls", snapshot.positioning.average_dealer_sign_calls)
            _put(values, missing, "dealer_sign_puts", snapshot.positioning.average_dealer_sign_puts)
            values["dealer_confidence"] = snapshot.positioning.confidence

    if cot is not None:
        values["cot_swap_net"] = cot.swap_net
        values["cot_mm_net"] = cot.managed_money_net
        values["cot_swap_short"] = 1.0 if cot.swap_net < 0 else 0.0
    else:
        missing.extend(["cot_swap_net", "cot_mm_net"])

    return FeatureVector(values=values, missing=missing, notes=notes)
