"""Capital-efficient position sizing under a hard dollar risk budget.

Size is the largest position such that stop-loss loss ≤ max_risk_per_trade
(and ≤ max_risk_pct of equity), then clipped by margin utilization, leverage,
max position, drawdown, and event risk.

Never uses 100% of free margin. Fractional Kelly may shrink size after
calibrated probabilities exist; it never raises size above the risk cap and
is skipped while probabilities are PLACEHOLDER_PRIORS.
"""

from __future__ import annotations

from gex_engine.models import (
    AccountState,
    CalibrationStatus,
    EventRisk,
    SizeResult,
    RiskCaps,
)


def _floor_lot(lots: float, step: float) -> float:
    if step <= 0:
        return max(0.0, lots)
    return max(0.0, (lots // step) * step)


def size_position(
    *,
    account: AccountState,
    caps: RiskCaps,
    stop_distance: float,
    spot: float,
    confidence: float,
    ev_r: float,
    atr: float | None = None,
    calibration: CalibrationStatus = CalibrationStatus.PLACEHOLDER_PRIORS,
    p_win: float | None = None,
    allow_entry: bool = True,
) -> SizeResult:
    capped_by: list[str] = []
    if not allow_entry:
        return SizeResult(
            lots=0.0,
            units=0.0,
            margin_required=0.0,
            risk_amount=0.0,
            utilization_pct=0.0,
            notional=0.0,
            leverage_used=0.0,
            dollar_risk_per_lot=0.0,
            capped_by=["blocked"],
            note="Entry blocked by risk engine; size is zero.",
        )
    if stop_distance <= 0 or spot <= 0 or account.equity <= 0:
        return SizeResult(
            lots=0.0,
            units=0.0,
            margin_required=0.0,
            risk_amount=0.0,
            utilization_pct=0.0,
            notional=0.0,
            leverage_used=0.0,
            dollar_risk_per_lot=0.0,
            capped_by=["invalid_stop_or_equity"],
            note="Cannot size without a positive stop distance, spot, and equity.",
        )

    dollar_risk_per_lot = stop_distance * caps.contract_size
    risk_budget = min(caps.max_risk_per_trade, account.equity * caps.max_risk_pct)
    lots = risk_budget / dollar_risk_per_lot if dollar_risk_per_lot > 0 else 0.0
    capped_by.append("risk_budget")

    # Confidence and EV may only reduce size, never increase past the risk cap.
    conf = max(0.0, min(1.0, confidence))
    lots *= 0.50 + 0.50 * conf
    if conf < 1.0:
        capped_by.append("confidence_haircut")
    if ev_r <= caps.ev_threshold:
        lots = 0.0
        capped_by.append("ev_below_threshold")
    elif ev_r < 0.40:
        lots *= 0.70 + 0.30 * ((ev_r - caps.ev_threshold) / max(0.40 - caps.ev_threshold, 1e-6))
        capped_by.append("ev_scale")

    if account.drawdown_pct >= 0.05:
        lots *= 0.50
        capped_by.append("drawdown_haircut")
    if account.event_risk is EventRisk.HIGH:
        lots *= 0.50
        capped_by.append("event_risk_haircut")
    elif account.event_risk is EventRisk.MEDIUM:
        lots *= 0.75
        capped_by.append("event_risk_haircut")

    if atr is not None and atr > 0 and stop_distance > 3.0 * atr:
        lots *= 0.50
        capped_by.append("wide_stop_vs_atr")

    kelly_fraction = None
    if (
        calibration is CalibrationStatus.WALK_FORWARD
        and p_win is not None
        and 0.0 < p_win < 1.0
        and ev_r > 0
        and dollar_risk_per_lot > 0
    ):
        # f* = (p * (b+1) - 1) / b with b = reward in R ≈ ev geometry stored as ev_r/p not needed;
        # use b = max(ev_r / max(p_win, 1e-6) + (1 - p_win) / max(p_win, 1e-6), 0.1)
        q = 1.0 - p_win
        b = max(ev_r / max(p_win, 1e-9) + q / max(p_win, 1e-9), 0.1)
        f_star = (p_win * (b + 1.0) - 1.0) / b
        kelly_fraction = max(0.0, caps.fractional_kelly * f_star)
        lots_kelly = (kelly_fraction * account.equity) / dollar_risk_per_lot
        if lots_kelly < lots:
            lots = lots_kelly
            capped_by.append("fractional_kelly")
    # Placeholder probabilities: Kelly is not applied (would treat priors as edge).

    margin_per_lot = (spot * caps.contract_size) / max(caps.broker_leverage, 1e-9)
    max_util = min(caps.max_margin_utilization, 0.95)
    if max_util >= 1.0:
        max_util = 0.95
        capped_by.append("forced_sub_100_margin")
    lots_margin = (account.free_margin * max_util) / margin_per_lot if margin_per_lot > 0 else 0.0
    if lots > lots_margin:
        lots = lots_margin
        capped_by.append("margin_utilization")

    max_notional = account.equity * caps.max_leverage
    lots_lev = max_notional / (spot * caps.contract_size) if spot > 0 else 0.0
    if lots > lots_lev:
        lots = lots_lev
        capped_by.append("max_leverage")

    if lots > caps.max_position:
        lots = caps.max_position
        capped_by.append("max_position")

    lots = _floor_lot(lots, caps.lot_step)
    if 0 < lots < caps.min_lot:
        lots = 0.0
        capped_by.append("below_min_lot")

    notional = lots * spot * caps.contract_size
    margin_required = lots * margin_per_lot
    risk_amount = lots * dollar_risk_per_lot
    utilization = (margin_required / account.free_margin * 100.0) if account.free_margin > 0 else 0.0
    leverage_used = (notional / account.equity) if account.equity > 0 else 0.0

    if utilization >= 100.0 - 1e-9:
        # Last-line guard: never report or use full margin.
        lots = _floor_lot(lots * 0.95, caps.lot_step)
        notional = lots * spot * caps.contract_size
        margin_required = lots * margin_per_lot
        risk_amount = lots * dollar_risk_per_lot
        utilization = (margin_required / account.free_margin * 100.0) if account.free_margin > 0 else 0.0
        leverage_used = (notional / account.equity) if account.equity > 0 else 0.0
        capped_by.append("full_margin_guard")

    note = (
        f"lots = min(risk_budget/{dollar_risk_per_lot:.2f} $/lot, margin*{max_util:.0%}, "
        f"leverage, max_position) then haircuts. risk_budget=${risk_budget:.2f}. "
        "Kelly skipped unless walk-forward calibrated."
        if calibration is not CalibrationStatus.WALK_FORWARD
        else f"Sized under ${risk_budget:.2f} risk budget with fractional Kelly {kelly_fraction}."
    )
    return SizeResult(
        lots=round(lots, 4),
        units=round(lots * caps.contract_size, 4),
        margin_required=round(margin_required, 2),
        risk_amount=round(risk_amount, 2),
        utilization_pct=round(utilization, 4),
        notional=round(notional, 2),
        leverage_used=round(leverage_used, 4),
        dollar_risk_per_lot=round(dollar_risk_per_lot, 4),
        capped_by=capped_by,
        kelly_fraction=kelly_fraction,
        note=note,
    )
