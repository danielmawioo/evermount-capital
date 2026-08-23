import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/auth.ts
export const authHandlers = [
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
