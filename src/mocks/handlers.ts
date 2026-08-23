import { http, HttpResponse } from "msw";

/**
 * Mock Service Worker request handlers for every endpoint under
 * `src/lib/api/*`. This lets the app run and be tested without a live
 * Evermount backend (see `yarn dev:mock` and `src/mocks/init.ts`).
 *
 * Paths use the wildcard-prefix form (an asterisk followed by the path) so a handler matches
 * regardless of `NEXT_PUBLIC_API_URL` / `API_BASE_URL` (see
 * `src/lib/api/client.ts`) — i.e. it works the same whether the app is
 * pointed at `https://api.evermount.co` or `http://localhost:3000`.
 *
 * Response shapes are adapted from the fixtures already used in each
 * module's `*.test.ts` file (axios-mock-adapter based) so this mock server
 * stays consistent with what the existing unit test suite validates.
 */

// ---------------------------------------------------------------------------
// auth (src/lib/api/auth.ts)
// ---------------------------------------------------------------------------
const authHandlers = [
  http.post("*/auth/register", async ({ request }) => {
    const body = (await request.json()) as { email: string; fullName: string };
    return HttpResponse.json(
      { id: "user-mock-1", email: body.email, fullName: body.fullName },
      { status: 201 },
    );
  }),

  http.post("*/auth/login", () =>
    HttpResponse.json({
      token: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: "user-mock-1",
        email: "investor@example.com",
        fullName: "Mock Investor",
      },
    }),
  ),

  http.post("*/auth/google", () =>
    HttpResponse.json({ token: "mock-access-token" }),
  ),
  http.post("*/auth/github", () =>
    HttpResponse.json({ token: "mock-access-token" }),
  ),
  http.post("*/auth/x", () =>
    HttpResponse.json({ token: "mock-access-token" }),
  ),
  http.post("*/auth/apple", () =>
    HttpResponse.json({ token: "mock-access-token" }),
  ),

  http.post("*/auth/send-reset-password", () =>
    HttpResponse.json({ success: true }),
  ),
  http.post("*/auth/reset-password", () =>
    HttpResponse.json({ success: true }),
  ),
  http.post("*/auth/verify-email", () => HttpResponse.json({ success: true })),

  http.post("*/auth/refresh", () =>
    HttpResponse.json({
      token: "mock-access-token",
      refreshToken: "mock-refresh-token",
    }),
  ),

  http.post("*/auth/logout", () => HttpResponse.json({ success: true })),
];

// ---------------------------------------------------------------------------
// users (src/lib/api/users.ts)
// ---------------------------------------------------------------------------
const usersHandlers = [
  http.get("*/users/profile", () =>
    HttpResponse.json({
      id: "user-mock-1",
      email: "investor@example.com",
      fullName: "Mock Investor",
      role: "client",
    }),
  ),

  http.put("*/users/profile", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: "user-mock-1", ...(body as object) });
  }),

  http.put("*/users/change-password", () =>
    HttpResponse.json({ success: true }),
  ),

  http.put("*/users/email", async ({ request }) => {
    const body = (await request.json()) as { newEmail: string };
    return HttpResponse.json({ email: body.newEmail });
  }),

  http.post("*/users/profile-picture", () =>
    HttpResponse.json(
      { url: "https://cdn.evermount.co/mock/avatar.png" },
      { status: 201 },
    ),
  ),

  http.delete("*/users/account", () => HttpResponse.json({ deleted: true })),

  http.get("*/users/bank-accounts", () => HttpResponse.json([])),

  http.post("*/users/bank-accounts", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: "bank-account-mock-1", ...(body as object) },
      { status: 201 },
    );
  }),

  http.delete("*/users/bank-accounts/:accountId", () =>
    HttpResponse.json({ removed: true }),
  ),
];

// ---------------------------------------------------------------------------
// kyc (src/lib/api/kyc.ts)
// ---------------------------------------------------------------------------
const kycHandlers = [
  http.post("*/kyc/submit", () =>
    HttpResponse.json({ status: "pending" }, { status: 201 }),
  ),
  http.get("*/kyc/status", () => HttpResponse.json({ status: "approved" })),
];

