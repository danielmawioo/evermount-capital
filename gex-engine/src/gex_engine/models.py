from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field


class OptionType(str, Enum):
    CALL = "call"
    PUT = "put"


class PositioningModel(str, Enum):
    """Configurable dealer-positioning assumptions.

    Open interest does not reveal who is long/short. These models encode
    the hedge-book hypothesis used when aggregating gamma / vanna / GEX.
    """

    STANDARD_DEALER_HEDGE = "STANDARD_DEALER_HEDGE"
    CUSTOMER_LONG_OPTIONS = "CUSTOMER_LONG_OPTIONS"
    DEALER_LONG_OPTIONS = "DEALER_LONG_OPTIONS"
    CHAIN_INFERRED = "CHAIN_INFERRED"


class DealerRegime(str, Enum):
    POSITIVE_GAMMA = "POSITIVE_GAMMA"
    NEGATIVE_GAMMA = "NEGATIVE_GAMMA"
    TRANSITION = "TRANSITION"


class OptionQuote(BaseModel):
    expiry: datetime
    strike: float
    option_type: OptionType
    bid: float | None = None
    ask: float | None = None
    last: float | None = None
    volume: float = 0.0
    open_interest: float = 0.0
    implied_volatility: float


class InstrumentMap(BaseModel):
    broker_symbol: str = "XAUUSD"
    futures_symbol: str = "GC"
    options_root: str = "OG"
    contract_multiplier: float = 100.0
    rate: float = 0.05


class CotPositioning(BaseModel):
    report_date: str
    open_interest: float
    swap_long: float
    swap_short: float
    swap_net: float
    managed_money_long: float
    managed_money_short: float
    managed_money_net: float
    producer_long: float
    producer_short: float
    producer_net: float
    swap_dealer_bias: str


class PositioningEvidence(BaseModel):
    model: PositioningModel
    note: str
    call_oi: float
    put_oi: float
    call_volume: float
    put_volume: float
    put_call_oi: float | None
    volume_oi: float | None
    cot: CotPositioning | None = None
    average_dealer_sign_calls: float | None = None
    average_dealer_sign_puts: float | None = None
    estimated: bool = True
    label: str = "ESTIMATED"
    confidence: float = 0.0


class UnderlyingState(BaseModel):
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    spot: float
    futures_price: float
    volume: float = 0.0
    futures_symbol: str | None = None


class EnrichedOption(BaseModel):
    quote: OptionQuote
    time_to_expiry: float
    delta: float
    gamma: float
    vega: float
    theta: float
    vanna: float
    charm: float
    dealer_sign: float
    gex: float
    vanna_exposure: float


class WallSet(BaseModel):
    oi: float | None
    gamma: float | None
    gex: float | None
    volume: float | None


class LevelScore(BaseModel):
    price: float
    role: Literal["support", "resistance", "pivot"]
    gex_support: str
    put_oi: str
    call_oi: str
    gamma_concentration: str
    vanna: str
    atr_confluence: str
    volume: str
    distance_from_spot: float
    score: int
    reasons: list[str] = Field(default_factory=list)


class AnalyticsSnapshot(BaseModel):
    timestamp: datetime
    spot: float
    futures_price: float
    basis: float
    gamma_flip: float | None
    max_pain: float | None
    call_walls: list[float]
    put_walls: list[float]
    call_wall_set: WallSet
    put_wall_set: WallSet
    gex: float
    net_vanna: float
    dealer_regime: DealerRegime
    atr_14: float | None
    expected_move: float | None
    iv_rank: float | None
    positioning_model: PositioningModel
    positioning: PositioningEvidence | None = None
    data_source: str | None = None
    levels: dict[str, list[float]]
    scored_levels: list[LevelScore]
    gex_curve: list[tuple[float, float]]
    atm_iv: float | None = None
    net_call_gamma: float | None = None
    net_put_gamma: float | None = None
    net_call_delta: float | None = None
    net_put_delta: float | None = None


class Bar(BaseModel):
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float = 0.0


class SessionName(str, Enum):
    ASIA = "ASIA"
    LONDON = "LONDON"
    NEW_YORK = "NEW_YORK"
    OFF = "OFF"


class DecisionAction(str, Enum):
    LONG = "LONG"
    SHORT = "SHORT"
    WAIT = "WAIT"
    REDUCE = "REDUCE"
    EXIT = "EXIT"
    HEDGE = "HEDGE"
    HALT = "HALT"


class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class ExecutionMode(str, Enum):
    PAPER = "PAPER"
    LIVE = "LIVE"


class CalibrationStatus(str, Enum):
    PLACEHOLDER_PRIORS = "PLACEHOLDER_PRIORS"
    SAMPLE_COMPUTED = "SAMPLE_COMPUTED"
    WALK_FORWARD = "WALK_FORWARD"
    INSUFFICIENT_HISTORY = "INSUFFICIENT_HISTORY"


class VolRegime(str, Enum):
    LOW_VOL = "LOW_VOL"
    NORMAL_VOL = "NORMAL_VOL"
    HIGH_VOL = "HIGH_VOL"
    EXTREME_VOL = "EXTREME_VOL"
    UNKNOWN = "UNKNOWN"


class StructureRegime(str, Enum):
    TRENDING_BULLISH = "TRENDING_BULLISH"
    TRENDING_BEARISH = "TRENDING_BEARISH"
    RANGE = "RANGE"
    BREAKOUT = "BREAKOUT"
    BREAKDOWN = "BREAKDOWN"
    UNKNOWN = "UNKNOWN"


