from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

import httpx

from gex_engine.models import OptionQuote, UnderlyingState
from gex_engine.normalize import parse_option_type
from gex_engine.settings import BARCHART_API_KEY, BARCHART_ROOT

BASE = "https://ondemand.websol.barchart.com"


class BarchartError(RuntimeError):
    pass


class BarchartClient:
    def __init__(self, api_key: str | None = None, root: str | None = None, timeout: float = 30.0) -> None:
        self.api_key = api_key or BARCHART_API_KEY
        self.root = root or BARCHART_ROOT
        self.timeout = timeout

    @property
    def configured(self) -> bool:
        return bool(self.api_key)

    def _get(self, path: str, params: dict[str, Any]) -> dict[str, Any]:
        if not self.api_key:
            raise BarchartError("BARCHART_API_KEY is not set")
        query = {"apikey": self.api_key, **params}
        response = httpx.get(f"{BASE}/{path}", params=query, timeout=self.timeout)
        response.raise_for_status()
        payload = response.json()
        status = payload.get("status") or {}
        code = str(status.get("code", ""))
        if code and code not in {"200", "204"}:
            raise BarchartError(status.get("message") or f"Barchart error {code}")
        return payload

    def front_month_quote(self) -> dict[str, Any]:
        payload = self._get(
            "getQuote.json",
            {
                "symbols": f"{self.root}*0",
                "fields": "lastPrice,volume,openInterest,symbol,contract,tradeTime",
            },
        )
        results = payload.get("results") or []
        if not results:
            raise BarchartError(f"No Barchart quote for {self.root}*0")
        return results[0]

    def history(self, symbol: str, max_records: int = 40) -> list[dict[str, Any]]:
        payload = self._get(
            "getHistory.json",
            {"symbol": symbol, "type": "daily", "maxRecords": max_records},
        )
        return payload.get("results") or []

    def option_chain(self, contract: str) -> list[dict[str, Any]]:
        payload = self._get(
            "getFuturesOptions.json",
            {
                "root": self.root,
                "contract": contract,
                "fields": "strike,expirationDate,type,bid,ask,last,volume,openInterest,impliedVolatility",
            },
        )
        return payload.get("results") or []

    def fetch_underlying(self, spot: float) -> tuple[UnderlyingState, str]:
        quote = self.front_month_quote()
        last = _num(quote.get("lastPrice") or quote.get("close") or quote.get("last"))
        if last is None:
            raise BarchartError("Barchart futures last price missing")
        symbol = str(quote.get("symbol") or quote.get("contract") or f"{self.root}*0")
        volume = _num(quote.get("volume")) or 0.0
        return (
            UnderlyingState(
                timestamp=datetime.now(timezone.utc),
                spot=spot,
                futures_price=last,
                volume=volume,
                futures_symbol=symbol,
            ),
            _contract_code(quote),
        )

    def fetch_chain(self, contract: str) -> list[OptionQuote]:
        rows = self.option_chain(contract)
        quotes: list[OptionQuote] = []
        for row in rows:
            strike = _num(row.get("strike") or row.get("strikePrice"))
            expiry_raw = row.get("expirationDate") or row.get("expiration")
            if strike is None or not expiry_raw:
                continue
            option_type = parse_option_type(str(row.get("type") or row.get("optionType") or "call"))
            iv = _num(row.get("impliedVolatility") or row.get("volatility")) or 0.0
            quotes.append(
                OptionQuote(
                    expiry=_parse_expiry(str(expiry_raw)),
                    strike=strike,
                    option_type=option_type,
                    bid=_num(row.get("bid")),
                    ask=_num(row.get("ask")),
                    last=_num(row.get("last") or row.get("lastPrice")),
                    volume=_num(row.get("volume")) or 0.0,
                    open_interest=_num(row.get("openInterest")) or 0.0,
                    implied_volatility=iv,
                )
            )
        return [q for q in quotes if q.open_interest > 0 or q.volume > 0]


def _contract_code(quote: dict[str, Any]) -> str:
    contract = quote.get("contract")
    if contract:
        return str(contract)
    symbol = str(quote.get("symbol") or "")
    return symbol.split("|")[0]


def _num(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _parse_expiry(value: str) -> datetime:
    text = value.replace("Z", "+00:00")
    for fmt in ("%Y-%m-%d", "%m/%d/%Y"):
        try:
            return datetime.strptime(text[:10], fmt).replace(hour=18, minute=30, tzinfo=timezone.utc)
        except ValueError:
            continue
    return datetime.fromisoformat(text).astimezone(timezone.utc)