// ---------------------------------------------------------------------------
// wallets (src/lib/api/wallets.ts)
// ---------------------------------------------------------------------------
const walletsHandlers = [
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

// ---------------------------------------------------------------------------
// deposits (src/lib/api/deposits.ts)
// ---------------------------------------------------------------------------
const depositsHandlers = [
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

// ---------------------------------------------------------------------------
// withdrawals (src/lib/api/withdrawals.ts)
// ---------------------------------------------------------------------------
const withdrawalsHandlers = [
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

// ---------------------------------------------------------------------------
// investments (src/lib/api/investments.ts)
// ---------------------------------------------------------------------------
const investmentsHandlers = [
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

// ---------------------------------------------------------------------------
// portfolio (src/lib/api/portfolio.ts)
// ---------------------------------------------------------------------------
const portfolioHandlers = [
  http.get("*/portfolio", () => HttpResponse.json({ totalValue: 15000 })),
  http.get("*/portfolio/performance", () => HttpResponse.json({ series: [] })),
];

// ---------------------------------------------------------------------------
// transactions (src/lib/api/transactions.ts)
// ---------------------------------------------------------------------------
const transactionsHandlers = [
  http.get("*/transactions", () => HttpResponse.json({ items: [] })),
  http.get("*/transactions/:transactionId", ({ params }) =>
    HttpResponse.json({ id: params.transactionId }),
  ),
];

// ---------------------------------------------------------------------------
// dashboard (src/lib/api/dashboard.ts)
// ---------------------------------------------------------------------------
const dashboardHandlers = [
  http.get("*/dashboard/stats", () =>
    HttpResponse.json({ totalBalance: 15000, activeInvestments: 3 }),
  ),
];

// ---------------------------------------------------------------------------
// risk (src/lib/api/risk.ts)
// ---------------------------------------------------------------------------
const riskHandlers = [
  http.get("*/risk/assessment", () => HttpResponse.json({ score: 42 })),
];

// ---------------------------------------------------------------------------
// documents (src/lib/api/documents.ts)
// ---------------------------------------------------------------------------
const documentsHandlers = [
  http.post("*/documents/upload", () =>
    HttpResponse.json(
      { url: "https://cdn.evermount.co/mock/document.pdf" },
      { status: 201 },
    ),
  ),
];

// ---------------------------------------------------------------------------
// demo (src/lib/api/demo.ts)
// ---------------------------------------------------------------------------
const demoHandlers = [
  http.get("*/booked-demo-slots", () =>
    HttpResponse.json({ slots: ["2026-09-01T10:00:00Z"] }),
  ),
  http.post("*/demo-booking", () =>
    HttpResponse.json({ id: "demo-mock-1" }, { status: 201 }),
  ),
];

// ---------------------------------------------------------------------------
// newsletter (src/lib/api/newsletter.ts)
// ---------------------------------------------------------------------------
const newsletterHandlers = [
  http.post("*/waitlist", () =>
    HttpResponse.json({ success: true }, { status: 201 }),
  ),
];

// ---------------------------------------------------------------------------
// ops (src/lib/api/ops.ts)
// ---------------------------------------------------------------------------
const opsHandlers = [
  http.get("*/ops/trading/status", () =>
    HttpResponse.json({ status: "running" }),
  ),

  http.post("*/ops/trading/kill-switch", async ({ request }) => {
    const body = (await request.json()) as { active: boolean };
    return HttpResponse.json({ active: body.active });
  }),

  http.post("*/ops/nav-batch/run", () => HttpResponse.json({ started: true })),

  http.get("*/ops/nav/:strategyKey/history", () =>
    HttpResponse.json({ history: [] }),
  ),

  http.get("*/ops/flipbot/status", () => HttpResponse.json({ status: "ok" })),

  http.get("*/ops/partner/exness/status", () =>
    HttpResponse.json({ connected: true }),
  ),

  http.get("*/ops/partner/exness/summary", () =>
    HttpResponse.json({ equity: 100000 }),
  ),

  http.get("*/ops/flipbot/pool/:strategyKey", () =>
    HttpResponse.json({ pool: 5 }),
  ),

  http.post("*/ops/flipbot/signals", () => HttpResponse.json({ queued: true })),

  http.get("*/ops/strategies/lifecycle", () =>
    HttpResponse.json({ strategies: [] }),
  ),

  http.post("*/ops/strategies/:strategyKey/promotion-check", () =>
    HttpResponse.json({ ok: true }),
  ),

  http.post("*/ops/strategies/:strategyKey/promote", () =>
    HttpResponse.json({ promoted: true }),
  ),

  http.post("*/ops/trading/sync-positions", () =>
    HttpResponse.json({ synced: true }),
  ),

  http.get("*/ops/trading/positions", () =>
    HttpResponse.json({ positions: [] }),
  ),

  http.post("*/ops/trading/demo-reconciliation", () =>
    HttpResponse.json({ reconciled: true }),
  ),

  http.get("*/ops/trading/demo-reconciliation/history", () =>
    HttpResponse.json({ history: [] }),
  ),
];

// ---------------------------------------------------------------------------
// portfolio-manager (src/lib/api/portfolio-manager.ts)
// ---------------------------------------------------------------------------
const portfolioManagerHandlers = [
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

// ---------------------------------------------------------------------------
// security (src/lib/api/security.ts)
// ---------------------------------------------------------------------------
const securityHandlers = [
  http.get("*/admin/security/mfa/status", () =>
    HttpResponse.json({ enabled: false }),
  ),

  http.post("*/admin/security/mfa/setup", () =>
    HttpResponse.json({
      secret: "mock-mfa-secret",
      qrCode: "data:image/png;base64,",
    }),
  ),

  http.post("*/admin/security/mfa/enable", () =>
    HttpResponse.json({ enabled: true }),
  ),

  http.post("*/admin/security/mfa/disable", () =>
    HttpResponse.json({ enabled: false }),
  ),
];

// ---------------------------------------------------------------------------
// statements (src/lib/api/statements.ts)
// ---------------------------------------------------------------------------
const statementsHandlers = [
  http.get("*/statements", () => HttpResponse.json({ statements: [] })),

  http.post("*/admin/statements/generate", () =>
    HttpResponse.json({ generated: true }),
  ),
];

// ---------------------------------------------------------------------------
// compliance (src/lib/api/compliance.ts)
// ---------------------------------------------------------------------------
const complianceHandlers = [
  http.get(
    "*/admin/compliance/audit-logs/export",
    () =>
      new HttpResponse("id,action\nl1,login\n", {
        headers: { "Content-Type": "text/csv" },
      }),
  ),

  http.get("*/admin/compliance/audit-logs", () =>
    HttpResponse.json({ logs: [{ id: "l1", action: "login" }] }),
  ),

  http.get("*/admin/compliance/report", () =>
    HttpResponse.json({ totalUsers: 100, flaggedTransactions: 2 }),
  ),
];

// ---------------------------------------------------------------------------
// admin (src/lib/api/admin.ts)
// ---------------------------------------------------------------------------
const adminHandlers = [
  // admin.users
  http.get("*/admin/users", () => HttpResponse.json({ users: [] })),

  http.post("*/admin/users", async ({ request }) => {
    const body = (await request.json()) as { email: string };
    return HttpResponse.json(
      { id: "admin-user-mock-1", email: body.email },
      { status: 201 },
    );
  }),

  http.put("*/admin/users/:userId", async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: params.userId, ...(body as object) });
  }),

  http.post("*/admin/users/:userId/suspend", () =>
    HttpResponse.json({ success: true }),
  ),

  http.delete(
    "*/admin/users/:userId",
    () => new HttpResponse(null, { status: 204 }),
  ),

  // admin.kyc
  http.get("*/kyc", () => HttpResponse.json({ records: [] })),

  http.put("*/kyc/:kycId", async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: params.kycId, ...(body as object) });
  }),

  // admin.settings
  http.get("*/admin/settings", () =>
    HttpResponse.json({ maintenanceMode: false }),
  ),

  http.put("*/admin/settings", () => HttpResponse.json({ success: true })),

  // admin.managers
  http.get("*/admin/managers", () => HttpResponse.json({ managers: [] })),

  http.post("*/admin/managers", async ({ request }) => {
    const body = (await request.json()) as { email: string };
    return HttpResponse.json(
      { id: "manager-mock-1", email: body.email },
      { status: 201 },
    );
  }),

  http.put("*/admin/managers/:managerId", async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: params.managerId, ...(body as object) });
  }),

  http.get("*/admin/managers/:managerId/clients", ({ params }) =>
    HttpResponse.json({
      managerId: params.managerId,
      managerName: "Mock Manager",
      clients: [],
    }),
  ),

  http.post("*/admin/managers/:managerId/clients", () =>
    HttpResponse.json({ assignmentId: "assignment-mock-1" }, { status: 201 }),
  ),

  http.delete(
    "*/admin/managers/:managerId/clients/:clientId",
    () => new HttpResponse(null, { status: 204 }),
  ),

  // admin.wallets
  http.post("*/admin/wallets/users/:userId/credit", async ({ request }) => {
    const body = (await request.json()) as { amount: number };
    return HttpResponse.json({
      message: "credited",
      availableBalance: 5000 + body.amount,
      amount: body.amount,
    });
  }),

  http.get("*/admin/wallets/withdrawals/pending", () =>
    HttpResponse.json({ withdrawals: [], total: 0 }),
  ),

  http.patch("*/admin/wallets/withdrawals/:transactionId/approve", () =>
    HttpResponse.json({ success: true }),
  ),

  http.patch("*/admin/wallets/withdrawals/:transactionId/reject", () =>
    HttpResponse.json({ success: true }),
  ),
];

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...kycHandlers,
  ...walletsHandlers,
  ...depositsHandlers,
  ...withdrawalsHandlers,
  ...investmentsHandlers,
  ...portfolioHandlers,
  ...transactionsHandlers,
  ...dashboardHandlers,
  ...riskHandlers,
  ...documentsHandlers,
  ...demoHandlers,
  ...newsletterHandlers,
  ...opsHandlers,
  ...portfolioManagerHandlers,
  ...securityHandlers,
  ...statementsHandlers,
  ...complianceHandlers,
  ...adminHandlers,
];
