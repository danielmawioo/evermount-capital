import { apiClient } from "./client";

export const security = {
  mfa: {
    getStatus: () => apiClient.get("/admin/security/mfa/status"),
    setup: () => apiClient.post("/admin/security/mfa/setup"),
    enable: (data: { token: string }) =>
      apiClient.post("/admin/security/mfa/enable", data),
    disable: (data: { token: string }) =>
      apiClient.post("/admin/security/mfa/disable", data),
  },
};
