from __future__ import annotations

from datetime import datetime, timezone

import httpx

from gex_engine.models import Bar, UnderlyingState

CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart/GC=F"
HEADERS = {"User-Agent": "Mozilla/5.0", "Accept": "application/json"}


class YahooError(RuntimeError):
    pass


def fetch_gc_futures(spot: float) -> tuple[UnderlyingState, list[float], list[float], list[float]]:
    payload = _chart("1d", "2mo")
    meta = payload.get("meta") or {}
    last = meta.get("regularMarketPrice") or meta.get("chartPreviousClose")
    if last is None:
        raise YahooError("Yahoo GC=F last price missing")
    bars = _bars_from_chart(payload)
    return (
        UnderlyingState(
            timestamp=datetime.now(timezone.utc),
            spot=spot,
            futures_price=float(last),
            volume=float(meta.get("regularMarketVolume") or 0),
            futures_symbol=str(meta.get("symbol") or "GC=F"),
        ),
        [b.high for b in bars],
        [b.low for b in bars],
        [b.close for b in bars],
    )


def fetch_gc_intraday(interval: str = "15m", span: str = "10d") -> list[Bar]:
    return _bars_from_chart(_chart(interval, span))


def _chart(interval: str, span: str) -> dict:
    response = httpx.get(
        CHART_URL,
        params={"interval": interval, "range": span},
        headers=HEADERS,
        timeout=20.0,
    )
    response.raise_for_status()
    result = (response.json().get("chart") or {}).get("result") or []
    if not result:
        raise YahooError("Yahoo GC=F chart empty")
    return result[0]


def _bars_from_chart(payload: dict) -> list[Bar]:
    timestamps = payload.get("timestamp") or []
    quote = (payload.get("indicators") or {}).get("quote") or [{}]
    opens = quote[0].get("open") or []
    highs = quote[0].get("high") or []
    lows = quote[0].get("low") or []
    closes = quote[0].get("close") or []
    volumes = quote[0].get("volume") or []
    bars: list[Bar] = []
    for i, raw_ts in enumerate(timestamps):
        if i >= len(closes) or closes[i] is None:
            continue
        high = highs[i] if i < len(highs) and highs[i] is not None else closes[i]
        low = lows[i] if i < len(lows) and lows[i] is not None else closes[i]
        open_px = opens[i] if i < len(opens) and opens[i] is not None else closes[i]
        volume = volumes[i] if i < len(volumes) and volumes[i] is not None else 0.0
        bars.append(
            Bar(
                timestamp=datetime.fromtimestamp(int(raw_ts), tz=timezone.utc),
                open=float(open_px),
                high=float(high),
                low=float(low),
                close=float(closes[i]),
                volume=float(volume),
            )
        )
    return bars
