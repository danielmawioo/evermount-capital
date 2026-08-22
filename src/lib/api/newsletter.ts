import { apiClient } from "./client";

export const newsletter = {
  subscribe: (data: { email: string }) => apiClient.post("/waitlist", data),
};
