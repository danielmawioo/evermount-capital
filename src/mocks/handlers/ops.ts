import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/ops.ts
export const opsHandlers = [
  http.get("*/ops/trading/status", () =>
    HttpResponse.json({ status: "running" }),
  ),

  http.post("*/ops/trading/kill-switch", async ({ request }) => {
    const body = (await request.json()) as { active: boolean };
    return HttpResponse.json({ active: body.active });
  }),

  http.post("*/ops/nav-batch/run", () => HttpResponse.json({ started: true })),

  http.get("*/ops/nav/:strategyKey/history", () =>
    HttpResponse.json({ history: [] }),
  ),

  http.get("*/ops/flipbot/status", () => HttpResponse.json({ status: "ok" })),

  http.get("*/ops/partner/exness/status", () =>
    HttpResponse.json({ connected: true }),
  ),

  http.get("*/ops/partner/exness/summary", () =>
    HttpResponse.json({ equity: 100000 }),
  ),

  http.get("*/ops/flipbot/pool/:strategyKey", () =>
    HttpResponse.json({ pool: 5 }),
  ),

  http.post("*/ops/flipbot/signals", () => HttpResponse.json({ queued: true })),

  http.get("*/ops/strategies/lifecycle", () =>
    HttpResponse.json({ strategies: [] }),
  ),

  http.post("*/ops/strategies/:strategyKey/promotion-check", () =>
    HttpResponse.json({ ok: true }),
  ),

  http.post("*/ops/strategies/:strategyKey/promote", () =>
    HttpResponse.json({ promoted: true }),
  ),

  http.post("*/ops/trading/sync-positions", () =>
    HttpResponse.json({ synced: true }),
  ),

  http.get("*/ops/trading/positions", () =>
    HttpResponse.json({ positions: [] }),
  ),

  http.post("*/ops/trading/demo-reconciliation", () =>
    HttpResponse.json({ reconciled: true }),
  ),

  http.get("*/ops/trading/demo-reconciliation/history", () =>
    HttpResponse.json({ history: [] }),
  ),
];
