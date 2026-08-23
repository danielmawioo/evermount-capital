import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/withdrawals.ts
export const withdrawalsHandlers = [
  http.post("*/withdrawals/bank", () => HttpResponse.json({ id: "wd-bank-1" })),
  http.post("*/withdrawals/crypto", () =>
    HttpResponse.json({ id: "wd-crypto-1" }),
  ),
  http.post("*/withdrawals/mpesa", () =>
    HttpResponse.json({ id: "wd-mpesa-1" }),
  ),

  http.get("*/withdrawals/:withdrawalId", ({ params }) =>
    HttpResponse.json({ id: params.withdrawalId, status: "PENDING" }),
  ),

  http.get("*/withdrawals", () => HttpResponse.json({ items: [] })),

  http.post("*/withdrawals/:withdrawalId/cancel", () =>
    HttpResponse.json({ cancelled: true }),
  ),
];
