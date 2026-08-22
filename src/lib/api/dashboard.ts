import { apiClient } from "./client";

export const dashboard = {
  getStats: () => apiClient.get("/dashboard/stats"),
};
