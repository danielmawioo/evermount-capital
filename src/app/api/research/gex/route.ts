import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { GEX_FIXTURE, snapshotFromOverlay } from "@/lib/gex-public";

export const revalidate = 30;

export async function GET() {
  const base = process.env.GEX_ENGINE_URL?.replace(/\/$/, "");
  if (!base) {
    return NextResponse.json(GEX_FIXTURE);
  }

  try {
    const response = await fetch(`${base}/api/mt5`, {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!response.ok) {
      logger.warn("GEX engine overlay request failed", {
        status: response.status,
      });
      return NextResponse.json(GEX_FIXTURE);
    }
    const overlay = (await response.json()) as Record<string, unknown>;
    return NextResponse.json(snapshotFromOverlay(overlay, true));
  } catch (error) {
    logger.warn("GEX engine unreachable; serving fixture snapshot", {
      error: String(error),
    });
    return NextResponse.json(GEX_FIXTURE);
  }
}
