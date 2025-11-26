"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StripePayment from "@/components/StripePayment";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";

export default function CardDepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (numAmount < 10) {
      toast.error("Minimum deposit amount is $10");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Create deposit record via API
      const { data } = await api.deposits.card({
        amount: parseFloat(amount),
        currency: "USD",
        cardToken: paymentIntentId,
        saveCard: false,
      });
      
      toast.success(`$${amount} deposited to your wallet successfully!`);
      setTimeout(() => {
        router.push("/dashboard/wallets");
      }, 2000);
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || error?.response?.data?.message || "Failed to complete deposit";
      toast.error(message);
    }
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
  };

  if (showPayment && amount) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Complete Payment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your card details to complete the deposit.
        </p>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
          <StripePayment
            amount={parseFloat(amount)}
            currency="USD"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            saveCard={false}
          />
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={() => setShowPayment(false)}
            className="hover:underline"
          >
            ← Change Amount
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Card Deposit
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Securely deposit funds to your wallet using Visa or Mastercard. Funds will be available in your wallet for withdrawal or investment.
      </p>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
        <form onSubmit={handleAmountSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deposit Amount (USD)
            </label>
            <input
              type="number"
              step="0.01"
              min="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Minimum deposit: $10.00
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00a76f] hover:bg-[#029866] text-white py-3 rounded-lg font-semibold transition"
          >
            Continue to Payment
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/deposit" className="hover:underline">
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
  );
}
