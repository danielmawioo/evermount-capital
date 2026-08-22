import { NextResponse } from "next/server";

/**
 * Liveness check for uptime monitors/load balancers. Reports only this
 * frontend's own process — it does not call the backend, since a backend
 * outage shouldn't make the frontend report unhealthy (pages that need the
 * backend already show their own error states).
 */
export function GET() {
  return NextResponse.json({
    status: "ok",
    version: process.env.npm_package_version ?? null,
    timestamp: new Date().toISOString(),
  });
}
