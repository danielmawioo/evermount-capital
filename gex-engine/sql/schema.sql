-- Snapshot tables for the options analytics engine.
-- Live ingestion is Phase 1; the in-process engine already produces these rows.

CREATE TABLE IF NOT EXISTS options_snapshot (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL,
    symbol          TEXT NOT NULL,
    expiry          TIMESTAMPTZ NOT NULL,
    strike          NUMERIC NOT NULL,
    option_type     TEXT NOT NULL CHECK (option_type IN ('call', 'put')),
    bid             NUMERIC,
    ask             NUMERIC,
    last            NUMERIC,
    volume          NUMERIC,
    open_interest   NUMERIC,
    iv              NUMERIC,
    delta           NUMERIC,
    gamma           NUMERIC,
    vega            NUMERIC,
    vanna           NUMERIC,
    charm           NUMERIC
);

CREATE TABLE IF NOT EXISTS market_snapshot (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL,
    spot            NUMERIC NOT NULL,
    futures_price   NUMERIC NOT NULL,
    basis           NUMERIC NOT NULL,
    volume          NUMERIC,
    atr             NUMERIC,
    realized_vol    NUMERIC,
    iv              NUMERIC
);

CREATE TABLE IF NOT EXISTS analytics_snapshot (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL,
    gamma_flip      NUMERIC,
    max_pain        NUMERIC,
    call_wall       NUMERIC,
    put_wall        NUMERIC,
    total_gex       NUMERIC,
    total_vanna     NUMERIC,
    dealer_regime   TEXT NOT NULL,
    positioning_model TEXT NOT NULL,
    payload         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS signals (
    id              BIGSERIAL PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL,
    symbol          TEXT NOT NULL,
    signal          TEXT NOT NULL,
    direction       TEXT,
    entry           NUMERIC,
    stop            NUMERIC,
    target          NUMERIC,
    confidence      NUMERIC,
    regime          TEXT,
    reason          TEXT
);
