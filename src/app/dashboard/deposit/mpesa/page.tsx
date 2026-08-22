"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { minimumAmountSchema } from "@/lib/schemas";

const MpesaDepositAmountSchema = minimumAmountSchema(
  10,
  "Minimum deposit amount is KES 10",
);

export default function MpesaDepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = MpesaDepositAmountSchema.safeParse(parseFloat(amount));
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Minimum deposit amount is KES 10",
      );
      return;
    }
    const numAmount = parsed.data;

    if (!phoneNumber.trim()) {
      toast.error("Please enter your M-Pesa phone number");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.deposits.mpesa({
        amount: numAmount,
        currency: "KES",
        phoneNumber: phoneNumber.trim(),
      });

      setPending(true);
      toast.success(
        data.customerMessage ||
          "STK push sent. Check your phone to complete the payment.",
      );

      const pollStatus = async (attempts = 0) => {
        if (attempts >= 30) {
          toast("Payment is still processing. Check your wallet shortly.", {
            icon: "ℹ️",
          });
          router.push("/dashboard/wallets");
          return;
        }

        try {
          const statusRes = await api.deposits.getStatus(data.depositId);
          const status = statusRes.data.status;

          if (status === "completed") {
            toast.success(`KES ${numAmount} deposited successfully!`);
            router.push("/dashboard/wallets");
            return;
          }

          if (status === "failed") {
            toast.error("M-Pesa payment failed or was cancelled.");
            setPending(false);
            return;
          }
        } catch (error) {
          logger.warn("M-Pesa deposit status poll failed", {
            error: String(error),
          });
          // keep polling
        }

        setTimeout(() => pollStatus(attempts + 1), 3000);
      };

      setTimeout(() => pollStatus(), 5000);
    } catch (error: unknown) {
      const err = error as {
        response?: {
          data?: { error?: { message?: string }; message?: string };
        };
      };
      const message =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        "Failed to initiate M-Pesa deposit";
      logger.error("M-Pesa deposit failed", error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          M-Pesa Deposit
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fund your KES wallet instantly via M-Pesa. You will receive an STK
          push on your phone to confirm the payment.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
        {pending ? (
          <div className="text-center space-y-4 py-6">
            <div className="animate-pulse text-4xl">📱</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Waiting for M-Pesa confirmation...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your M-Pesa PIN on your phone to complete the deposit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="07XX XXX XXX"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deposit Amount (KES)
              </label>
              <input
                type="number"
                step="1"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Minimum deposit: KES 10
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-[#8cd9c0] text-white cursor-not-allowed"
                  : "bg-[#00a76f] hover:bg-[#029866] text-white"
              }`}
            >
              {loading ? "Sending STK Push..." : "Pay with M-Pesa"}
            </button>
          </form>
        )}
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/deposit" className="hover:underline">
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
  );
}
