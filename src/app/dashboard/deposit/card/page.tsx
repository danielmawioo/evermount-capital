"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StripePayment from "@/components/StripePayment";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { minimumAmountSchema } from "@/lib/schemas";

const CardDepositAmountSchema = minimumAmountSchema(
  10,
  "Minimum deposit amount is $10",
);

export default function CardDepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [settlementBank, setSettlementBank] = useState("");
  const [settlementAccount, setSettlementAccount] = useState("");
  const [settlementCard, setSettlementCard] = useState("");

  useEffect(() => {
    api.deposits
      .getSettlementAccount()
      .then(({ data }) => {
        setSettlementBank(data.bankName || "");
        setSettlementAccount(data.accountNumber || "");
        setSettlementCard(data.cardMasked || "");
      })
      .catch((error) => {
        logger.warn("Failed to load settlement account for card deposit", {
          error: String(error),
        });
        /* settlement display is optional */
      });
  }, []);

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = CardDepositAmountSchema.safeParse(parseFloat(amount));
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please enter a valid amount",
      );
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      await api.deposits.confirmStripe({ paymentIntentId });
      toast.success(`$${amount} deposited to your wallet successfully!`);
      setTimeout(() => {
        router.push("/dashboard/wallets");
      }, 1500);
    } catch (error: unknown) {
      logger.error("Card deposit confirmation failed", error);
      toast.error(getApiErrorMessage(error, "Failed to complete deposit"));
    }
  };

  const handlePaymentError = (error: string) => {
    logger.error("Card payment failed", error);
  };

  if (showPayment && amount) {
    return (
    <TranslateTree>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Complete Payment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your Visa or Mastercard details to complete the deposit.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 max-w-lg mx-auto text-sm text-gray-600 dark:text-gray-400">
          <p>
            Card payments are processed securely and settled to{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {settlementBank || "Equity Bank Kenya"}
            </span>{" "}
            account{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {settlementAccount || "0110166613478"}
            </span>
            .
          </p>
        </div>

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
        </TranslateTree>
  );
  }

  return (
    <TranslateTree>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Card Deposit
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Securely deposit funds using Visa or Mastercard. Payments settle to our{" "}
        {settlementBank || "Equity Bank Kenya"} account (
        {settlementAccount || "0110166613478"}) and are credited to your wallet.
      </p>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto space-y-4">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 text-sm space-y-1 border border-gray-100 dark:border-gray-700">
          <p className="font-medium text-gray-800 dark:text-white">
            Receiving account
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {settlementBank || "Equity Bank Kenya"} ·{" "}
            {settlementAccount || "0110166613478"}
          </p>
          {settlementCard && (
            <p className="text-gray-500 dark:text-gray-500">
              Card: {settlementCard}
            </p>
          )}
        </div>
        <form onSubmit={handleAmountSubmit} className="space-y-6 pt-2">
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
      </TranslateTree>
  );
}
