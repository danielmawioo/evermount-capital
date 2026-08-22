"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

interface KYCSubmission {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  status: string;
  submittedAt: string;
  identityDocument?: string;
  proofOfAddress?: string;
  selfie?: string;
}

export default function AdminKYCReviewPage() {
  const [submissions, setSubmissions] = useState<KYCSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("PENDING");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? { status: filter } : undefined;
      const { data } = await api.admin.kyc.getAll(params);
      setSubmissions(data.submissions || data.kycSubmissions || []);
    } catch (error) {
      logger.error("Failed to load KYC submissions", error);
      toast.error("Failed to load KYC submissions");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const updateStatus = async (
    kycId: string,
    status: "VERIFIED" | "REJECTED",
    notes?: string
  ) => {
    setProcessingId(kycId);
    try {
      await api.admin.kyc.update(kycId, { status, notes });
      toast.success(`KYC ${status === "VERIFIED" ? "approved" : "rejected"}`);
      await loadSubmissions();
    } catch (error) {
      logger.error("Failed to update KYC status", error);
      toast.error("Failed to update KYC status");
    } finally {
      setProcessingId(null);
    }
  };

  const statusBadge = (status: string) => {
    const normalized = status.toUpperCase();
    if (normalized === "VERIFIED") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircleIcon className="w-3.5 h-3.5" /> Verified
        </span>
      );
    }
    if (normalized === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <XCircleIcon className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
        <ClockIcon className="w-3.5 h-3.5" /> Pending
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <DocumentDuplicateIcon className="w-8 h-8 text-[#00a76f]" />
          KYC Review
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review and approve investor identity submissions.
        </p>
      </div>

      <div className="flex gap-2">
        {["PENDING", "VERIFIED", "REJECTED", "all"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === s
                ? "bg-[#00a76f] text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No submissions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.userEmail}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted{" "}
                    {new Date(item.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(item.status)}
                  {item.status.toUpperCase() === "PENDING" && (
                    <>
                      <button
                        disabled={processingId === item.id}
                        onClick={() => updateStatus(item.id, "VERIFIED")}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        disabled={processingId === item.id}
                        onClick={() => {
                          const notes = prompt("Rejection reason (optional):");
                          updateStatus(item.id, "REJECTED", notes || undefined);
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
              {(item.identityDocument || item.proofOfAddress || item.selfie) && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {item.identityDocument && (
                    <a
                      href={item.identityDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a76f] hover:underline"
                    >
                      Identity doc
                    </a>
                  )}
                  {item.proofOfAddress && (
                    <a
                      href={item.proofOfAddress}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a76f] hover:underline"
                    >
                      Proof of address
                    </a>
                  )}
                  {item.selfie && (
                    <a
                      href={item.selfie}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00a76f] hover:underline"
                    >
                      Selfie
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
