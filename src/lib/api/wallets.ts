import { apiClient } from "./client";

export const wallets = {
  getBalance: () => apiClient.get("/wallets/balance"),

  getHistory: (params?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get("/wallets/history", { params }),

  transferToInvestment: (data: {
    amount: number;
    investmentOptionId: string;
    strategy?: string;
  }) => apiClient.post("/wallets/transfer-to-investment", data),

  withdrawProfit: (data: { amount: number; reason?: string }) =>
    apiClient.post("/wallets/withdraw-profit", data),
};
