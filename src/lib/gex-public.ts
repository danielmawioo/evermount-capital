export type GexPublicSnapshot = {
  live: boolean;
  updatedAt: string | null;
  source: string;
  spot: number | null;
  futures: number | null;
  basis: number | null;
  gammaFlip: number | null;
  maxPain: number | null;
  gex: number | null;
  regime: string | null;
  expectedMove: number | null;
  session: string | null;
  confidence: number | null;
  calibration: string | null;
  mode: string | null;
  halt: boolean | null;
  riskBudgetUsd: number | null;
  maxDailyLossUsd: number | null;
  haltReason: string | null;
  note: string;
};

/** Fixture levels from gex-engine/fixtures (COMEX gold). Not live market data. */
export const GEX_FIXTURE: GexPublicSnapshot = {
  live: false,
  updatedAt: "2026-09-01T12:07:00Z",
  source: "engine-fixture",
  spot: 4367.86,
  futures: 4372.4,
  basis: 4.54,
  gammaFlip: 4360,
  maxPain: 4350,
  gex: 0,
  regime: "illustrative",
  expectedMove: 18.6,
  session: "NEW_YORK",
  confidence: 0.35,
  calibration: "PLACEHOLDER_PRIORS",
  mode: "PAPER",
  halt: false,
  riskBudgetUsd: 750,
  maxDailyLossUsd: 1500,
  haltReason: null,
  note: "Illustrative snapshot from the GEX engine fixture. Connect GEX_ENGINE_URL for live levels.",
};

function num(
  overlay: Record<string, unknown>,
  ...keys: string[]
): number | null {
  for (const key of keys) {
    const value = overlay[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }
  return null;
}

function str(
  overlay: Record<string, unknown>,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const value = overlay[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return null;
}

function bool(
  overlay: Record<string, unknown>,
  ...keys: string[]
): boolean | null {
  for (const key of keys) {
    const value = overlay[key];
    if (typeof value === "boolean") {
      return value;
    }
  }
  return null;
}

/** MT5 overlay encodes missing gamma_flip / max_pain as 0. */
function optionalLevel(value: number | null): number | null {
  if (value === null || value === 0) {
    return null;
  }
  return value;
}

export function snapshotFromOverlay(
  overlay: Record<string, unknown>,
  live: boolean,
): GexPublicSnapshot {
  const haltReason = str(overlay, "halt_reason", "haltReason");
  return {
    live,
    updatedAt: new Date().toISOString(),
    source: live ? "gex-engine" : "engine-fixture",
    spot: num(overlay, "spot"),
    futures: num(overlay, "futures"),
    basis: num(overlay, "basis"),
    gammaFlip: optionalLevel(num(overlay, "gamma_flip", "gammaFlip")),
    maxPain: optionalLevel(num(overlay, "max_pain", "maxPain")),
    gex: num(overlay, "gex"),
    regime: str(overlay, "regime"),
    expectedMove: num(overlay, "expected_move", "expectedMove"),
    session: str(overlay, "session"),
    confidence: num(overlay, "confidence"),
    calibration: str(overlay, "calibration"),
    mode: str(overlay, "mode"),
    halt: bool(overlay, "halt"),
    riskBudgetUsd: num(overlay, "risk_budget_usd", "riskBudgetUsd"),
    maxDailyLossUsd: num(overlay, "max_daily_loss_usd", "maxDailyLossUsd"),
    haltReason,
    note:
      str(overlay, "note") ??
      (live
        ? "Live gold market-structure levels from the Evermount GEX engine."
        : GEX_FIXTURE.note),
  };
}
