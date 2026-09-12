import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { GEX_FIXTURE, snapshotFromOverlay } from "@/lib/gex-public";

export const revalidate = 30;

const OVERLAY_PATHS = ["/api/public/overlay", "/api/mt5"] as const;

async function fetchEngineOverlay(
  base: string,
): Promise<Record<string, unknown> | null> {
  for (const path of OVERLAY_PATHS) {
    const response = await fetch(`${base}${path}`, {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (response.ok) {
      return (await response.json()) as Record<string, unknown>;
    }
    logger.warn("GEX engine overlay request failed", {
      path,
      status: response.status,
    });
  }
  return null;
}

export async function GET() {
  const base = process.env.GEX_ENGINE_URL?.replace(/\/$/, "");
  if (!base) {
    return NextResponse.json(GEX_FIXTURE);
  }

  try {
    const overlay = await fetchEngineOverlay(base);
    if (!overlay) {
      return NextResponse.json(GEX_FIXTURE);
    }
    return NextResponse.json(snapshotFromOverlay(overlay, true));
  } catch (error) {
    logger.warn("GEX engine unreachable; serving fixture snapshot", {
      error: String(error),
    });
    return NextResponse.json(GEX_FIXTURE);
  }
}
