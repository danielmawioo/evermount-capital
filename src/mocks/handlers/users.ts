import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/users.ts
export const usersHandlers = [
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
