import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/deposits.ts
export const depositsHandlers = [
  http.get("*/deposits/settlement-account", () =>
    HttpResponse.json({
      accountNumber: "1234567890",
      bankName: "Evermount Settlement Bank",
    }),
  ),

  http.post("*/deposits/card", async ({ request }) => {
    const body = (await request.json()) as { amount: number; currency: string };
    return HttpResponse.json(
      {
        id: "dep-card-1",
        status: "pending",
        amount: body.amount,
        currency: body.currency,
      },
      { status: 201 },
    );
  }),

  http.post("*/deposits/stripe/confirm", () =>
    HttpResponse.json({ status: "succeeded" }),
  ),

  http.post("*/deposits/crypto", async ({ request }) => {
    const body = (await request.json()) as { amount: number; currency: string };
    return HttpResponse.json(
      {
        id: "dep-crypto-1",
        status: "pending",
        amount: body.amount,
        currency: body.currency,
      },
      { status: 201 },
    );
  }),

  http.post("*/deposits/bank", async ({ request }) => {
    const body = (await request.json()) as { amount: number; currency: string };
    return HttpResponse.json(
      {
        id: "dep-bank-1",
        status: "pending",
        amount: body.amount,
        currency: body.currency,
      },
      { status: 201 },
    );
  }),

  http.post("*/deposits/mpesa", async ({ request }) => {
    const body = (await request.json()) as { amount: number; currency: string };
    return HttpResponse.json(
      {
        id: "dep-mpesa-1",
        status: "pending",
        amount: body.amount,
        currency: body.currency,
      },
      { status: 201 },
    );
  }),

  http.get("*/deposits/:depositId", ({ params }) =>
    HttpResponse.json({ id: params.depositId, status: "completed" }),
  ),

  http.get("*/deposits", () => HttpResponse.json({ deposits: [] })),
];
