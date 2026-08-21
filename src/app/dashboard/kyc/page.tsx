"use client";

import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import FileUpload from "@/components/FileUpload";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";

export default function InvestorKYCPage() {
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  useEffect(() => {
    api.kyc
      .getStatus()
      .then(({ data }) => {
        setKycStatus(data.status);
        setRejectionReason(data.rejectionReason ?? null);
      })
      .catch(() => setKycStatus(null));
  }, []);

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
      setIdentityDocument(null);
      setProofOfAddress(null);
      setSelfie(null);
      setKycStatus("pending");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to submit documents"));
    } finally {
      setLoading(false);
    }
  };

  if (kycStatus === "rejected") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
        <div className="w-full max-w-2xl bg-white dark:bg-[#161a23] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              Verification Rejected
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your previous submission was rejected. Please upload new documents
              to try again.
            </p>
            {rejectionReason && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                Reason: {rejectionReason}
              </p>
            )}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FileUpload
              accept="image/*,.pdf"
              maxSize={10}
              multiple={false}
              onUpload={async (files) => {
                if (files[0]) setIdentityDocument(files[0]);
              }}
              label="Identity Document (ID/Passport)"
              description="Government-issued ID or passport"
            />
            <FileUpload
              accept="image/*,.pdf"
              maxSize={10}
              multiple={false}
              onUpload={async (files) => {
                if (files[0]) setProofOfAddress(files[0]);
              }}
              label="Proof of Address"
              description="Utility bill or bank statement (within 3 months)"
            />
            <FileUpload
              accept="image/*"
              maxSize={5}
              multiple={false}
              onUpload={async (files) => {
                if (files[0]) setSelfie(files[0]);
              }}
              label="Selfie with ID"
              description="Clear selfie holding your ID next to your face"
            />
            <button
              type="submit"
              disabled={loading || !identityDocument || !proofOfAddress || !selfie}
              className="flex items-center gap-2 w-full justify-center bg-[#00a76f] hover:bg-emerald-700 text-white py-2.5 rounded-md font-semibold transition disabled:opacity-50"
            >
              <FaUpload />
              {loading ? "Submitting..." : "Resubmit Verification"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (kycStatus === "verified") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-[#161a23] p-8 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            KYC Verified
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your identity has been verified. You have full access to deposits and
            investments.
          </p>
        </div>
      </main>
    );
  }

  if (kycStatus === "pending") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-[#161a23] p-8 rounded-lg border border-gray-100 dark:border-gray-800 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            KYC Under Review
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your documents are being reviewed. We will notify you by email once
            complete.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161a23] p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          KYC Verification
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Upload your documents to verify your identity before investing.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <FileUpload
            accept="image/*,.pdf"
            maxSize={10}
            multiple={false}
            onUpload={async (files) => {
              if (files[0]) setIdentityDocument(files[0]);
            }}
            label="Identity Document (ID/Passport)"
            description="Government-issued ID or passport"
          />

          <FileUpload
            accept="image/*,.pdf"
            maxSize={10}
            multiple={false}
            onUpload={async (files) => {
              if (files[0]) setProofOfAddress(files[0]);
            }}
            label="Proof of Address"
            description="Utility bill or bank statement (within 3 months)"
          />

          <FileUpload
            accept="image/*"
            maxSize={5}
            multiple={false}
            onUpload={async (files) => {
              if (files[0]) setSelfie(files[0]);
            }}
            label="Selfie with ID"
            description="Clear selfie holding your ID next to your face"
          />

          <button
            type="submit"
            disabled={loading || !identityDocument || !proofOfAddress || !selfie}
            className="flex items-center gap-2 w-full justify-center bg-[#00a76f] hover:bg-emerald-700 text-white py-2.5 rounded-md font-semibold transition disabled:opacity-50"
          >
            <FaUpload />
            {loading ? "Submitting..." : "Submit Verification"}
          </button>
        </form>
      </div>
    </main>
  );
}
