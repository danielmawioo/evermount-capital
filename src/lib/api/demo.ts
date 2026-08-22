import { apiClient } from "./client";

export const demo = {
  getBookedSlots: () => apiClient.get("/booked-demo-slots"),

  book: (data: {
    fullName: string;
    email: string;
    company?: string;
    preferredDateTime: string;
    message?: string;
  }) => apiClient.post("/demo-booking", data),
};
