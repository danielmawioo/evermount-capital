from __future__ import annotations

from gex_engine.chain import enrich_chain, net_gex, net_vanna
from gex_engine.gex import gamma_flip, gex_curve
from gex_engine.max_pain import max_pain
from gex_engine.models import (
    AnalyticsSnapshot,
    CotPositioning,
    InstrumentMap,
    OptionQuote,
    OptionType,
    PositioningModel,
    UnderlyingState,
)
from gex_engine.positioning import infer_dealer_signs
from gex_engine.regime import classify_regime
from gex_engine.scoring import score_levels
from gex_engine.volatility import atr, expected_move, iv_rank, realized_vol
from gex_engine.walls import unique_walls, walls


class AnalyticsEngine:
    def __init__(
        self,
        instruments: InstrumentMap | None = None,
        positioning: PositioningModel = PositioningModel.STANDARD_DEALER_HEDGE,
        gex_step: float = 5.0,
        transition_grid_pad: float = 80.0,
    ) -> None:
        self.instruments = instruments or InstrumentMap()
        self.positioning = positioning
        self.gex_step = gex_step
        self.transition_grid_pad = transition_grid_pad

    def snapshot(
        self,
        quotes: list[OptionQuote],
        underlying: UnderlyingState,
        *,
        highs: list[float] | None = None,
        lows: list[float] | None = None,
        closes: list[float] | None = None,
        iv_history: list[float] | None = None,
        cot: CotPositioning | None = None,
        data_source: str | None = None,
    ) -> AnalyticsSnapshot:
        return build_analytics_snapshot(
            quotes,
            underlying,
            self.instruments,
            self.positioning,
            highs=highs,
            lows=lows,
            closes=closes,
            iv_history=iv_history,
            gex_step=self.gex_step,
            grid_pad=self.transition_grid_pad,
            cot=cot,
            data_source=data_source,
        )


def build_analytics_snapshot(
    quotes: list[OptionQuote],
    underlying: UnderlyingState,
    instruments: InstrumentMap,
    positioning: PositioningModel,
    *,
    highs: list[float] | None = None,
    lows: list[float] | None = None,
    closes: list[float] | None = None,
    iv_history: list[float] | None = None,
    gex_step: float = 5.0,
    grid_pad: float = 80.0,
    cot: CotPositioning | None = None,
    data_source: str | None = None,
) -> AnalyticsSnapshot:
    signs, evidence = infer_dealer_signs(
        quotes, underlying.futures_price, positioning, cot
    )
    chain = enrich_chain(
        quotes, underlying, instruments, positioning, signs=signs
    )
    total_gex = net_gex(chain)
    total_vanna = net_vanna(chain)
    strikes = [q.strike for q in quotes] or [underlying.futures_price]
    low = min(strikes) if min(strikes) < underlying.futures_price else underlying.futures_price - grid_pad
    high = max(strikes) if max(strikes) > underlying.futures_price else underlying.futures_price + grid_pad
    curve = gex_curve(
        quotes,
        underlying,
        instruments,
        positioning,
        low=min(low, underlying.futures_price - grid_pad),
        high=max(high, underlying.futures_price + grid_pad),
        step=gex_step,
        signs=signs,
    )
    flip = gamma_flip(curve)
    pain = max_pain(quotes)
    call_wall_set = walls(chain, OptionType.CALL)
    put_wall_set = walls(chain, OptionType.PUT)
    atr_value = atr(highs or [], lows or [], closes or []) if closes else None
    atm = min(quotes, key=lambda q: abs(q.strike - underlying.futures_price), default=None)
    move = None
    rank = None
    if atm is not None:
        tau = next(
            item.time_to_expiry
            for item in chain
            if item.quote.strike == atm.strike
            and item.quote.option_type == atm.option_type
            and item.quote.expiry == atm.expiry
        )
        move = expected_move(underlying.spot, atm.implied_volatility, tau)
        rank = iv_rank(atm.implied_volatility, iv_history or [])
    _ = realized_vol(closes or [])

    call_walls = unique_walls(call_wall_set)
    put_walls = unique_walls(put_wall_set)
    regime = classify_regime(total_gex, underlying.spot, flip, atr_value)
    calls = [item for item in chain if item.quote.option_type is OptionType.CALL]
    puts = [item for item in chain if item.quote.option_type is OptionType.PUT]
    net_call_gamma = sum(item.gamma * item.quote.open_interest for item in calls) or None
    net_put_gamma = sum(item.gamma * item.quote.open_interest for item in puts) or None
    net_call_delta = sum(item.delta * item.quote.open_interest for item in calls) or None
    net_put_delta = sum(item.delta * item.quote.open_interest for item in puts) or None
    atm_iv = atm.implied_volatility if atm is not None else None

    resistance = sorted(
        {p for p in [*call_walls, flip, pain] if p is not None and p >= underlying.spot}
    )
    support = sorted(
        {p for p in [*put_walls, flip, pain] if p is not None and p <= underlying.spot},
        reverse=True,
    )
    candidates: list[tuple[float, str]] = [(p, "resistance") for p in resistance] + [
        (p, "support") for p in support
    ]
    if flip is not None:
        candidates.append((flip, "pivot"))

    return AnalyticsSnapshot(
        timestamp=underlying.timestamp,
        spot=underlying.spot,
        futures_price=underlying.futures_price,
        basis=round(underlying.futures_price - underlying.spot, 4),
        gamma_flip=flip,
        max_pain=pain,
        call_walls=call_walls,
        put_walls=put_walls,
        call_wall_set=call_wall_set,
        put_wall_set=put_wall_set,
        gex=total_gex,
        net_vanna=total_vanna,
        dealer_regime=regime,
        atr_14=atr_value,
        expected_move=move,
        iv_rank=rank,
        positioning_model=positioning,
        positioning=evidence,
        data_source=data_source,
        levels={"resistance": resistance, "support": support},
        scored_levels=score_levels(
            spot=underlying.spot,
            atr_value=atr_value,
            candidates=candidates,
            chain=chain,
        ),
        gex_curve=curve,
        atm_iv=atm_iv,
        net_call_gamma=net_call_gamma,
        net_put_gamma=net_put_gamma,
        net_call_delta=net_call_delta,
        net_put_delta=net_put_delta,
    )
