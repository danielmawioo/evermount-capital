"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowPathIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

interface PendingWithdrawal {
  transactionId: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  fee: number;
  currency: string;
  method: string;
  reference: string | null;
  description: string | null;
  createdAt: string;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "KES" ? "KES" : "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<PendingWithdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.admin.wallets.getPendingWithdrawals();
      setWithdrawals(data.withdrawals ?? []);
    } catch (error) {
      logger.error("Failed to load pending withdrawals", error);
      toast.error("Failed to load pending withdrawals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (transactionId: string) => {
    setProcessingId(transactionId);
    try {
      await api.admin.wallets.approveWithdrawal(transactionId);
      toast.success("Withdrawal approved");
      await load();
    } catch (error) {
      logger.error("Failed to approve withdrawal", error);
      toast.error("Failed to approve withdrawal");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (transactionId: string) => {
    const reason = prompt("Rejection reason (optional):") ?? undefined;
    setProcessingId(transactionId);
    try {
      await api.admin.wallets.rejectWithdrawal(transactionId, { reason });
      toast.success("Withdrawal rejected — funds returned to wallet");
      await load();
    } catch (error) {
      logger.error("Failed to reject withdrawal", error);
      toast.error("Failed to reject withdrawal");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BanknotesIcon className="w-8 h-8 text-[#00a76f]" />
              Withdrawal Approvals
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and approve investor withdrawal requests.
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        <div className="bg-white dark:bg-[#161a23] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : withdrawals.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              No pending withdrawals.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-left text-gray-600 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Investor</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Fee</th>
                    <th className="px-4 py-3 font-medium">Requested</th>
                    <th className="px-4 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {withdrawals.map((w) => (
                    <tr
                      key={w.transactionId}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {w.userName}
                        </p>
                        <p className="text-xs text-gray-500">{w.userEmail}</p>
                      </td>
                      <td className="px-4 py-3 capitalize">{w.method}</td>
                      <td className="px-4 py-3 font-semibold">
                        {formatMoney(w.amount, w.currency)}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {formatMoney(w.fee, w.currency)}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(w.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApprove(w.transactionId)}
                            disabled={processingId === w.transactionId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium disabled:opacity-50"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(w.transactionId)}
                            disabled={processingId === w.transactionId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium disabled:opacity-50"
                          >
                            <XCircleIcon className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </TranslateTree>
  );
}
