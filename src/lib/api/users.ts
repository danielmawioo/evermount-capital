import { apiClient } from "./client";

export const users = {
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

  bankAccounts: {
    list: () => apiClient.get("/users/bank-accounts"),

    add: (data: {
      bankName: string;
      accountHolder: string;
      accountNumber: string;
      routingNumber?: string;
      isDefault?: boolean;
    }) => apiClient.post("/users/bank-accounts", data),

    remove: (accountId: string) =>
      apiClient.delete(`/users/bank-accounts/${accountId}`),
  },
};
