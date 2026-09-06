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
  note: "Illustrative snapshot from the GEX engine fixture. Connect GEX_ENGINE_URL for live levels.",
};

export function snapshotFromOverlay(
  overlay: Record<string, unknown>,
  live: boolean,
): GexPublicSnapshot {
  const num = (key: string): number | null => {
    const value = overlay[key];
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  };
  return {
    live,
    updatedAt: new Date().toISOString(),
    source: live ? "gex-engine" : "engine-fixture",
    spot: num("spot"),
    futures: num("futures"),
    basis: num("basis"),
    gammaFlip: num("gamma_flip"),
    maxPain: num("max_pain"),
    gex: num("gex"),
    regime: typeof overlay.regime === "string" ? overlay.regime : null,
    note:
      typeof overlay.note === "string"
        ? overlay.note
        : live
          ? "Live gold market-structure levels from the Evermount GEX engine."
          : GEX_FIXTURE.note,
  };
}
