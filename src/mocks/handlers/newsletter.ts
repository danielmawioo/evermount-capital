import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/newsletter.ts
export const newsletterHandlers = [
  http.post("*/waitlist", () =>
    HttpResponse.json({ success: true }, { status: 201 }),
  ),
];