class EventRisk(str, Enum):
    UNKNOWN = "UNKNOWN"
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class SessionRange(BaseModel):
    name: SessionName
    open: float | None = None
    high: float | None = None
    low: float | None = None
    close: float | None = None
    range: float | None = None
    distance_high: float | None = None
    distance_low: float | None = None


class SessionConditional(BaseModel):
    name: str
    given: str
    n: int
    p: float | None
    status: CalibrationStatus
    note: str


class SessionSnapshot(BaseModel):
    current: SessionName
    intraday_available: bool
    bar_seconds: float | None = None
    asia: SessionRange
    london: SessionRange
    new_york: SessionRange
    conditionals: list[SessionConditional] = Field(default_factory=list)


class StructureSnapshot(BaseModel):
    pdh: float | None = None
    pdl: float | None = None
    daily_open: float | None = None
    vwap: float | None = None
    atr_5: float | None = None
    atr_14: float | None = None
    atr_20: float | None = None
    atr_band_1_high: float | None = None
    atr_band_1_low: float | None = None
    atr_band_2_high: float | None = None
    atr_band_2_low: float | None = None
    realized_vol: float | None = None
    vol_regime: VolRegime = VolRegime.UNKNOWN
    structure_regime: StructureRegime = StructureRegime.UNKNOWN
    range_consumed_pct: float | None = None
    expected_remaining_range: float | None = None


class FeatureVector(BaseModel):
    """Named features for the interpretable fusion layer. Not a trade signal."""

    values: dict[str, float] = Field(default_factory=dict)
    missing: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)


class ProbabilitySnapshot(BaseModel):
    p_breakout: float
    p_rejection: float
    p_continuation: float
    p_reversal: float
    p_target: float
    p_stop: float
    calibration: CalibrationStatus = CalibrationStatus.PLACEHOLDER_PRIORS
    signal_score: int
    directional_bias: Literal["LONG", "SHORT", "FLAT"]
    evidence: list[str] = Field(default_factory=list)
    prior_note: str


class ExpectedValueSnapshot(BaseModel):
    reward_r: float
    p_win: float
    p_loss: float
    ev_r: float
    threshold: float
    tradeable: bool
    note: str


class SizeResult(BaseModel):
    lots: float
    units: float
    margin_required: float
    risk_amount: float
    utilization_pct: float
    notional: float
    leverage_used: float
    dollar_risk_per_lot: float
    capped_by: list[str] = Field(default_factory=list)
    kelly_fraction: float | None = None
    note: str


class RiskCaps(BaseModel):
    max_risk_per_trade: float = 750.0
    max_risk_pct: float = 0.015
    max_daily_loss: float = 1500.0
    max_leverage: float = 10.0
    max_position: float = 5.0
    max_margin_utilization: float = 0.30
    max_drawdown_pct: float = 0.10
    lot_step: float = 0.01
    min_lot: float = 0.01
    contract_size: float = 100.0
    broker_leverage: float = 20.0
    ev_threshold: float = 0.15
    stale_seconds: float = 120.0
    fractional_kelly: float = 0.25
    kill_switch: bool = False


class AccountState(BaseModel):
    equity: float = 50_000.0
    free_margin: float = 45_000.0
    daily_loss: float = 0.0
    drawdown_pct: float = 0.0
    event_risk: EventRisk = EventRisk.UNKNOWN
    open_lots: float = 0.0
    open_side: Literal["LONG", "SHORT", "FLAT"] = "FLAT"


class RiskAssessment(BaseModel):
    halt: bool
    block_new: bool
    risk_level: RiskLevel
    reasons: list[str] = Field(default_factory=list)
    data_freshness_seconds: float | None = None
    stale: bool = False


class TradePlan(BaseModel):
    side: Literal["LONG", "SHORT", "FLAT"]
    entry: float | None = None
    stop: float | None = None
    targets: list[float] = Field(default_factory=list)
    stop_distance: float | None = None
    reward_r: float | None = None
    reason: str = ""


class DecisionDashboard(BaseModel):
    """Section 32 real-time decision output (as far as current data allows)."""

    mode: ExecutionMode = ExecutionMode.PAPER
    timestamp: datetime
    data_freshness_seconds: float | None = None
    xauusd: float
    futures: float
    basis: float
    session: SessionName
    regime: str
    gamma_flip: float | None = None
    call_wall: float | None = None
    put_wall: float | None = None
    max_pain: float | None = None
    iv: float | None = None
    iv_change: float | None = None
    iv_skew: float | None = None
    iv_rank: float | None = None
    call_gamma: float | None = None
    put_gamma: float | None = None
    call_delta: float | None = None
    put_delta: float | None = None
    options_flow: str = "ESTIMATED"
    momentum: str = "UNKNOWN"
    asian_high: float | None = None
    asian_low: float | None = None
    london_high: float | None = None
    london_low: float | None = None
    ny_high: float | None = None
    ny_low: float | None = None
    expected_remaining_range: float | None = None
    atr_14: float | None = None
    probabilities: ProbabilitySnapshot
    expected_value: ExpectedValueSnapshot
    signal_score: int
    risk_level: RiskLevel
    recommendation: DecisionAction
    entry: float | None = None
    stop: float | None = None
    target_1: float | None = None
    target_2: float | None = None
    target_3: float | None = None
    position_size: SizeResult
    reason: str
    dealer_positioning: dict = Field(default_factory=dict)
    session_conditionals: list[SessionConditional] = Field(default_factory=list)
    structure: StructureSnapshot | None = None
    features: FeatureVector | None = None
    risk: RiskAssessment
    data_source: str | None = None
    chain_available: bool = False
