# Evermount GEX Engine

Real-time **options / market-structure analytics** for XAUUSD, plus a **paper decision layer** (session, probabilities, EV, risk-budget sizing). This is not an EA and it does **not** place broker orders. Default mode is `PAPER`.

Broker XAUUSD, COMEX gold futures, and COMEX gold options are different instruments. The engine maps them, keeps the basis, computes Greeks locally, infers a dealer book from public data, then emits a scored levels snapshot and a `GET /api/decision` dashboard for an EA to consume later.

```text
REAL-TIME MARKET DATA
        │
        ├── XAUUSD spot          (gold-api)
        ├── CME / COMEX GC       (Barchart GC*0, else Yahoo GC=F)
        ├── COMEX gold options   (Barchart getFuturesOptions — API key)
        ├── CFTC COT gold        (swap dealers / managed money / producers)
        └── OHLC bars            (Yahoo 15m when available; else daily)
        │
        ▼
┌──────────────────────────┐
│ OPTIONS DATA NORMALIZER   │  IV scale, missing-IV inversion, OI/volume filter
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ GREEKS ENGINE             │  Black-76: Δ Γ V Θ Vanna Charm
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ POSITIONING ENGINE        │  ESTIMATED dealer book (CFTC + volume/OI)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ MARKET STRUCTURE ENGINE   │  GEX, gamma flip, walls, max pain, vanna
│  + session / PDH / ATR    │  Asia / London / NY, VWAP, ATR bands
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ VOLATILITY ENGINE         │  ATR(5/14/20), realized vol, IV, expected move
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ FEATURES → PROBABILITY    │  Interpretable logistic fusion (placeholder priors)
│ EXPECTED VALUE            │  EV = Pwin×R − Ploss×1R
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ SIZING + RISK             │  Stop-loss $ cap, then margin/leverage/kill switch
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│ DECISION STATE MACHINE    │  LONG / SHORT / WAIT / REDUCE / EXIT / HEDGE / HALT
└────────────┬─────────────┘
             ▼
       FastAPI snapshot   →   EA / execution (not built yet)
```

---

## Instrument mapping

```text
Broker XAUUSD     →   COMEX GC futures     →   COMEX GC / OG options
     spot                  F                       chain
                      basis = F − spot
```

Options Greeks use **Black-76 on the futures price**, not Black-Scholes on spot. Contract multiplier defaults to `100` (COMEX gold). XAUUSD CFD sizing uses the same `100` oz/lot convention for the paper risk engine.

---

## Live data

The process polls every `GEX_POLL_SECONDS` (default 30).

