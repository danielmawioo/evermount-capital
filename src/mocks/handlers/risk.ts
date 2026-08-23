import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/risk.ts
export const riskHandlers = [
  http.get("*/risk/assessment", () => HttpResponse.json({ score: 42 })),
];
