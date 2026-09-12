from __future__ import annotations

import threading
from dataclasses import dataclass, field
from datetime import datetime, timezone

from gex_engine.models import (
    AnalyticsSnapshot,
    Bar,
    CotPositioning,
    InstrumentMap,
    OptionQuote,
    PositioningModel,
    UnderlyingState,
)
from gex_engine.normalize import fill_missing_iv
from gex_engine.pipeline import AnalyticsEngine
from gex_engine.session import bars_from_hlc
from gex_engine.settings import GEX_POLL_SECONDS, GEX_RATE, GEX_VENDOR
from gex_engine.vendors.barchart import BarchartClient
from gex_engine.vendors.cftc import fetch_gold_cot
from gex_engine.vendors.gold_spot import fetch_xau_spot
from gex_engine.vendors.yahoo import fetch_gc_futures, fetch_gc_intraday


@dataclass
class LiveState:
    updated_at: datetime | None = None
    source: str = "uninitialized"
    error: str | None = None
    underlying: UnderlyingState | None = None
    quotes: list[OptionQuote] = field(default_factory=list)
    highs: list[float] = field(default_factory=list)
    lows: list[float] = field(default_factory=list)
    closes: list[float] = field(default_factory=list)
    cot: CotPositioning | None = None
    snapshot: AnalyticsSnapshot | None = None
    chain_available: bool = False
    bars: list[Bar] = field(default_factory=list)


class LiveFeed:
    def __init__(self) -> None:
        self.instruments = InstrumentMap(rate=GEX_RATE)
        self.engine = AnalyticsEngine(
            instruments=self.instruments,
            positioning=PositioningModel.CHAIN_INFERRED,
        )
        self.barchart = BarchartClient()
        self.state = LiveState()
        self._lock = threading.Lock()
        self._thread: threading.Thread | None = None
        self._stop = threading.Event()

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        self._thread = threading.Thread(target=self._loop, name="gex-live-feed", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()

    def refresh(self) -> LiveState:
        try:
            state = self._pull()
        except Exception as exc:
            with self._lock:
                self.state.error = str(exc)
                self.state.updated_at = datetime.now(timezone.utc)
                return self.state
        with self._lock:
            self.state = state
        try:
            from gex_engine.overlay_export import write_mt5_overlay

            write_mt5_overlay(state)
        except Exception:
            pass
        return state

    def current(self) -> LiveState:
        with self._lock:
            return self.state

    def _loop(self) -> None:
        while not self._stop.is_set():
            self.refresh()
            self._stop.wait(GEX_POLL_SECONDS)

    def _pull(self) -> LiveState:
        spot = fetch_xau_spot()
        cot = None
        try:
            cot = fetch_gold_cot()
        except Exception:
            cot = self.state.cot

        quotes: list[OptionQuote] = []
        source = "yahoo+gold-api+cftc"
        underlying: UnderlyingState
        highs: list[float] = []
        lows: list[float] = []
        closes: list[float] = []

        yahoo_underlying, y_highs, y_lows, y_closes = fetch_gc_futures(spot)
        highs, lows, closes = y_highs, y_lows, y_closes
        underlying = yahoo_underlying
        bars: list[Bar] = bars_from_hlc(highs, lows, closes, end=underlying.timestamp)
        try:
            intraday = fetch_gc_intraday()
            if len(intraday) >= 8:
                bars = intraday
        except Exception:
            pass

        if GEX_VENDOR == "barchart" and self.barchart.configured:
            try:
                bc_underlying, contract = self.barchart.fetch_underlying(spot)
                quotes = fill_missing_iv(
                    self.barchart.fetch_chain(contract),
                    bc_underlying,
                    self.instruments,
                )
                history = self.barchart.history(bc_underlying.futures_symbol or f"{self.barchart.root}*0")
                if history:
                    highs = [float(row["high"]) for row in history if row.get("high") is not None]
                    lows = [float(row["low"]) for row in history if row.get("low") is not None]
                    closes = [
                        float(row.get("close") or row.get("lastPrice"))
                        for row in history
                        if row.get("close") is not None or row.get("lastPrice") is not None
                    ]
                underlying = bc_underlying
                source = f"barchart:{contract}+gold-api+cftc"
            except Exception as exc:
                return LiveState(
                    updated_at=datetime.now(timezone.utc),
                    source=source,
                    error=f"Options chain failed: {exc}",
                    underlying=underlying,
                    quotes=[],
                    highs=highs,
                    lows=lows,
                    closes=closes,
                    cot=cot,
                    snapshot=None,
                    chain_available=False,
                    bars=bars,
                )
        elif GEX_VENDOR == "databento":
            raise RuntimeError(
                "Databento is configured as GEX_VENDOR but the live adapter is not enabled. "
                "Set GEX_VENDOR=barchart and BARCHART_API_KEY, or keep using Barchart."
            )

        snapshot = None
        if quotes:
            snapshot = self.engine.snapshot(
                quotes,
                underlying,
                highs=highs or None,
                lows=lows or None,
                closes=closes or None,
                cot=cot,
                data_source=source,
            )

        return LiveState(
            updated_at=datetime.now(timezone.utc),
            source=source,
            error=None if quotes else "COMEX options chain requires BARCHART_API_KEY",
            underlying=underlying,
            quotes=quotes,
            highs=highs,
            lows=lows,
            closes=closes,
            cot=cot,
            snapshot=snapshot,
            chain_available=bool(quotes),
            bars=bars,
        )


feed = LiveFeed()
