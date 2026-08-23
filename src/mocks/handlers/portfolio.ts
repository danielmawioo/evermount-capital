import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/portfolio.ts
export const portfolioHandlers = [
  http.get("*/portfolio", () => HttpResponse.json({ totalValue: 15000 })),
  http.get("*/portfolio/performance", () => HttpResponse.json({ series: [] })),
];
