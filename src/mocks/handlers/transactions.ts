import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/transactions.ts
export const transactionsHandlers = [
  http.get("*/transactions", () => HttpResponse.json({ items: [] })),
  http.get("*/transactions/:transactionId", ({ params }) =>
    HttpResponse.json({ id: params.transactionId }),
  ),
];
