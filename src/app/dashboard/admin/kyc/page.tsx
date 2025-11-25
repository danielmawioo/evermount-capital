"use client";

import { useState } from "react";
import { FaIdCard, FaFileAlt, FaUpload } from "react-icons/fa";
import FileUpload from "@/components/FileUpload";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";

export default function KYCPage() {
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identityDocument || !proofOfAddress || !selfie) {
      toast.error("Please upload all required documents");
      return;
    }

    setLoading(true);
    try {
      await api.kyc.submit({
        identityDocument,
        proofOfAddress,
        selfie,
      });
      toast.success("KYC documents submitted successfully!");
      // Reset form
      setIdentityDocument(null);
      setProofOfAddress(null);
      setSelfie(null);
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || error?.response?.data?.message || "Failed to submit documents";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleIdentityUpload = async (files: File[]) => {
    if (files.length > 0) {
      setIdentityDocument(files[0]);
    }
  };

  const handleAddressUpload = async (files: File[]) => {
    if (files.length > 0) {
      setProofOfAddress(files[0]);
    }
  };

  const handleSelfieUpload = async (files: File[]) => {
    if (files.length > 0) {
      setSelfie(files[0]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161a23] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          KYC Verification
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
              National ID or Passport Number
            </label>
            <input
              type="text"
              required
              placeholder="ID12345678"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
            />
          </div>

          {/* File Uploads */}
          <div className="space-y-6">
            <FileUpload
              accept="image/*,.pdf"
              maxSize={10}
              multiple={false}
              onUpload={handleIdentityUpload}
              label="Identity Document (ID/Passport)"
              description="Upload a clear photo or scan of your government-issued ID or passport"
            />

            <FileUpload
              accept="image/*,.pdf"
              maxSize={10}
              multiple={false}
              onUpload={handleAddressUpload}
              label="Proof of Address"
              description="Upload a utility bill, bank statement, or other document showing your address"
            />

            <FileUpload
              accept="image/*"
              maxSize={5}
              multiple={false}
              onUpload={handleSelfieUpload}
              label="Selfie Photo"
              description="Upload a clear selfie photo holding your ID next to your face"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !identityDocument || !proofOfAddress || !selfie}
            className="flex items-center gap-2 w-full justify-center bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUpload />
            {loading ? "Submitting..." : "Submit Verification"}
          </button>
        </form>
      </div>
    </main>
  );
}
