import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/portfolio-manager.ts
export const portfolioManagerHandlers = [
  http.get("*/portfolio-manager/strategies", () =>
    HttpResponse.json({
      strategies: [],
      combined: {
        totalPoolAum: 0,
        totalInvestors: 0,
        strategyCount: 0,
        activeCount: 0,
        primaryStrategy: null,
        weightedDailyReturnPct: 0,
        weightedCumulativeReturnPct: 0,
        blendedNavPerUnit: 0,
        quantConnected: true,
        flipbotConnected: true,
        killSwitchActive: false,
        tradingMode: "demo",
      },
    }),
  ),

  http.post("*/portfolio-manager/strategies/:strategyKey/switch", () =>
    HttpResponse.json({ switched: true }),
  ),

  http.post(
    "*/portfolio-manager/strategies/:strategyKey/active",
    async ({ request }) => {
      const body = (await request.json()) as { active: boolean };
      return HttpResponse.json({ active: body.active });
    },
  ),

  http.post("*/portfolio-manager/clients", async ({ request }) => {
    const body = (await request.json()) as { email: string; fullName: string };
    return HttpResponse.json({
      message: "created",
      client: {
        assignmentId: "assignment-mock-1",
        clientId: "client-mock-1",
        email: body.email,
        fullName: body.fullName,
        kycStatus: "PENDING",
      },
    });
  }),

  http.post("*/portfolio-manager/clients/assign", async ({ request }) => {
    const body = (await request.json()) as { email: string };
    return HttpResponse.json({
      message: "assigned",
      client: {
        assignmentId: "assignment-mock-1",
        clientId: "client-mock-1",
        email: body.email,
        fullName: "Mock Client",
        kycStatus: "APPROVED",
      },
    });
  }),

  http.get("*/portfolio-manager/clients", () =>
    HttpResponse.json({ clients: [] }),
  ),

  http.get("*/portfolio-manager/investment-options", () =>
    HttpResponse.json({ options: [] }),
  ),

  http.post("*/portfolio-manager/clients/:clientId/allocate/preview", () =>
    HttpResponse.json({ preview: true }),
  ),

  http.post("*/portfolio-manager/clients/:clientId/allocate", () =>
    HttpResponse.json({ allocated: true }),
  ),

  http.delete("*/portfolio-manager/clients/:clientId", () =>
    HttpResponse.json({ unassigned: true }),
  ),
];
