import { NextResponse } from "next/server";

const startedAt = Date.now();

/**
 * Readiness probe for orchestrators. Reports process uptime and package
 * version only — never secrets, env dumps, or backend connectivity.
 * Liveness remains at `/api/health`.
 */
export function GET() {
  return NextResponse.json({
    status: "ready",
    version: process.env.npm_package_version ?? null,
    uptimeMs: Date.now() - startedAt,
  });
}
