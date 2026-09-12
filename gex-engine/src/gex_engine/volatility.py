from __future__ import annotations

import math


def atr(highs: list[float], lows: list[float], closes: list[float], period: int = 14) -> float | None:
    if len(closes) < period + 1 or not (len(highs) == len(lows) == len(closes)):
        return None
    true_ranges: list[float] = []
    for i in range(1, len(closes)):
        true_ranges.append(
            max(
                highs[i] - lows[i],
                abs(highs[i] - closes[i - 1]),
                abs(lows[i] - closes[i - 1]),
            )
        )
    window = true_ranges[-period:]
    return sum(window) / period


def realized_vol(closes: list[float], periods_per_year: int = 252) -> float | None:
    if len(closes) < 3:
        return None
    logs = [math.log(closes[i] / closes[i - 1]) for i in range(1, len(closes)) if closes[i - 1] > 0]
    if len(logs) < 2:
        return None
    mean = sum(logs) / len(logs)
    var = sum((x - mean) ** 2 for x in logs) / (len(logs) - 1)
    return math.sqrt(var * periods_per_year)


def expected_move(spot: float, atm_iv: float, tau: float) -> float:
    return spot * atm_iv * math.sqrt(max(tau, 0.0))


def iv_rank(current_iv: float, history: list[float]) -> float | None:
    if not history:
        return None
    lo = min(history)
    hi = max(history)
    if hi == lo:
        return 50.0
    return 100.0 * (current_iv - lo) / (hi - lo)


def atr_bands(spot: float, atr_value: float, k: float = 1.0) -> tuple[float, float]:
    return spot + k * atr_value, spot - k * atr_value


def classify_vol_regime(atr_14: float | None, atr_20: float | None) -> str:
    """Compare short ATR to a longer baseline. UNKNOWN if either series is missing."""
    if atr_14 is None or atr_20 is None or atr_20 <= 0:
        return "UNKNOWN"
    ratio = atr_14 / atr_20
    if ratio < 0.75:
        return "LOW_VOL"
    if ratio < 1.15:
        return "NORMAL_VOL"
    if ratio < 1.50:
        return "HIGH_VOL"
    return "EXTREME_VOL"
