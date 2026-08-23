import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/dashboard.ts
export const dashboardHandlers = [
  http.get("*/dashboard/stats", () =>
    HttpResponse.json({ totalBalance: 15000, activeInvestments: 3 }),
  ),
];
