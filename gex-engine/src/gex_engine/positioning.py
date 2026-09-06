from __future__ import annotations

from statistics import median

from gex_engine.models import CotPositioning, OptionQuote, OptionType, PositioningEvidence, PositioningModel


def dealer_sign(option_type: OptionType, model: PositioningModel) -> float:
    """+1 means the dealer book is long this option, -1 means short.

    STANDARD_DEALER_HEDGE uses the common index-options convention:
    dealers are treated as short calls and long puts. That is an
    assumption, not a fact inferred from open interest.
    """
    if model is PositioningModel.CUSTOMER_LONG_OPTIONS:
        return -1.0
    if model is PositioningModel.DEALER_LONG_OPTIONS:
        return 1.0
    if option_type is OptionType.CALL:
        return -1.0
    return 1.0


def quote_key(quote: OptionQuote) -> tuple:
    return (quote.expiry, quote.strike, quote.option_type)


def infer_dealer_signs(
    quotes: list[OptionQuote],
    forward: float,
    model: PositioningModel,
    cot: CotPositioning | None = None,
) -> tuple[dict[tuple, float], PositioningEvidence]:
    call_oi = sum(q.open_interest for q in quotes if q.option_type is OptionType.CALL)
    put_oi = sum(q.open_interest for q in quotes if q.option_type is OptionType.PUT)
    call_vol = sum(q.volume for q in quotes if q.option_type is OptionType.CALL)
    put_vol = sum(q.volume for q in quotes if q.option_type is OptionType.PUT)
    total_oi = call_oi + put_oi
    total_vol = call_vol + put_vol

    if model is not PositioningModel.CHAIN_INFERRED:
        signs = {quote_key(q): dealer_sign(q.option_type, model) for q in quotes}
        return signs, _evidence(model, call_oi, put_oi, call_vol, put_vol, total_oi, total_vol, cot, signs, quotes)

    # CFTC swap dealers are the closest public "dealer" book for COMEX gold.
    # Net short futures → treat the options book like a short-delta dealer
    # (short calls, long puts). Net long futures flips that tilt.
    if cot is None or cot.swap_net <= 0:
        call_base, put_base = -1.0, 1.0
        note = (
            "ESTIMATED dealer book. Signs blend CFTC swap-dealer futures positioning with "
            "chain volume/OI. Swap dealers are net short gold futures, so the "
            "book is tilted short calls / long puts. Per-strike signs still "
            "move with session volume. This is inferred, not a disclosed options book."
        )
    else:
        call_base, put_base = 1.0, -1.0
        note = (
            "ESTIMATED dealer book. Signs blend CFTC swap-dealer futures positioning with "
            "chain volume/OI. Swap dealers are net long gold futures, so the "
            "book is tilted long calls / short puts. This is inferred, not a "
            "disclosed options book."
        )

    volumes = [q.volume for q in quotes if q.volume > 0]
    med_vol = median(volumes) if volumes else 0.0
    signs: dict[tuple, float] = {}
    for quote in quotes:
        otm = (quote.strike > forward) if quote.option_type is OptionType.CALL else (quote.strike < forward)
        customer_long = 0.55
        if otm:
            customer_long += 0.08
        if med_vol and quote.volume >= 2 * med_vol:
            customer_long += 0.18
        if quote.open_interest > 0 and quote.volume / quote.open_interest >= 0.15:
            customer_long += 0.12
        if not otm and quote.volume < (med_vol or 1) and quote.open_interest > 0:
            customer_long -= 0.12
        customer_long = min(0.92, max(0.08, customer_long))
        flow_sign = 1.0 - 2.0 * customer_long  # customer long → dealer short
        base = call_base if quote.option_type is OptionType.CALL else put_base
        signs[quote_key(quote)] = max(-1.0, min(1.0, 0.65 * base + 0.35 * flow_sign))

    return signs, _evidence(model, call_oi, put_oi, call_vol, put_vol, total_oi, total_vol, cot, signs, quotes, note)


def _evidence(
    model: PositioningModel,
    call_oi: float,
    put_oi: float,
    call_vol: float,
    put_vol: float,
    total_oi: float,
    total_vol: float,
    cot: CotPositioning | None,
    signs: dict[tuple, float],
    quotes: list[OptionQuote],
    note: str | None = None,
) -> PositioningEvidence:
    call_signs = [signs[quote_key(q)] for q in quotes if q.option_type is OptionType.CALL]
    put_signs = [signs[quote_key(q)] for q in quotes if q.option_type is OptionType.PUT]
    if note is None:
        note = (
            "ESTIMATED dealer book from a fixed positioning hypothesis. "
            "Open interest does not disclose long/short holders."
        )
    confidence = 0.20
    if model is PositioningModel.CHAIN_INFERRED:
        confidence = 0.30
        if cot is not None:
            confidence += 0.15
        if quotes:
            confidence += 0.10
        if total_vol > 0 and total_oi > 0:
            confidence += 0.05
        confidence = min(confidence, 0.60)
    return PositioningEvidence(
        model=model,
        note=note,
        call_oi=call_oi,
        put_oi=put_oi,
        call_volume=call_vol,
        put_volume=put_vol,
        put_call_oi=(put_oi / call_oi) if call_oi else None,
        volume_oi=(total_vol / total_oi) if total_oi else None,
        cot=cot,
        average_dealer_sign_calls=(sum(call_signs) / len(call_signs)) if call_signs else None,
        average_dealer_sign_puts=(sum(put_signs) / len(put_signs)) if put_signs else None,
        estimated=True,
        label="ESTIMATED",
        confidence=round(confidence, 2),
    )
