import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuth,
  usesPersistentStorage,
} from "./auth-storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.evermount.co";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function mfaConfig(mfaToken?: string) {
  return mfaToken
    ? { headers: { "X-MFA-Token": mfaToken } }
    : undefined;
}

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });

  const rememberMe = usesPersistentStorage();
  setAuthTokens(data.token, data.refreshToken, rememberMe);
  return data.token;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const url = originalRequest.url ?? "";
      if (url.includes("/auth/refresh") || url.includes("/auth/login")) {
        clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const newToken = await refreshPromise;
        if (!newToken) {
          clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch {
        clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    register: (data: { email: string; password: string; fullName: string }) =>
      apiClient.post("/auth/register", data),

    login: (data: { email: string; password: string }) =>
      apiClient.post("/auth/login", data),

    googleAuth: (data: { accessToken: string }) =>
      apiClient.post("/auth/google", data),

    githubAuth: (data: { accessToken: string }) =>
      apiClient.post("/auth/github", data),

    xAuth: (data: { accessToken: string }) =>
      apiClient.post("/auth/x", data),

    appleAuth: (data: { idToken: string }) =>
      apiClient.post("/auth/apple", data),

    sendResetPassword: (data: { email: string }) =>
      apiClient.post("/auth/send-reset-password", data),

    resetPassword: (data: { token: string; newPassword: string }) =>
      apiClient.post("/auth/reset-password", data),

    verifyEmail: (data: { token: string }) =>
      apiClient.post("/auth/verify-email", data),

    refreshToken: (refreshToken: string) =>
      apiClient.post("/auth/refresh", { refreshToken }),

    logout: () => apiClient.post("/auth/logout"),
  },

  users: {
    getProfile: () => apiClient.get("/users/profile"),

    updateProfile: (data: Record<string, unknown>) =>
      apiClient.put("/users/profile", data),

    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      apiClient.put("/users/change-password", data),

    updateEmail: (data: { newEmail: string; password: string }) =>
      apiClient.put("/users/email", data),

    uploadProfilePicture: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.post("/users/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    deleteAccount: (data: { password: string }) =>
      apiClient.delete("/users/account", { data }),
  },

  kyc: {
    submit: (files: {
      identityDocument: File;
      proofOfAddress: File;
      selfie: File;
    }) => {
      const formData = new FormData();
      formData.append("identityDocument", files.identityDocument);
      formData.append("proofOfAddress", files.proofOfAddress);
      formData.append("selfie", files.selfie);
      return apiClient.post("/kyc/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },

    getStatus: () => apiClient.get("/kyc/status"),
  },

  wallets: {
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
  },

  deposits: {
    getSettlementAccount: () => apiClient.get("/deposits/settlement-account"),

    card: (data: {
      amount: number;
      currency: string;
      cardToken: string;
      saveCard?: boolean;
    }) => apiClient.post("/deposits/card", data),

    crypto: (data: {
      amount: number;
      currency: string;
      walletAddress: string;
    }) => apiClient.post("/deposits/crypto", data),

    bank: (data: {
      amount: number;
      currency: string;
      bankAccountId: string;
      reference: string;
    }) => apiClient.post("/deposits/bank", data),

    mpesa: (data: {
      amount: number;
      currency: string;
      phoneNumber: string;
    }) => apiClient.post("/deposits/mpesa", data),

    getStatus: (depositId: string) => apiClient.get(`/deposits/${depositId}`),

    getAll: (params?: { status?: string; page?: number; limit?: number }) =>
      apiClient.get("/deposits", { params }),
  },

  withdrawals: {
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
  },

  investments: {
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
  },

  portfolio: {
    get: () => apiClient.get("/portfolio"),

    getPerformance: (params?: { period?: string }) =>
      apiClient.get("/portfolio/performance", { params }),
  },

  transactions: {
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
  },

  dashboard: {
    getStats: () => apiClient.get("/dashboard/stats"),
  },

  risk: {
    getAssessment: () => apiClient.get("/risk/assessment"),
  },

  documents: {
    upload: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },

  demo: {
    getBookedSlots: () => apiClient.get("/booked-demo-slots"),

    book: (data: {
      fullName: string;
      email: string;
      company?: string;
      preferredDateTime: string;
      message?: string;
    }) => apiClient.post("/demo-booking", data),
  },

  newsletter: {
    subscribe: (data: { email: string }) => apiClient.post("/waitlist", data),
  },

  ops: {
    getTradingStatus: () => apiClient.get("/ops/trading/status"),

    setKillSwitch: (
      data: { active: boolean; reason?: string },
      mfaToken?: string
    ) =>
      apiClient.post("/ops/trading/kill-switch", data, mfaConfig(mfaToken)),

    runNavBatch: () => apiClient.post("/ops/nav-batch/run"),

    getNavHistory: (strategyKey: string) =>
      apiClient.get(`/ops/nav/${strategyKey}/history`),

    getFlipbotStatus: () => apiClient.get("/ops/flipbot/status"),

    getStrategyLifecycle: () => apiClient.get("/ops/strategies/lifecycle"),

    runPromotionCheck: (strategyKey: string, mfaToken?: string) =>
      apiClient.post(
        `/ops/strategies/${strategyKey}/promotion-check`,
        {},
        mfaConfig(mfaToken)
      ),

    promoteStrategy: (
      strategyKey: string,
      data: { targetStatus: string },
      mfaToken?: string
    ) =>
      apiClient.post(
        `/ops/strategies/${strategyKey}/promote`,
        data,
        mfaConfig(mfaToken)
      ),

    syncPositions: () => apiClient.post("/ops/trading/sync-positions"),

    getSyncedPositions: () => apiClient.get("/ops/trading/positions"),

    runDemoReconciliation: (mfaToken?: string) =>
      apiClient.post(
        "/ops/trading/demo-reconciliation",
        {},
        mfaConfig(mfaToken)
      ),

    getDemoReconciliationHistory: () =>
      apiClient.get("/ops/trading/demo-reconciliation/history"),
  },

  security: {
    mfa: {
      getStatus: () => apiClient.get("/admin/security/mfa/status"),
      setup: () => apiClient.post("/admin/security/mfa/setup"),
      enable: (data: { token: string }) =>
        apiClient.post("/admin/security/mfa/enable", data),
      disable: (data: { token: string }) =>
        apiClient.post("/admin/security/mfa/disable", data),
    },
  },

  statements: {
    list: () => apiClient.get("/statements"),

    downloadUrl: (id: string) =>
      `${API_BASE_URL}/statements/${id}/download`,

    generateBatch: (year: number, month: number) =>
      apiClient.post("/admin/statements/generate", null, {
        params: { year, month },
      }),
  },

  compliance: {
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
  },

  admin: {
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

      update: (data: Record<string, unknown>) =>
        apiClient.put("/admin/settings", data),
    },

    managers: {
      getAll: () => apiClient.get("/admin/managers"),

      create: (data: Record<string, unknown>) =>
        apiClient.post("/admin/managers", data),

      update: (managerId: string, data: Record<string, unknown>) =>
        apiClient.put(`/admin/managers/${managerId}`, data),
    },
  },
};

export default apiClient;
