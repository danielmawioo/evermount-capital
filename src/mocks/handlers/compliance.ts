import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/compliance.ts
export const complianceHandlers = [
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
