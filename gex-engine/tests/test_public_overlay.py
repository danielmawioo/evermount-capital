from datetime import datetime, timezone

from gex_engine.live import LiveState
from gex_engine.models import UnderlyingState
from gex_engine.overlay_export import overlay_payload, public_overlay_payload


def _state() -> LiveState:
    now = datetime.now(timezone.utc)
    return LiveState(
        updated_at=now,
        source="test",
        underlying=UnderlyingState(
            timestamp=now,
            spot=4367.86,
            futures_price=4372.4,
        ),
    )


def test_public_overlay_adds_analytics_and_paper_risk_without_decision_fields():
    payload = public_overlay_payload(_state())
    assert payload["spot"] == 4367.86
    assert payload["session"] in {"ASIA", "LONDON", "NEW_YORK", "OFF"}
    assert payload["calibration"] == "PLACEHOLDER_PRIORS"
    assert payload["mode"] == "PAPER"
    assert payload["halt"] is False
    assert payload["risk_budget_usd"] == 750.0
    assert payload["max_daily_loss_usd"] == 1500.0
    assert "action" not in payload
    assert "lots" not in payload
    assert "directional_bias" not in payload


def test_mt5_overlay_stays_flat_without_research_risk_keys():
    payload = overlay_payload(_state())
    assert "risk_budget_usd" not in payload
    assert "session" not in payload
