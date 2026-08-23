import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/kyc.ts
export const kycHandlers = [
  http.post("*/kyc/submit", () =>
    HttpResponse.json({ status: "pending" }, { status: 201 }),
  ),
  http.get("*/kyc/status", () => HttpResponse.json({ status: "approved" })),
];
