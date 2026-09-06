from __future__ import annotations

import os
from pathlib import Path


def load_dotenv() -> None:
    path = Path(__file__).resolve().parents[2] / ".env"
    if not path.exists():
        return
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_dotenv()


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


BARCHART_API_KEY = env("BARCHART_API_KEY")
BARCHART_ROOT = env("BARCHART_ROOT", "GC")
DATABENTO_API_KEY = env("DATABENTO_API_KEY")
GEX_VENDOR = env("GEX_VENDOR", "barchart").lower()
GEX_POLL_SECONDS = float(env("GEX_POLL_SECONDS", "30") or "30")
GEX_RATE = float(env("GEX_RATE", "0.05") or "0.05")
GEX_MT5_FILES = env(
    "GEX_MT5_FILES",
    str(
        Path.home()
        / "Library/Application Support/net.metaquotes.wine.metatrader5/drive_c/Program Files/MetaTrader 5/MQL5/Files"
    ),
)

GEX_MODE = env("GEX_MODE", "PAPER").upper() or "PAPER"
GEX_EQUITY = float(env("GEX_EQUITY", "50000") or "50000")
GEX_FREE_MARGIN = float(env("GEX_FREE_MARGIN", "45000") or "45000")
GEX_MAX_RISK_PER_TRADE = float(env("GEX_MAX_RISK_PER_TRADE", "750") or "750")
GEX_MAX_RISK_PCT = float(env("GEX_MAX_RISK_PCT", "0.015") or "0.015")
GEX_MAX_DAILY_LOSS = float(env("GEX_MAX_DAILY_LOSS", "1500") or "1500")
GEX_MAX_LEVERAGE = float(env("GEX_MAX_LEVERAGE", "10") or "10")
GEX_MAX_POSITION = float(env("GEX_MAX_POSITION", "5") or "5")
GEX_MAX_MARGIN_UTILIZATION = float(env("GEX_MAX_MARGIN_UTILIZATION", "0.30") or "0.30")
GEX_MAX_DRAWDOWN_PCT = float(env("GEX_MAX_DRAWDOWN_PCT", "0.10") or "0.10")
GEX_BROKER_LEVERAGE = float(env("GEX_BROKER_LEVERAGE", "20") or "20")
GEX_CONTRACT_SIZE = float(env("GEX_CONTRACT_SIZE", "100") or "100")
GEX_EV_THRESHOLD = float(env("GEX_EV_THRESHOLD", "0.15") or "0.15")
GEX_STALE_SECONDS = float(env("GEX_STALE_SECONDS", "120") or "120")
GEX_FRACTIONAL_KELLY = float(env("GEX_FRACTIONAL_KELLY", "0.25") or "0.25")
GEX_KILL_SWITCH = env("GEX_KILL_SWITCH", "0").lower() in {"1", "true", "yes", "on"}
