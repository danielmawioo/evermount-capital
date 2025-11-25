import axios, { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.evermount.co";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Authentication
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
    
    refreshToken: () =>
      apiClient.post("/auth/refresh"),
  },

  // User Profile
  users: {
    getProfile: () =>
      apiClient.get("/users/profile"),
    
    updateProfile: (data: any) =>
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

  // KYC
  kyc: {
    submit: (files: { identityDocument: File; proofOfAddress: File; selfie: File }) => {
      const formData = new FormData();
      formData.append("identityDocument", files.identityDocument);
      formData.append("proofOfAddress", files.proofOfAddress);
      formData.append("selfie", files.selfie);
      return apiClient.post("/kyc/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    
    getStatus: () =>
      apiClient.get("/kyc/status"),
  },

  // Wallets
  wallets: {
    getBalance: () =>
      apiClient.get("/wallets/balance"),
    
    getHistory: (params?: {
      type?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }) =>
      apiClient.get("/wallets/history", { params }),
  },

  // Deposits
  deposits: {
    card: (data: { amount: number; currency: string; cardToken: string; saveCard?: boolean }) =>
      apiClient.post("/deposits/card", data),
    
    crypto: (data: { amount: number; currency: string; walletAddress: string }) =>
      apiClient.post("/deposits/crypto", data),
    
    bank: (data: { amount: number; currency: string; bankAccountId: string; reference: string }) =>
      apiClient.post("/deposits/bank", data),
    
    getStatus: (depositId: string) =>
      apiClient.get(`/deposits/${depositId}`),
    
    getAll: (params?: { status?: string; page?: number; limit?: number }) =>
      apiClient.get("/deposits", { params }),
  },

  // Withdrawals
  withdrawals: {
    bank: (data: { amount: number; currency: string; bankAccountId: string; reason?: string }) =>
      apiClient.post("/withdrawals/bank", data),
    
    crypto: (data: { amount: number; currency: string; walletAddress: string; network: string }) =>
      apiClient.post("/withdrawals/crypto", data),
    
    getStatus: (withdrawalId: string) =>
      apiClient.get(`/withdrawals/${withdrawalId}`),
    
    getAll: (params?: { status?: string; page?: number; limit?: number }) =>
      apiClient.get("/withdrawals", { params }),
    
    cancel: (withdrawalId: string) =>
      apiClient.post(`/withdrawals/${withdrawalId}/cancel`),
  },

  // Investments
  investments: {
    getOptions: (params?: { category?: string }) =>
      apiClient.get("/investments/options", { params }),
    
    create: (data: { investmentOptionId: string; amount: number; strategy: string }) =>
      apiClient.post("/investments", data),
    
    close: (investmentId: string, data: { reason?: string }) =>
      apiClient.post(`/investments/${investmentId}/close`, data),
  },

  // Portfolio
  portfolio: {
    get: () =>
      apiClient.get("/portfolio"),
    
    getPerformance: (params?: { period?: string }) =>
      apiClient.get("/portfolio/performance", { params }),
  },

  // Transactions
  transactions: {
    getAll: (params?: {
      type?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }) =>
      apiClient.get("/transactions", { params }),
    
    getById: (transactionId: string) =>
      apiClient.get(`/transactions/${transactionId}`),
  },

  // Dashboard
  dashboard: {
    getStats: () =>
      apiClient.get("/dashboard/stats"),
  },

  // Risk
  risk: {
    getAssessment: () =>
      apiClient.get("/risk/assessment"),
  },

  // Documents
  documents: {
    upload: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },

  // Demo Booking
  demo: {
    getBookedSlots: () =>
      apiClient.get("/booked-demo-slots"),
    
    book: (data: {
      fullName: string;
      email: string;
      company?: string;
      preferredDateTime: string;
      message?: string;
    }) =>
      apiClient.post("/demo-booking", data),
  },

  // Newsletter
  newsletter: {
    subscribe: (data: { email: string }) =>
      apiClient.post("/waitlist", data),
  },

  // Admin
  admin: {
    users: {
      getAll: (params?: {
        status?: string;
        role?: string;
        search?: string;
        page?: number;
        limit?: number;
      }) =>
        apiClient.get("/admin/users", { params }),
      
      create: (data: { email: string; password: string; fullName: string; role: string }) =>
        apiClient.post("/admin/users", data),
      
      update: (userId: string, data: any) =>
        apiClient.put(`/admin/users/${userId}`, data),
      
      suspend: (userId: string, data: { action: string; reason?: string }) =>
        apiClient.post(`/admin/users/${userId}/suspend`, data),
      
      delete: (userId: string) =>
        apiClient.delete(`/admin/users/${userId}`),
    },
    
    kyc: {
      getAll: (params?: { status?: string; page?: number; limit?: number }) =>
        apiClient.get("/admin/kyc", { params }),
      
      update: (kycId: string, data: { status: string; notes?: string }) =>
        apiClient.put(`/admin/kyc/${kycId}`, data),
    },
    
    settings: {
      get: () =>
        apiClient.get("/admin/settings"),
      
      update: (data: any) =>
        apiClient.put("/admin/settings", data),
    },
    
    managers: {
      getAll: () =>
        apiClient.get("/admin/managers"),
      
      create: (data: any) =>
        apiClient.post("/admin/managers", data),
      
      update: (managerId: string, data: any) =>
        apiClient.put(`/admin/managers/${managerId}`, data),
    },
  },
};

export default apiClient;

