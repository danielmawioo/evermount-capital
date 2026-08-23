import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/statements.ts
export const statementsHandlers = [
  http.get("*/statements", () => HttpResponse.json({ statements: [] })),

  http.post("*/admin/statements/generate", () =>
    HttpResponse.json({ generated: true }),
  ),
];
