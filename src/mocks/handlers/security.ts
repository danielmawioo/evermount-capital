import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/security.ts
export const securityHandlers = [
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
