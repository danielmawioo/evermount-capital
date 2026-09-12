"""Decision state machine: LONG / SHORT / WAIT / REDUCE / EXIT / HEDGE / HALT.

Default WAIT. HALT on stale data, kill switch, or risk-limit breach.
No live broker orders. Default execution mode is PAPER.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Protocol

from gex_engine.expected_value import expected_value
from gex_engine.features import extract_features
from gex_engine.models import (
    AccountState,
    AnalyticsSnapshot,
    Bar,
    CalibrationStatus,
    CotPositioning,
    DecisionAction,
    DecisionDashboard,
    EventRisk,
    ExecutionMode,
    ExpectedValueSnapshot,
    ProbabilitySnapshot,
    RiskCaps,
    RiskLevel,
    SessionName,
    SessionSnapshot,
    SizeResult,
    StructureSnapshot,
    TradePlan,
    UnderlyingState,
)
from gex_engine.probability import estimate_probabilities
from gex_engine.risk import assess_risk, default_account, default_caps
from gex_engine.session import bars_from_hlc, build_session
from gex_engine.sizing import size_position
from gex_engine.structure import build_structure


class DecisionMarket(Protocol):
    updated_at: datetime | None
    source: str
    underlying: UnderlyingState | None
    highs: list[float]
    lows: list[float]
    closes: list[float]
    cot: CotPositioning | None
    snapshot: AnalyticsSnapshot | None
    chain_available: bool
    bars: list[Bar]


def _first(values: list[float] | None) -> float | None:
    return values[0] if values else None


def _targets(*levels: float | None) -> list[float]:
    out: list[float] = []
    for level in levels:
        if level is None:
            continue
        if not out or abs(level - out[-1]) > 1e-6:
            out.append(level)
    return out[:3]


def propose_plan(
    *,
    spot: float,
    bias: str,
    snapshot: AnalyticsSnapshot | None,
    session: SessionSnapshot,
    structure: StructureSnapshot,
) -> TradePlan:
    atr_value = structure.atr_14 or 20.0
    min_stop = 0.35 * atr_value
    call_wall = _first(snapshot.call_walls) if snapshot else None
    put_wall = _first(snapshot.put_walls) if snapshot else None

    if bias == "LONG":
        structural = [x for x in (session.london.low, session.asia.low, structure.pdl) if x is not None]
        stop = max((x for x in structural if x < spot), default=spot - atr_value)
        stop_distance = max(spot - stop, min_stop)
        stop = spot - stop_distance
        t1 = min(
            (x for x in (session.london.high, session.new_york.high, structure.pdh, call_wall) if x and x > spot),
            default=spot + atr_value,
        )
        t2 = call_wall if call_wall and call_wall > t1 else spot + 1.5 * atr_value
        t3 = spot + 2.0 * atr_value
        targets = _targets(t1, t2, t3)
        reward = (targets[0] - spot) / stop_distance if stop_distance else 0.0
        return TradePlan(
            side="LONG",
            entry=spot,
            stop=round(stop, 4),
            targets=[round(t, 4) for t in targets],
            stop_distance=round(stop_distance, 4),
            reward_r=round(reward, 4),
            reason="Structure path favors upside; walls/ATR used as targets not as a gamma=long rule.",
        )
    if bias == "SHORT":
        structural = [x for x in (session.london.high, session.asia.high, structure.pdh) if x is not None]
        stop = min((x for x in structural if x > spot), default=spot + atr_value)
        stop_distance = max(stop - spot, min_stop)
        stop = spot + stop_distance
        t1 = max(
            (x for x in (session.london.low, session.new_york.low, structure.pdl, put_wall) if x and x < spot),
            default=spot - atr_value,
        )
        t2 = put_wall if put_wall and put_wall < t1 else spot - 1.5 * atr_value
        t3 = spot - 2.0 * atr_value
        targets = _targets(t1, t2, t3)
        reward = (spot - targets[0]) / stop_distance if stop_distance else 0.0
        return TradePlan(
            side="SHORT",
            entry=spot,
            stop=round(stop, 4),
            targets=[round(t, 4) for t in targets],
            stop_distance=round(stop_distance, 4),
            reward_r=round(reward, 4),
            reason="Structure path favors downside; walls/ATR used as targets not as a gamma=short rule.",
        )
    return TradePlan(side="FLAT", reason="No directional structure bias — default WAIT.")


def _manage_open(account, probs, risk) -> DecisionAction | None:
    if account.open_side == "FLAT" or account.open_lots <= 0:
        return None
    if risk.halt:
        return DecisionAction.EXIT
    if account.event_risk is EventRisk.HIGH:
        return DecisionAction.HEDGE
    if probs.p_reversal > probs.p_continuation + 0.15:
        return DecisionAction.EXIT
    if probs.p_stop > probs.p_target:
        return DecisionAction.REDUCE
    return None


def build_decision(
    state: DecisionMarket,
    *,
    account: AccountState | None = None,
    caps: RiskCaps | None = None,
    now: datetime | None = None,
    bars: list[Bar] | None = None,
) -> DecisionDashboard:
    now = now or datetime.now(timezone.utc)
    account = account or default_account()
    caps = caps or default_caps()
    mode = ExecutionMode.PAPER

    underlying = state.underlying
    if underlying is None:
        risk = assess_risk(account=account, caps=caps, updated_at=state.updated_at, now=now)
        empty_probs = ProbabilitySnapshot(
            p_breakout=0.5,
            p_rejection=0.5,
            p_continuation=0.5,
            p_reversal=0.5,
            p_target=0.5,
            p_stop=0.5,
            calibration=CalibrationStatus.PLACEHOLDER_PRIORS,
            signal_score=0,
            directional_bias="FLAT",
            evidence=["No underlying"],
            prior_note="No market data.",
        )
        return DecisionDashboard(
            mode=mode,
            timestamp=now,
            data_freshness_seconds=risk.data_freshness_seconds,
            xauusd=0.0,
            futures=0.0,
            basis=0.0,
            session=SessionName.OFF,
            regime="HALT",
            probabilities=empty_probs,
            expected_value=ExpectedValueSnapshot(
                reward_r=0.0,
                p_win=0.5,
                p_loss=0.5,
                ev_r=0.0,
                threshold=caps.ev_threshold,
                tradeable=False,
                note="No market.",
            ),
            signal_score=0,
            risk_level=RiskLevel.HIGH,
            recommendation=DecisionAction.HALT,
            position_size=SizeResult(
                lots=0,
                units=0,
                margin_required=0,
                risk_amount=0,
                utilization_pct=0,
                notional=0,
                leverage_used=0,
                dollar_risk_per_lot=0,
                capped_by=["no_market"],
                note="No market.",
            ),
            reason="No live underlying — HALT.",
            risk=risk,
            data_source=state.source,
            chain_available=False,
        )

    series_bars = bars if bars is not None else list(state.bars)
    if not series_bars:
        series_bars = bars_from_hlc(state.highs, state.lows, state.closes, end=now)

    spot = underlying.spot
    futures = underlying.futures_price
    snapshot = state.snapshot
    session = build_session(series_bars, now=now, spot=spot)
    structure = build_structure(
        series_bars,
        spot=spot,
        now=now,
        session=session,
        highs=state.highs or None,
        lows=state.lows or None,
        closes=state.closes or None,
    )
    feats = extract_features(
        spot=spot,
        futures=futures,
        snapshot=snapshot,
        session=session,
        structure=structure,
        cot=state.cot,
    )
    probs = estimate_probabilities(feats, session, structure)
    plan = propose_plan(
        spot=spot,
        bias=probs.directional_bias,
        snapshot=snapshot,
        session=session,
        structure=structure,
    )
    ev = expected_value(probs, reward_r=plan.reward_r or 0.0, threshold=caps.ev_threshold)
    risk = assess_risk(account=account, caps=caps, updated_at=state.updated_at, now=now)

    action = DecisionAction.WAIT
    reason_parts: list[str] = []
    if risk.halt:
        action = DecisionAction.HALT
        reason_parts.extend(risk.reasons)
    else:
        managed = _manage_open(account, probs, risk)
        if managed is not None:
            action = managed
            reason_parts.append(f"Open position management → {managed.value}")
        elif risk.block_new:
            action = DecisionAction.WAIT
            reason_parts.extend(risk.reasons or ["New entries blocked"])
        elif plan.side == "FLAT" or not ev.tradeable:
            action = DecisionAction.WAIT
            reason_parts.append(ev.note if not ev.tradeable else plan.reason)
        elif plan.side == "LONG":
            action = DecisionAction.LONG
            reason_parts.append(plan.reason)
            reason_parts.extend(probs.evidence[:3])
        elif plan.side == "SHORT":
            action = DecisionAction.SHORT
            reason_parts.append(plan.reason)
            reason_parts.extend(probs.evidence[:3])

    allow_entry = action in {DecisionAction.LONG, DecisionAction.SHORT} and not risk.block_new and not risk.halt
    size = size_position(
        account=account,
        caps=caps,
        stop_distance=plan.stop_distance or 0.0,
        spot=spot,
        confidence=(snapshot.positioning.confidence if snapshot and snapshot.positioning else 0.35),
        ev_r=ev.ev_r,
        atr=structure.atr_14,
        calibration=probs.calibration,
        p_win=probs.p_target,
        allow_entry=allow_entry,
    )
    if allow_entry and size.lots <= 0:
        action = DecisionAction.WAIT
        reason_parts.append("Sized to zero under the risk budget — WAIT.")

    dealer = {"status": "ESTIMATED", "confidence": 0.0, "label": "ESTIMATED"}
    if snapshot and snapshot.positioning:
        dealer = snapshot.positioning.model_dump(mode="json")
        dealer["status"] = "ESTIMATED"
        dealer["label"] = "ESTIMATED"
    elif state.cot:
        dealer = {
            "status": "ESTIMATED",
            "label": "ESTIMATED",
            "confidence": 0.35,
            "note": "CFTC futures dealer book only; options chain not loaded. Not a disclosed options book.",
            "cot": state.cot.model_dump(mode="json"),
        }

    dealer_regime = snapshot.dealer_regime.value if snapshot else "UNKNOWN"
    regime = f"{dealer_regime} / {structure.structure_regime.value}"
    targets = plan.targets
    return DecisionDashboard(
        mode=mode,
        timestamp=underlying.timestamp,
        data_freshness_seconds=risk.data_freshness_seconds,
        xauusd=spot,
        futures=futures,
        basis=round(futures - spot, 4),
        session=session.current,
        regime=regime,
        gamma_flip=snapshot.gamma_flip if snapshot else None,
        call_wall=_first(snapshot.call_walls) if snapshot else None,
        put_wall=_first(snapshot.put_walls) if snapshot else None,
        max_pain=snapshot.max_pain if snapshot else None,
        iv=snapshot.atm_iv if snapshot else None,
        iv_change=None,
        iv_skew=None,
        iv_rank=snapshot.iv_rank if snapshot else None,
        call_gamma=snapshot.net_call_gamma if snapshot else None,
        put_gamma=snapshot.net_put_gamma if snapshot else None,
        call_delta=snapshot.net_call_delta if snapshot else None,
        put_delta=snapshot.net_put_delta if snapshot else None,
        options_flow="ESTIMATED",
        momentum=structure.structure_regime.value,
        asian_high=session.asia.high,
        asian_low=session.asia.low,
        london_high=session.london.high,
        london_low=session.london.low,
        ny_high=session.new_york.high,
        ny_low=session.new_york.low,
        expected_remaining_range=structure.expected_remaining_range,
        atr_14=structure.atr_14,
        probabilities=probs,
        expected_value=ev,
        signal_score=probs.signal_score,
        risk_level=risk.risk_level,
        recommendation=action,
        entry=plan.entry if action in {DecisionAction.LONG, DecisionAction.SHORT} else None,
        stop=plan.stop if action in {DecisionAction.LONG, DecisionAction.SHORT} else None,
        target_1=targets[0] if targets and action in {DecisionAction.LONG, DecisionAction.SHORT} else None,
        target_2=targets[1] if len(targets) > 1 and action in {DecisionAction.LONG, DecisionAction.SHORT} else None,
        target_3=targets[2] if len(targets) > 2 and action in {DecisionAction.LONG, DecisionAction.SHORT} else None,
        position_size=size,
        reason=" | ".join(reason_parts) or plan.reason,
        dealer_positioning=dealer,
        session_conditionals=session.conditionals,
        structure=structure,
        features=feats,
        risk=risk,
        data_source=state.source,
        chain_available=state.chain_available,
    )
