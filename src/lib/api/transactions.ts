import { apiClient } from "./client";

export const transactions = {
  getAll: (params?: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get("/transactions", { params }),

  getById: (transactionId: string) =>
    apiClient.get(`/transactions/${transactionId}`),
};
