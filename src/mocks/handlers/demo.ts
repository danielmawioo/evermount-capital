import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/demo.ts
export const demoHandlers = [
  http.get("*/booked-demo-slots", () =>
    HttpResponse.json({ slots: ["2026-09-01T10:00:00Z"] }),
  ),
  http.post("*/demo-booking", () =>
    HttpResponse.json({ id: "demo-mock-1" }, { status: 201 }),
  ),
];
