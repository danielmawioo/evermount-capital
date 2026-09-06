"""Expected value in R-multiples. Trade only if EV exceeds a threshold."""

from __future__ import annotations

from gex_engine.models import ExpectedValueSnapshot, ProbabilitySnapshot


def expected_value(
    probs: ProbabilitySnapshot,
    *,
    reward_r: float,
    threshold: float,
) -> ExpectedValueSnapshot:
    """EV = Pwin * avg_win - Ploss * avg_loss, with avg_win = reward_r and avg_loss = 1R.

    Pwin / Ploss use P(target) and P(stop). These probabilities are placeholders
    until walk-forward calibration exists.
    """
    p_win = probs.p_target
    p_loss = probs.p_stop
    if reward_r <= 0:
        ev = -p_loss
        return ExpectedValueSnapshot(
            reward_r=reward_r,
            p_win=p_win,
            p_loss=p_loss,
            ev_r=round(ev, 4),
            threshold=threshold,
            tradeable=False,
            note="Invalid reward distance; EV not tradeable.",
        )
    ev = p_win * reward_r - p_loss * 1.0
    tradeable = ev > threshold
    note = (
        f"EV = {p_win:.3f}*{reward_r:.2f}R - {p_loss:.3f}*1R = {ev:.3f}R. "
        f"Threshold {threshold:.2f}R. "
        "Pwin/Ploss are placeholder-calibrated, not guaranteed."
    )
    if not tradeable:
        note += " Below EV threshold — do not enter."
    return ExpectedValueSnapshot(
        reward_r=round(reward_r, 4),
        p_win=p_win,
        p_loss=p_loss,
        ev_r=round(ev, 4),
        threshold=threshold,
        tradeable=tradeable,
        note=note,
    )
