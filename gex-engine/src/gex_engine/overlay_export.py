from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from gex_engine.live import LiveState
from gex_engine.models import CalibrationStatus
from gex_engine.risk import assess_risk, default_account, default_caps
from gex_engine.session import build_session
from gex_engine.settings import GEX_MT5_FILES
from gex_engine.volatility import atr


def overlay_payload(state: LiveState) -> dict:
    underlying = state.underlying
    if underlying is None:
        raise RuntimeError("No underlying")
    cot = state.cot
    snapshot = state.snapshot
    atr14 = atr(state.highs, state.lows, state.closes) if state.closes else None
    if atr14 is None or atr14 <= 0:
        atr14 = 20.0
    spot = underlying.spot
    futures = underlying.futures_price
    basis_low = min(spot, futures)
    basis_high = max(spot, futures)
    note = "CFTC futures dealer book"
    if not state.chain_available:
        note = "Dealer flow from CFTC + COMEX basis/ATR (options chain not loaded)."
    return {
        "ok": 1,
        "spot": round(spot, 4),
        "futures": round(futures, 4),
        "basis": round(futures - spot, 4),
        "atr14": round(atr14, 4),
        "basis_low": round(basis_low, 4),
        "basis_high": round(basis_high, 4),
        "flow_low": round(futures - atr14, 4),
        "flow_high": round(futures + atr14, 4),
        "flow2_low": round(futures - 2 * atr14, 4),
        "flow2_high": round(futures + 2 * atr14, 4),
        "swap_long": cot.swap_long if cot else 0.0,
        "swap_short": cot.swap_short if cot else 0.0,
        "swap_net": cot.swap_net if cot else 0.0,
        "mm_net": cot.managed_money_net if cot else 0.0,
        "prod_net": cot.producer_net if cot else 0.0,
        "bias": cot.swap_dealer_bias if cot else "",
        "report_date": cot.report_date if cot else "",
        "gamma_flip": snapshot.gamma_flip if snapshot and snapshot.gamma_flip else 0.0,
        "max_pain": snapshot.max_pain if snapshot and snapshot.max_pain else 0.0,
        "gex": snapshot.gex if snapshot else 0.0,
        "regime": snapshot.dealer_regime.value if snapshot else "",
        "note": note,
    }


def public_overlay_payload(state: LiveState) -> dict:
    """Research-safe overlay: analytics + paper risk, no decision/OMS fields."""
    payload = overlay_payload(state)
    underlying = state.underlying
    if underlying is None:
        raise RuntimeError("No underlying")
    snapshot = state.snapshot
    now = state.updated_at or datetime.now(timezone.utc)
    session = build_session(state.bars, now=now, spot=underlying.spot)
    caps = default_caps()
    account = default_account()
    assessment = assess_risk(account=account, caps=caps, updated_at=state.updated_at)
    risk_budget = min(caps.max_risk_per_trade, account.equity * caps.max_risk_pct)
    expected_move = snapshot.expected_move if snapshot else None
    confidence = (
        snapshot.positioning.confidence
        if snapshot and snapshot.positioning
        else None
    )
    payload.update(
        {
            "expected_move": round(expected_move, 4) if expected_move else None,
            "session": session.current.value,
            "confidence": round(confidence, 4) if confidence is not None else None,
            "calibration": CalibrationStatus.PLACEHOLDER_PRIORS.value,
            "mode": "PAPER",
            "halt": assessment.halt,
            "halt_reason": assessment.reasons[0] if assessment.reasons else None,
            "risk_budget_usd": round(risk_budget, 2),
            "max_daily_loss_usd": round(caps.max_daily_loss, 2),
        }
    )
    return payload


def write_mt5_overlay(state: LiveState) -> Path | None:
    if state.underlying is None:
        return None
    payload = overlay_payload(state)
    folder = Path(GEX_MT5_FILES)
    folder.mkdir(parents=True, exist_ok=True)
    lines = [f"{key}={payload[key]}" for key in payload]
    target = folder / "gex_overlay.csv"
    tmp = folder / "gex_overlay.csv.tmp"
    tmp.write_text("\n".join(lines) + "\n", encoding="utf-8")
    tmp.replace(target)
    return target
