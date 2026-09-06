from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from gex_engine.decision import build_decision
from gex_engine.live import feed
from gex_engine.overlay_export import overlay_payload
from gex_engine.models import (
    AnalyticsSnapshot,
    EventRisk,
    InstrumentMap,
    OptionQuote,
    PositioningModel,
    UnderlyingState,
)
from gex_engine.pipeline import AnalyticsEngine
from gex_engine.risk import default_account, default_caps
from gex_engine.settings import BARCHART_API_KEY, GEX_VENDOR


@asynccontextmanager
async def lifespan(_app: FastAPI):
    feed.start()
    feed.refresh()
    yield
    feed.stop()


app = FastAPI(title="Evermount GEX Engine", version="0.3.0", lifespan=lifespan)
engine = AnalyticsEngine()


class AnalyticsRequest(BaseModel):
    quotes: list[OptionQuote]
    underlying: UnderlyingState
    highs: list[float] = Field(default_factory=list)
    lows: list[float] = Field(default_factory=list)
    closes: list[float] = Field(default_factory=list)
    iv_history: list[float] = Field(default_factory=list)
    positioning: PositioningModel = PositioningModel.CHAIN_INFERRED
    instruments: InstrumentMap = Field(default_factory=InstrumentMap)


@app.get("/api/status")
def status() -> dict:
    state = feed.current()
    return {
        "vendor": GEX_VENDOR,
        "barchart_configured": bool(BARCHART_API_KEY),
        "updated_at": state.updated_at,
        "source": state.source,
        "chain_available": state.chain_available,
        "error": state.error,
        "quote_count": len(state.quotes),
    }


@app.post("/api/refresh")
def refresh() -> dict:
    state = feed.refresh()
    return status() | {"refreshed": True, "error": state.error}


@app.get("/api/market")
def market() -> dict:
    state = _require_underlying()
    underlying = state.underlying
    return {
        "timestamp": underlying.timestamp,
        "spot": underlying.spot,
        "futures_price": underlying.futures_price,
        "basis": round(underlying.futures_price - underlying.spot, 4),
        "futures_symbol": underlying.futures_symbol,
        "volume": underlying.volume,
        "source": state.source,
        "cot": state.cot.model_dump() if state.cot else None,
    }


@app.get("/api/mt5")
def mt5_overlay() -> dict:
    """Flat payload for the MetaTrader 5 overlay (MQL5-friendly)."""
    state = _require_underlying()
    return overlay_payload(state)


@app.get("/api/positioning")
def positioning() -> dict:
    state = _require_underlying()
    if state.snapshot:
        return state.snapshot.positioning.model_dump() if state.snapshot.positioning else {}
    if state.cot:
        return {"cot": state.cot.model_dump(), "note": "Options chain not loaded; CFTC futures dealer book only."}
    raise HTTPException(503, "Positioning data is not available yet")


@app.get("/api/levels")
def levels() -> dict:
    snapshot = _require_snapshot()
    return snapshot.model_dump(mode="json")


@app.get("/api/gex")
def gex() -> dict:
    snapshot = _require_snapshot()
    return {
        "gex": snapshot.gex,
        "gamma_flip": snapshot.gamma_flip,
        "curve": snapshot.gex_curve,
        "dealer_regime": snapshot.dealer_regime,
        "positioning": snapshot.positioning,
        "data_source": snapshot.data_source,
    }


@app.get("/api/regime")
def regime() -> dict:
    snapshot = _require_snapshot()
    return {
        "dealer_regime": snapshot.dealer_regime,
        "spot": snapshot.spot,
        "gamma_flip": snapshot.gamma_flip,
        "gex": snapshot.gex,
        "positioning": snapshot.positioning,
    }


@app.get("/api/decision")
def decision(
    equity: float | None = None,
    free_margin: float | None = None,
    daily_loss: float = 0.0,
    drawdown_pct: float = 0.0,
    event_risk: str = "UNKNOWN",
    kill_switch: bool | None = None,
    open_lots: float = 0.0,
    open_side: str = "FLAT",
) -> dict:
    """Section 32 dashboard. PAPER mode. Does not place broker orders."""
    state = _require_underlying()
    try:
        event = EventRisk(event_risk.upper())
    except ValueError:
        event = EventRisk.UNKNOWN
    side = open_side.upper() if open_side.upper() in {"LONG", "SHORT", "FLAT"} else "FLAT"
    account_kwargs: dict = {
        "daily_loss": daily_loss,
        "drawdown_pct": drawdown_pct,
        "event_risk": event,
        "open_lots": open_lots,
        "open_side": side,
    }
    if equity is not None:
        account_kwargs["equity"] = equity
    if free_margin is not None:
        account_kwargs["free_margin"] = free_margin
    account = default_account(**account_kwargs)
    caps = default_caps() if kill_switch is None else default_caps(kill_switch=kill_switch)
    payload = build_decision(state, account=account, caps=caps)
    return payload.model_dump(mode="json")


@app.get("/api/options")
def options() -> dict:
    state = _require_underlying()
    if not state.quotes:
        raise HTTPException(
            503,
            "COMEX gold options require a Barchart OnDemand key. Set BARCHART_API_KEY in gex-engine/.env",
        )
    return {
        "source": state.source,
        "underlying": state.underlying.model_dump(mode="json") if state.underlying else None,
        "quotes": [q.model_dump(mode="json") for q in state.quotes],
    }


@app.post("/api/analytics")
def analytics(request: AnalyticsRequest) -> AnalyticsSnapshot:
    local = AnalyticsEngine(instruments=request.instruments, positioning=request.positioning)
    return local.snapshot(
        request.quotes,
        request.underlying,
        highs=request.highs or None,
        lows=request.lows or None,
        closes=request.closes or None,
        iv_history=request.iv_history or None,
    )


def _require_underlying():
    state = feed.current()
    if state.underlying is None:
        state = feed.refresh()
    if state.underlying is None:
        raise HTTPException(503, state.error or "Live market data is not available yet")
    return state


def _require_snapshot() -> AnalyticsSnapshot:
    state = _require_underlying()
    if state.snapshot is None:
        raise HTTPException(
            503,
            state.error
            or "Options analytics need a live COMEX chain. Set BARCHART_API_KEY and POST /api/refresh",
        )
    return state.snapshot


def run() -> None:
    import uvicorn

    uvicorn.run("gex_engine.api:app", host="0.0.0.0", port=8088, reload=False)


if __name__ == "__main__":
    run()