| Input | Source | Key |
| --- | --- | --- |
| XAUUSD spot | [gold-api.com](https://api.gold-api.com/price/XAU) | No |
| COMEX GC last + daily bars | Yahoo `GC=F`, or Barchart `GC*0` when keyed | Barchart optional |
| Intraday bars (session engine) | Yahoo `GC=F` 15m | No |
| Options chain: expiry, strike, call/put, bid, ask, last, volume, OI, IV | Barchart OnDemand `getQuote` + `getFuturesOptions` | **`BARCHART_API_KEY`** |
| Swap-dealer / managed-money / producer book | CFTC disaggregated COT, COMEX Gold `088691` | No |

CME does not publish a free real-time options chain. Direct CME WebSocket / MDP and Databento are licensed feeds. Barchart is the vendor wired today (`GEX_VENDOR=barchart`).

Without `BARCHART_API_KEY`:

- `/api/market` still returns live spot, futures, basis, and COT
- `/api/decision` still returns a paper dashboard (options fields null, dealer book ESTIMATED from COT)
- `/api/levels`, `/api/gex`, `/api/options` return `503` until the chain loads

Example of a live pull **without** an options key:

```text
spot            4418.80
GC futures      4475.80
basis           +57.00
COT week        2026-08-25
swap dealers    net short 245,027   SWAP_DEALERS_NET_SHORT_FUTURES
managed money   net long  144,747
```

---

## Dealer positioning (ESTIMATED)

Open interest does **not** say who is long or short. The engine never treats vendor gamma or a screenshot level as ground truth.

Every positioning payload is labeled **`ESTIMATED`** with a **confidence** in `[0, 1]` (capped well below 1.0). Live default model: `CHAIN_INFERRED`.

1. **CFTC tilt (weekly, reported)**  
   Swap-dealer net futures position for COMEX gold.  
   Net short futures → book tilted **short calls / long puts**.  
   Net long futures → tilt flipped.
2. **Per-strike flow (session)**  
   Volume vs OI, moneyness (OTM vs ITM), and volume rank adjust a continuous dealer sign in `[-1, 1]`.
3. **Greeks / GEX**  
   Calculated on that signed book with local Black-76, not the vendor’s Greek fields.

This is **not** a disclosed dealer options book. Confidence rises when both COT and a live chain are present; it stays modest.

Other models (fixed assumptions, no inference):

| Model | Meaning |
| --- | --- |
| `CHAIN_INFERRED` | CFTC + volume/OI (live default) |
| `STANDARD_DEALER_HEDGE` | Dealers short calls, long puts |
| `CUSTOMER_LONG_OPTIONS` | Dealers short all options |
| `DEALER_LONG_OPTIONS` | Dealers long all options |

**Do not** read “high gamma / negative GEX” as a long or short. GEX is evidence about pinning vs expansion. Direction comes from session/structure features, then EV and risk.

---

## Calculations

Greeks are Black-76. Missing or percent-scaled IV is normalized; if IV is absent it is inverted from mid `(bid+ask)/2` or last.

**GEX** (1% move, signed dealer book):

```text
GEX_i = OI_i × Γ_i × F² × multiplier × 0.01 × dealer_sign_i
GEX(F) = Σ GEX_i
```

**Gamma flip:** evaluate `GEX(P)` on a price grid and linearly interpolate `GEX(P) = 0`.

**Max pain:** settlement `P` that minimises combined call and put intrinsic loss × OI.

**Walls** (calls and puts, separately):

- OI wall  
- Gamma wall (`OI × Γ`)  
- GEX wall  
- Volume wall  

**Regime**

| Condition | Regime |
| --- | --- |
| `GEX < 0` | `NEGATIVE_GAMMA` |
| `GEX > 0` | `POSITIVE_GAMMA` |
| spot near gamma flip (¼ ATR) | `TRANSITION` |

ATR, realized vol, expected move, and IV rank stay on the **price/vol** side. They overlay options levels; they are not options positioning.

Levels are scored `0–100` (GEX, put/call OI, gamma concentration, vanna alignment, ATR confluence, volume, distance from spot). The trading engine should reason about **strength**, not treat every wall as equal.

---

## Session, structure, probability, EV

**Sessions** (UTC buckets, not exchange hours): Asia `00:00–07:00`, London `07:00–12:00`, New York `12:00–21:00`. Ranges and distances to session highs/lows are built from timestamped **intraday** bars (Yahoo 15m). Daily H/L/C cannot form session ranges.

Conditional probabilities such as `P(NY continuation | London expansion from Asian low)` are **counted from completed session days in the bar window**. They are never assumed. Until 20 sample days exist they stay `INSUFFICIENT_HISTORY` (a sample `p` is shown from 5+ days).

**Structure:** previous-day high/low, daily open, ATR(5/14/20) bands, VWAP when bars have volume.

**Probability engine** is an interpretable logistic fusion with **documented placeholder priors** (`calibration: PLACEHOLDER_PRIORS`). It outputs `P(breakout)`, `P(rejection)`, `P(continuation)`, `P(reversal)`, `P(target)`, `P(stop)`. These are **not** guaranteed win rates and are **not** walk-forward calibrated.

**Expected value** (R-multiples):

```text
EV = P(target) × reward_R − P(stop) × 1R
```

A new entry is allowed only if `EV > GEX_EV_THRESHOLD` (default `0.15R`) **and** risk checks pass.

---

## Capital-efficiency sizing (not 100% margin)

Position size is **not** “use all free margin.” It is the largest size such that **stop-loss loss ≤ the hard risk budget**, then clipped by margin, leverage, and other caps.

```text
dollar_risk_per_lot = stop_distance × contract_size     # default 100 oz/lot
risk_budget         = min(max_risk_per_trade, equity × max_risk_pct)
lots                = risk_budget / dollar_risk_per_lot
lots                ← haircuts (confidence, EV, drawdown, event risk)
lots                ← min(lots, free_margin × max_margin_utilization / margin_per_lot)
lots                ← min(lots, equity × max_leverage / notional_per_lot)
lots                ← min(lots, max_position)
```

`max_margin_utilization` defaults to **30%** of free margin and is forced below 100% even if misconfigured.

**Fractional Kelly** may only **shrink** size, and only after `calibration = WALK_FORWARD`. Placeholder probabilities never drive Kelly. Kelly never overrides hard caps.

Martingale and pyramiding losers are not implemented.

Default paper caps (`gex-engine/.env.example`):

| Cap | Default |
| --- | --- |
| Mode | `PAPER` |
| Equity / free margin | `$50,000` / `$45,000` |
| Max risk per trade | `$750` and `1.5%` of equity (min of the two) |
| Max daily loss | `$1,500` |
| Max leverage (notional / equity) | `10` |
| Max position | `5.0` lots |
| Max margin utilization | `30%` of free margin |
| Broker leverage (margin calc) | `20` |
| EV threshold | `0.15 R` |
| Stale data | `120` seconds → `HALT` |
| Kill switch | off |

Example: stop `180` points, risk `$750`, XAU at `4400` → `0.04` lots (`$720` at risk), not `~2` lots from filling `$45k` of margin.

---

## Decision state machine

`LONG / SHORT / WAIT / REDUCE / EXIT / HEDGE / HALT`

- Default **WAIT**
- **HALT** if kill switch, stale data, daily-loss cap, drawdown cap, or missing market
- **REDUCE / EXIT / HEDGE** only apply when a paper `open_side` / `open_lots` is passed in (no live book)
- No MT5 order placement

---

## Snapshot shape

`GET /api/levels` (once the chain is live):

```json
{
  "timestamp": "2026-09-01T12:07:00Z",
  "spot": 4367.86,
  "futures_price": 4372.4,
  "basis": 4.54,
  "gamma_flip": 4385.0,
  "max_pain": 4375.0,
  "call_walls": [4400, 4450],
  "put_walls": [4350, 4300],
  "gex": -1845234.21,
  "net_vanna": -52143,
  "dealer_regime": "NEGATIVE_GAMMA",
  "atr_14": 18.6,
  "positioning_model": "CHAIN_INFERRED",
  "data_source": "barchart:GCZ26+gold-api+cftc",
  "levels": {
    "resistance": [4385, 4400],
    "support": [4350, 4300]
  },
  "scored_levels": [
    {
      "price": 4350,
      "role": "support",
      "gex_support": "HIGH",
      "put_oi": "HIGH",
      "gamma_concentration": "HIGH",
      "vanna": "POSITIVE",
      "atr_confluence": "HIGH",
      "volume": "NORMAL",
      "distance_from_spot": 17.86,
      "score": 87
    }
  ]
}
```

Numbers above are illustrative. Live values come from the current chain.

`GET /api/decision` matches the section-32 dashboard as far as current data allows: spot, futures, basis, session, ESTIMATED dealer book, ATR, session highs/lows, placeholder probabilities, EV, recommendation, size, risk.

---

## HTTP API

Default: `http://127.0.0.1:8088`

| Method | Path | Needs options chain |
| --- | --- | --- |
| `GET` | `/api/status` | No |
| `GET` | `/api/market` | No |
| `GET` | `/api/decision` | No — paper dashboard |
| `GET` | `/api/positioning` | COT always; inferred signs when chain is up |
| `POST` | `/api/refresh` | No |
| `GET` | `/api/mt5` | No — overlay for EvermountGexZones |
| `GET` | `/api/public/overlay` | No — research subset (levels, analytics, paper risk; not `/api/decision`) |
| `GET` | `/api/options` | Yes |
| `GET` | `/api/levels` | Yes |
| `GET` | `/api/gex` | Yes |
| `GET` | `/api/regime` | Yes |
| `POST` | `/api/analytics` | No — pass a chain in the body |

```bash
curl "http://127.0.0.1:8088/api/decision"
curl "http://127.0.0.1:8088/api/decision?equity=50000&free_margin=45000&kill_switch=false"
```

---

## Setup

```bash
cd gex-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env
pytest
uvicorn gex_engine.api:app --port 8088
```

`.env`:

```bash
BARCHART_API_KEY=          # required for COMEX options / GEX levels
BARCHART_ROOT=GC
GEX_VENDOR=barchart
GEX_POLL_SECONDS=30
GEX_RATE=0.05              # discount rate for Black-76
GEX_MODE=PAPER
GEX_MAX_RISK_PER_TRADE=750
GEX_KILL_SWITCH=0
```

Barchart needs OnDemand access to `getQuote`, `getHistory`, and `getFuturesOptions`.

---

## Layout

```text
gex-engine/
  src/gex_engine/
    live.py           poll loop and live book
    api.py            FastAPI
    pipeline.py       GEX snapshot assembly
    greeks.py         Black-76
    positioning.py    ESTIMATED dealer-sign models
    gex.py            GEX curve + gamma flip
    max_pain.py
    walls.py
    scoring.py
    regime.py
    volatility.py
    features.py       feature vector (evidence, not rules)
    session.py        Asia / London / NY
    structure.py      PDH/PDL, ATR bands, VWAP
    probability.py    placeholder logistic fusion
    expected_value.py EV in R
    sizing.py         risk-budget lots
    risk.py           hard caps / kill switch / stale
    decision.py       state machine + section-32 dashboard
    overlay_export.py MT5 gex_overlay.csv (unchanged contract)
    vendors/          Barchart, Yahoo, gold-api, CFTC
  sql/schema.sql      options / market / analytics / signals tables
  fixtures/gc_chain.json
  mt5/                EvermountGex / EvermountGexZones overlay EAs
  tests/
```

`sql/schema.sql` is the persistence shape. Postgres ingest is not wired yet; the in-process snapshot is the current store.

---

## Phase map

| Phase | Status |
| --- | --- |
| 1 Data ingestion | Live: spot, GC futures, COT, Barchart chain if keyed |
| 2 Historical database | Schema only — not ingesting |
| 3 Options feature engine | Greeks, IV fill, walls |
| 4 GEX engine | GEX, gamma flip, max pain, regime, scores |
| 5 Market structure engine | Session + PDH/PDL/ATR/VWAP skeleton |
| 6 Probability / research engine | Interpretable placeholder priors |
| 7 Backtester | Not built |
| 8 Walk-forward validation | Not built |
| 9 Paper trading | Dashboard + sizing only — no fill simulator |
| 10 Execution engine | **Not built** (no MT5 orders) |
| 11 Risk engine | Hard caps + kill switch skeleton |
| 12 Live deployment | **Not built** |
| 13–14 Monitoring / model improvement | Not built |

Phasing 19–21 in the spec (dynamic sizing, margin, hard risk) is the skeleton wired into `/api/decision`. It does not send live orders.

---

## What is not built yet

- Live MT5 / broker order placement  
- Databento / native CME MDP adapter  
- Redis pub/sub  
- Writing snapshots into Postgres  
- Walk-forward / ML calibration of probabilities  
- Paper fill simulator and pyramiding (winners or losers)  
- Martingale  
- Macro event calendar (event risk is an input flag, default `UNKNOWN`)  
- IV change / IV skew time series  

The MT5 overlay (`gex_overlay.csv` / `EvermountGexZones`) is unchanged: still a levels file, not an execution EA.

Build order remains: live chain → store every snapshot → backtest hypotheses → paper fills → EA. Do not start from hard-coded screenshot levels.
