import { apiClient } from "./client";

export const investments = {
  getOptions: (params?: { category?: string }) =>
    apiClient.get("/investments/options", { params }),

  getPreferences: () => apiClient.get("/investments/preferences"),

  updatePreferences: (data: {
    lockInMonths?: number;
    riskTolerance?: string;
    reinvestProfits?: boolean;
  }) => apiClient.put("/investments/preferences", data),

  previewTrade: (data: { amount: number; lockInMonths?: number }) =>
    apiClient.post("/investments/trade/preview", data),

  executeTrade: (data: { amount: number; lockInMonths?: number }) =>
    apiClient.post("/investments/trade", data),

  create: (data: {
    investmentOptionId: string;
    amount: number;
    strategy: string;
  }) => apiClient.post("/investments", data),

  close: (investmentId: string, data: { reason?: string }) =>
    apiClient.post(`/investments/${investmentId}/close`, data),
};
