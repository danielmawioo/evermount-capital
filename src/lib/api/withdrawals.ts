import { apiClient } from "./client";

export const withdrawals = {
  bank: (data: {
    amount: number;
    currency: string;
    bankAccountId: string;
    reason?: string;
  }) => apiClient.post("/withdrawals/bank", data),

  crypto: (data: {
    amount: number;
    currency: string;
    walletAddress: string;
    network: string;
  }) => apiClient.post("/withdrawals/crypto", data),

  mpesa: (data: {
    amount: number;
    currency: string;
    phoneNumber: string;
    reason?: string;
  }) => apiClient.post("/withdrawals/mpesa", data),

  getStatus: (withdrawalId: string) =>
    apiClient.get(`/withdrawals/${withdrawalId}`),

  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get("/withdrawals", { params }),

  cancel: (withdrawalId: string) =>
    apiClient.post(`/withdrawals/${withdrawalId}/cancel`),
};
