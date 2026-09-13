import { NextResponse } from "next/server";

const startedAt = Date.now();

/**
 * Prometheus-style process metrics. No secrets, env dumps, or backend data.
 */
export function GET() {
  const uptimeMs = Date.now() - startedAt;
  const body = [
    "# HELP evermount_up Frontend process is running.",
    "# TYPE evermount_up gauge",
    "evermount_up 1",
    "# HELP evermount_uptime_ms Process uptime in milliseconds.",
    "# TYPE evermount_uptime_ms gauge",
    `evermount_uptime_ms ${uptimeMs}`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
