import { apiClient } from "./client";

export const portfolio = {
  get: () => apiClient.get("/portfolio"),

  getPerformance: (params?: { period?: string }) =>
    apiClient.get("/portfolio/performance", { params }),
};
