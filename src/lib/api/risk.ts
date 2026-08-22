import { apiClient } from "./client";

export const risk = {
  getAssessment: () => apiClient.get("/risk/assessment"),
};
