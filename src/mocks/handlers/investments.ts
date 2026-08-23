import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/investments.ts
export const investmentsHandlers = [
  http.get("*/investments/options", () =>
    HttpResponse.json({
      options: [
        {
          id: "opt1",
          name: "Growth Fund",
          symbol: "GRW",
          minInvestment: 100,
          riskLevel: "medium",
        },
      ],
    }),
  ),

  http.get("*/investments/preferences", () =>
    HttpResponse.json({
      lockInMonths: 6,
      riskTolerance: "medium",
      reinvestProfits: false,
    }),
  ),

  http.put("*/investments/preferences", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body as object);
  }),

  http.post("*/investments/trade/preview", async ({ request }) => {
    const body = (await request.json()) as { amount: number };
    return HttpResponse.json({
      estimatedReturn: Math.round(body.amount * 0.05),
    });
  }),

  http.post("*/investments/trade", () =>
    HttpResponse.json({ id: "trade-mock-1" }, { status: 201 }),
  ),

  http.post("*/investments", () =>
    HttpResponse.json({ id: "investment-mock-1" }, { status: 201 }),
  ),

  http.post("*/investments/:investmentId/close", () =>
    HttpResponse.json({ success: true }),
  ),
];
