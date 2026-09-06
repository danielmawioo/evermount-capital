from __future__ import annotations

from urllib.parse import urlencode

import httpx

from gex_engine.models import CotPositioning

# COMEX Gold (100 oz) disaggregated COT.
DATASET = "https://publicreporting.cftc.gov/resource/72hh-3qpy.json"
GOLD_CODE = "088691"


def fetch_gold_cot() -> CotPositioning:
    query = urlencode(
        {
            "$limit": "1",
            "$order": "report_date_as_yyyy_mm_dd DESC",
            "$where": f"cftc_contract_market_code='{GOLD_CODE}'",
        }
    )
    response = httpx.get(
        f"{DATASET}?{query}",
        headers={"User-Agent": "Mozilla/5.0", "Accept": "application/json"},
        timeout=20.0,
    )
    response.raise_for_status()
    rows = response.json()
    if not rows:
        raise RuntimeError("CFTC gold COT empty")
    return parse_cot(rows[0])


def parse_cot(row: dict) -> CotPositioning:
    swap_long = _num(row.get("swap_positions_long_all"))
    swap_short = _num(row.get("swap__positions_short_all"))
    mm_long = _num(row.get("m_money_positions_long_all"))
    mm_short = _num(row.get("m_money_positions_short_all"))
    prod_long = _num(row.get("prod_merc_positions_long"))
    prod_short = _num(row.get("prod_merc_positions_short"))
    swap_net = swap_long - swap_short
    return CotPositioning(
        report_date=str(row.get("report_date_as_yyyy_mm_dd") or "")[:10],
        open_interest=_num(row.get("open_interest_all")),
        swap_long=swap_long,
        swap_short=swap_short,
        swap_net=swap_net,
        managed_money_long=mm_long,
        managed_money_short=mm_short,
        managed_money_net=mm_long - mm_short,
        producer_long=prod_long,
        producer_short=prod_short,
        producer_net=prod_long - prod_short,
        swap_dealer_bias=(
            "SWAP_DEALERS_NET_SHORT_FUTURES" if swap_net <= 0 else "SWAP_DEALERS_NET_LONG_FUTURES"
        ),
    )


def _num(value) -> float:
    if value is None or value == "":
        return 0.0
    return float(value)
