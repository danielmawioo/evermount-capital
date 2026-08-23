import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/admin.ts
export const adminHandlers = [
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
