import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/wallets.ts
export const walletsHandlers = [
  http.get("*/wallets/balance", () =>
    HttpResponse.json({
      balance: 5000,
      availableBalance: 5000,
      currency: "USD",
    }),
  ),

  http.get("*/wallets/history", () => HttpResponse.json({ items: [] })),

  http.post("*/wallets/transfer-to-investment", () =>
    HttpResponse.json({ transferred: true }),
  ),

  http.post("*/wallets/withdraw-profit", () =>
    HttpResponse.json({ withdrawn: true }),
  ),
];
