"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useState } from "react";

export default function WithdrawCardPage() {
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardType || !cardNumber || !amount) {
      alert("Please complete all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert(`Withdrawal of $${amount} to your ${cardType} card successful! 🚀`);
      setCardType("");
      setCardNumber("");
      setAmount("");
      setLoading(false);
    }, 1200);
  };

  return (
    <TranslateTree>
    <main className="min-h-screen flex flex-col px-6 md:px-10 py-8 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Withdraw to Card
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Provide your card details to receive your funds.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#161a23] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8"
        >
          {/* Select Card */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Card Type
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
            >
              <option value="">Select Card</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Card Number (Last 4 digits)
            </label>
            <input
              type="text"
              placeholder="e.g., 1234"
              maxLength={4}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Amount (USD)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-[#8cd9c0] text-white cursor-not-allowed"
                : "bg-[#00a76f] hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Withdraw to Card"}
          </button>
        </form>
      </div>
    </main>
      </TranslateTree>
  );
}
