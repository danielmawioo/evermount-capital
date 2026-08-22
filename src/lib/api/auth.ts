import { apiClient } from "./client";

export const auth = {
  register: (data: { email: string; password: string; fullName: string }) =>
    apiClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),

  googleAuth: (data: { accessToken: string }) =>
    apiClient.post("/auth/google", data),

  githubAuth: (data: { accessToken: string }) =>
    apiClient.post("/auth/github", data),

  xAuth: (data: { accessToken: string }) => apiClient.post("/auth/x", data),

  appleAuth: (data: { idToken: string }) => apiClient.post("/auth/apple", data),

  sendResetPassword: (data: { email: string }) =>
    apiClient.post("/auth/send-reset-password", data),

  resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
    apiClient.post("/auth/reset-password", data),

  verifyEmail: (data: { token: string }) =>
    apiClient.post("/auth/verify-email", data),

  refreshToken: (refreshToken: string) =>
    apiClient.post("/auth/refresh", { refreshToken }),

  logout: () => apiClient.post("/auth/logout"),
};
