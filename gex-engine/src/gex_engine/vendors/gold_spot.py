from __future__ import annotations

import httpx

URL = "https://api.gold-api.com/price/XAU"


def fetch_xau_spot() -> float:
    response = httpx.get(
        URL,
        headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"},
        timeout=15.0,
    )
    response.raise_for_status()
    price = response.json().get("price")
    if price is None:
        raise RuntimeError("Gold spot price missing")
    return float(price)
