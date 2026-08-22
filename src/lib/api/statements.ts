import { apiClient, API_BASE_URL } from "./client";

export const statements = {
  list: () => apiClient.get("/statements"),

  downloadUrl: (id: string) => `${API_BASE_URL}/statements/${id}/download`,

  generateBatch: (year: number, month: number) =>
    apiClient.post("/admin/statements/generate", null, {
      params: { year, month },
    }),
};
