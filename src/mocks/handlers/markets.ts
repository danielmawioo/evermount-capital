import { http, HttpResponse } from "msw";
import type { MarketInstrument } from "@/lib/api/markets";

// Mock fixtures for different delay classes
const mockInstruments: MarketInstrument[] = [
  {
    symbol: "XAUUSD",
    name: "Gold Spot",
    delayClass: "DELAYED",
    quote: {
      last: 2050.5,
      bid: 2050.3,
      ask: 2050.7,
      volume: 15000,
      source: "XE",
      observedAt: new Date(Date.now() - 30000).toISOString(), // 30 seconds ago
      ingestedAt: new Date(Date.now() - 25000).toISOString(),
      ageMs: 30000,
    },
  },
  {
    symbol: "GC",
    name: "Gold Futures",
    delayClass: "STALE",
    quote: {
      last: 2048.2,
      bid: 2048.0,
      ask: 2048.4,
      volume: 8000,
      source: "CME",
      observedAt: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago (stale)
      ingestedAt: new Date(Date.now() - 1195000).toISOString(),
      ageMs: 1200000,
    },
  },
];

export const marketsHandlers = [
  // List all markets
  http.get("*/v1/markets", ({ request }) => {
    const authHeader = request.headers.get("authorization");

    // Simulate 401 for unauthenticated requests
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Simulate 403 for forbidden (could be used for specific scenarios)
    // Uncomment to test:
    // return HttpResponse.json({ error: "Forbidden" }, { status: 403 });

    // Return successful response with instruments
    return HttpResponse.json({
      instruments: mockInstruments,
    });
  }),

  // Get single instrument quote
  http.get("*/v1/markets/:symbol", ({ params, request }) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { symbol } = params;
    const instrument = mockInstruments.find((i) => i.symbol === symbol);

    if (!instrument) {
      return HttpResponse.json(
        { error: "Not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(instrument);
  }),
];
