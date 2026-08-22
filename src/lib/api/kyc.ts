import { apiClient } from "./client";

export const kyc = {
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
};
