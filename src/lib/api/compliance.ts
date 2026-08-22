import { apiClient } from "./client";

export const compliance = {
  getAuditLogs: (params?: {
    from?: string;
    to?: string;
    action?: string;
    limit?: number;
    offset?: number;
  }) => apiClient.get("/admin/compliance/audit-logs", { params }),

  exportAuditLogs: (params?: { from?: string; to?: string }) =>
    apiClient.get("/admin/compliance/audit-logs/export", {
      params,
      responseType: "blob",
    }),

  getReport: () => apiClient.get("/admin/compliance/report"),
};
