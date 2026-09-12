"""Hard risk budget, kill switch, stale-data HALT. Never overridden by Kelly."""

from __future__ import annotations

from datetime import datetime, timezone

from gex_engine.models import (
    AccountState,
    EventRisk,
    RiskAssessment,
    RiskCaps,
    RiskLevel,
)
from gex_engine.settings import (
    GEX_BROKER_LEVERAGE,
    GEX_CONTRACT_SIZE,
    GEX_EQUITY,
    GEX_EV_THRESHOLD,
    GEX_FRACTIONAL_KELLY,
    GEX_FREE_MARGIN,
    GEX_KILL_SWITCH,
    GEX_MAX_DAILY_LOSS,
    GEX_MAX_DRAWDOWN_PCT,
    GEX_MAX_LEVERAGE,
    GEX_MAX_MARGIN_UTILIZATION,
    GEX_MAX_POSITION,
    GEX_MAX_RISK_PCT,
    GEX_MAX_RISK_PER_TRADE,
    GEX_STALE_SECONDS,
)


def default_caps(**overrides: object) -> RiskCaps:
    data = dict(
        max_risk_per_trade=GEX_MAX_RISK_PER_TRADE,
        max_risk_pct=GEX_MAX_RISK_PCT,
        max_daily_loss=GEX_MAX_DAILY_LOSS,
        max_leverage=GEX_MAX_LEVERAGE,
        max_position=GEX_MAX_POSITION,
        max_margin_utilization=GEX_MAX_MARGIN_UTILIZATION,
        max_drawdown_pct=GEX_MAX_DRAWDOWN_PCT,
        contract_size=GEX_CONTRACT_SIZE,
        broker_leverage=GEX_BROKER_LEVERAGE,
        ev_threshold=GEX_EV_THRESHOLD,
        stale_seconds=GEX_STALE_SECONDS,
        fractional_kelly=GEX_FRACTIONAL_KELLY,
        kill_switch=GEX_KILL_SWITCH,
    )
    data.update(overrides)
    return RiskCaps(**data)  # type: ignore[arg-type]


def default_account(**overrides: object) -> AccountState:
    data = dict(equity=GEX_EQUITY, free_margin=GEX_FREE_MARGIN)
    data.update(overrides)
    return AccountState(**data)  # type: ignore[arg-type]


def assess_risk(
    *,
    account: AccountState,
    caps: RiskCaps,
    updated_at: datetime | None,
    now: datetime | None = None,
) -> RiskAssessment:
    now = now or datetime.now(timezone.utc)
    reasons: list[str] = []
    halt = False
    block_new = False
    freshness: float | None = None
    stale = False

    if caps.kill_switch:
        halt = True
        block_new = True
        reasons.append("Kill switch is on")

    if updated_at is None:
        halt = True
        block_new = True
        stale = True
        reasons.append("No market timestamp — data treated as stale")
    else:
        ts = updated_at if updated_at.tzinfo else updated_at.replace(tzinfo=timezone.utc)
        freshness = max(0.0, (now - ts).total_seconds())
        if freshness > caps.stale_seconds:
            halt = True
            block_new = True
            stale = True
            reasons.append(f"Data stale ({freshness:.0f}s > {caps.stale_seconds:.0f}s)")

    if account.daily_loss >= caps.max_daily_loss:
        halt = True
        block_new = True
        reasons.append(
            f"Daily loss {account.daily_loss:.2f} reached cap {caps.max_daily_loss:.2f}"
        )

    if account.drawdown_pct >= caps.max_drawdown_pct:
        halt = True
        block_new = True
        reasons.append(
            f"Drawdown {account.drawdown_pct:.1%} reached cap {caps.max_drawdown_pct:.1%}"
        )

    if account.event_risk is EventRisk.HIGH:
        block_new = True
        reasons.append("High event risk — new entries blocked")

    if account.equity <= 0 or account.free_margin <= 0:
        halt = True
        block_new = True
        reasons.append("Equity or free margin is non-positive")

    if halt:
        level = RiskLevel.HIGH
    elif block_new or account.drawdown_pct >= 0.05 or account.event_risk is EventRisk.MEDIUM:
        level = RiskLevel.MEDIUM
    else:
        level = RiskLevel.LOW

    return RiskAssessment(
        halt=halt,
        block_new=block_new,
        risk_level=level,
        reasons=reasons,
        data_freshness_seconds=round(freshness, 3) if freshness is not None else None,
        stale=stale,
    )
