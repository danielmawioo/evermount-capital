"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import KycRequiredGate from "@/components/KycRequiredGate";

export default function MpesaWithdrawPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10) {
      toast.error("Minimum withdrawal amount is KES 10");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }

    setLoading(true);
    try {
      await api.withdrawals.mpesa({
        amount: numAmount,
        currency: "KES",
        phoneNumber: phoneNumber.trim(),
        reason: "Wallet withdrawal",
      });

      toast.success(
        "Withdrawal submitted. It will be processed after admin approval."
      );
      setTimeout(() => {
        window.location.href = "/dashboard/wallets";
      }, 2000);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Withdrawal failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KycRequiredGate action="withdraw funds">
    <main className="min-h-screen flex flex-col px-6 md:px-10 py-8 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Withdraw to M-Pesa
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Withdraw KES from your wallet directly to your M-Pesa account. Only
            available wallet balance can be withdrawn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#161a23] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              M-Pesa Phone Number
            </label>
            <input
              type="tel"
              placeholder="07XX XXX XXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Amount (KES)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              step="1"
              required
              className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Minimum withdrawal: KES 10
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-[#8cd9c0] text-white cursor-not-allowed"
                : "bg-[#00a76f] hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Withdraw to M-Pesa"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/withdraw" className="hover:underline">
            ← Back to Withdrawal Methods
          </Link>
        </div>
      </div>
    </main>
    </KycRequiredGate>
  );
}
