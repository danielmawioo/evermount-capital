import { apiClient } from "./client";

export const admin = {
  users: {
    getAll: (params?: {
      status?: string;
      role?: string;
      search?: string;
      page?: number;
      limit?: number;
    }) => apiClient.get("/admin/users", { params }),

    create: (data: {
      email: string;
      password: string;
      fullName: string;
      role: string;
    }) => apiClient.post("/admin/users", data),

    update: (userId: string, data: Record<string, unknown>) =>
      apiClient.put(`/admin/users/${userId}`, data),

    suspend: (userId: string, data: { action: string; reason?: string }) =>
      apiClient.post(`/admin/users/${userId}/suspend`, data),

    delete: (userId: string) => apiClient.delete(`/admin/users/${userId}`),
  },

  kyc: {
    getAll: (params?: { status?: string; page?: number; limit?: number }) =>
      apiClient.get("/kyc", { params }),

    update: (kycId: string, data: { status: string; notes?: string }) =>
      apiClient.put(`/kyc/${kycId}`, data),
  },

  settings: {
    get: () => apiClient.get("/admin/settings"),

    update: (key: string, value: Record<string, unknown>) =>
      apiClient.put("/admin/settings", { key, value }),
  },

  managers: {
    getAll: () =>
      apiClient.get<{
        managers: Array<{
          id: string;
          email: string;
          fullName: string;
          status: "active" | "inactive";
          clientCount: number;
          joinDate: string;
        }>;
      }>("/admin/managers"),

    create: (data: { email: string; password: string; fullName: string }) =>
      apiClient.post("/admin/managers", data),

    update: (
      managerId: string,
      data: { fullName?: string; status?: "active" | "inactive" }
    ) => apiClient.put(`/admin/managers/${managerId}`, data),

    getClients: (managerId: string) =>
      apiClient.get<{
        managerId: string;
        managerName: string;
        clients: Array<{
          assignmentId: string;
          clientId: string;
          email: string;
          fullName: string;
          kycStatus: string;
          availableBalance: number;
          currency: string;
          assignedAt: string;
          notes: string | null;
        }>;
      }>(`/admin/managers/${managerId}/clients`),

    assignClient: (
      managerId: string,
      data: { email: string; notes?: string }
    ) => apiClient.post(`/admin/managers/${managerId}/clients`, data),

    unassignClient: (managerId: string, clientId: string) =>
      apiClient.delete(`/admin/managers/${managerId}/clients/${clientId}`),
  },

  wallets: {
    creditUser: (userId: string, data: { amount: number; description?: string }) =>
      apiClient.post<{
        message: string;
        availableBalance: number;
        amount: number;
      }>(`/admin/wallets/users/${userId}/credit`, data),

    getPendingWithdrawals: () =>
      apiClient.get<{
        withdrawals: Array<{
          transactionId: string;
          userId: string;
          userEmail: string;
          userName: string;
          amount: number;
          fee: number;
          currency: string;
          method: string;
          reference: string | null;
          description: string | null;
          createdAt: string;
        }>;
        total: number;
      }>("/admin/wallets/withdrawals/pending"),

    approveWithdrawal: (transactionId: string) =>
      apiClient.patch(`/admin/wallets/withdrawals/${transactionId}/approve`),

    rejectWithdrawal: (transactionId: string, data?: { reason?: string }) =>
      apiClient.patch(`/admin/wallets/withdrawals/${transactionId}/reject`, data),
  },
};
