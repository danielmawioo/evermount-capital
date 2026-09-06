"""Black-76 Greeks. COMEX gold options are options on futures, not spot."""

from __future__ import annotations

import math

from gex_engine.models import OptionType

_SQRT_2PI = math.sqrt(2.0 * math.pi)


def _norm_cdf(x: float) -> float:
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def _norm_pdf(x: float) -> float:
    return math.exp(-0.5 * x * x) / _SQRT_2PI


def _d1_d2(forward: float, strike: float, sigma: float, tau: float) -> tuple[float, float]:
    if forward <= 0 or strike <= 0 or sigma <= 0 or tau <= 0:
        raise ValueError("forward, strike, sigma, and tau must be positive")
    vol_sqrt_t = sigma * math.sqrt(tau)
    d1 = (math.log(forward / strike) + 0.5 * sigma * sigma * tau) / vol_sqrt_t
    d2 = d1 - vol_sqrt_t
    return d1, d2


def greeks(
    *,
    forward: float,
    strike: float,
    sigma: float,
    tau: float,
    rate: float,
    option_type: OptionType,
) -> dict[str, float]:
    """Return Black-76 delta/gamma/vega/theta/vanna/charm.

    Gamma is ∂²V/∂F². Vega is per 1.0 absolute vol (not 1 vol point).
    Vanna is ∂Δ/∂σ. Charm is ∂Δ/∂τ with τ in years (delta decay).
    """
    d1, d2 = _d1_d2(forward, strike, sigma, tau)
    pdf = _norm_pdf(d1)
    disc = math.exp(-rate * tau)
    sqrt_t = math.sqrt(tau)
    vol_sqrt_t = sigma * sqrt_t

    gamma = disc * pdf / (forward * vol_sqrt_t)
    vega = disc * forward * pdf * sqrt_t
    vanna = -disc * pdf * d2 / sigma

    if option_type is OptionType.CALL:
        delta = disc * _norm_cdf(d1)
        theta = (
            -disc * forward * pdf * sigma / (2.0 * sqrt_t)
            + rate * disc * forward * _norm_cdf(d1)
            - rate * disc * strike * _norm_cdf(d2)
        )
        charm = rate * disc * _norm_cdf(d1) - disc * pdf * (
            2.0 * rate * tau - d2 * vol_sqrt_t
        ) / (2.0 * tau * vol_sqrt_t)
    else:
        delta = -disc * _norm_cdf(-d1)
        theta = (
            -disc * forward * pdf * sigma / (2.0 * sqrt_t)
            - rate * disc * forward * _norm_cdf(-d1)
            + rate * disc * strike * _norm_cdf(-d2)
        )
        charm = -rate * disc * _norm_cdf(-d1) - disc * pdf * (
            2.0 * rate * tau - d2 * vol_sqrt_t
        ) / (2.0 * tau * vol_sqrt_t)

    return {
        "delta": delta,
        "gamma": gamma,
        "vega": vega,
        "theta": theta,
        "vanna": vanna,
        "charm": charm,
    }


def black76_price(
    *,
    forward: float,
    strike: float,
    sigma: float,
    tau: float,
    rate: float,
    option_type: OptionType,
) -> float:
    d1, d2 = _d1_d2(forward, strike, sigma, tau)
    disc = math.exp(-rate * tau)
    if option_type is OptionType.CALL:
        return disc * (forward * _norm_cdf(d1) - strike * _norm_cdf(d2))
    return disc * (strike * _norm_cdf(-d2) - forward * _norm_cdf(-d1))


def implied_vol(
    *,
    price: float,
    forward: float,
    strike: float,
    tau: float,
    rate: float,
    option_type: OptionType,
) -> float | None:
    if price <= 0 or forward <= 0 or strike <= 0 or tau <= 0:
        return None
    intrinsic = math.exp(-rate * tau) * (
        max(forward - strike, 0.0) if option_type is OptionType.CALL else max(strike - forward, 0.0)
    )
    if price < intrinsic * 0.999:
        price = intrinsic
    lo, hi = 1e-4, 5.0
    for _ in range(80):
        mid = 0.5 * (lo + hi)
        model = black76_price(
            forward=forward,
            strike=strike,
            sigma=mid,
            tau=tau,
            rate=rate,
            option_type=option_type,
        )
        if model > price:
            hi = mid
        else:
            lo = mid
    return 0.5 * (lo + hi)
