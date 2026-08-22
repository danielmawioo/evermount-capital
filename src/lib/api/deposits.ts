import { apiClient } from "./client";

export const deposits = {
  getSettlementAccount: () => apiClient.get("/deposits/settlement-account"),

  card: (data: {
    amount: number;
    currency: string;
    cardToken: string;
    saveCard?: boolean;
  }) => apiClient.post("/deposits/card", data),

  confirmStripe: (data: { paymentIntentId: string }) =>
    apiClient.post("/deposits/stripe/confirm", data),

  crypto: (data: { amount: number; currency: string; walletAddress: string }) =>
    apiClient.post("/deposits/crypto", data),

  bank: (data: {
    amount: number;
    currency: string;
    bankAccountId: string;
    reference?: string;
  }) => apiClient.post("/deposits/bank", data),

  mpesa: (data: { amount: number; currency: string; phoneNumber: string }) =>
    apiClient.post("/deposits/mpesa", data),

  getStatus: (depositId: string) => apiClient.get(`/deposits/${depositId}`),

  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get("/deposits", { params }),
};
