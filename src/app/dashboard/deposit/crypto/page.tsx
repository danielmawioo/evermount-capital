"use client";

import { useState } from "react";
import Link from "next/link";

export default function CryptoDepositPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const walletAddress = "0x1234abcd5678efgh9012ijklmnopqrstuvwx"; // Example address

    navigator.clipboard.writeText(walletAddress);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Crypto Deposit
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fund your wallet easily using supported cryptocurrencies.
        </p>
      </div>

      {/* Crypto Deposit Details */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              USDT (TRC-20) Wallet Address
            </p>
            <p className="text-sm text-gray-800 dark:text-white break-all text-center">
              0x1234abcd5678efgh9012ijklmnopqrstuvwx
            </p>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Ensure you are sending{" "}
            <span className="font-semibold">only USDT (TRC-20)</span>. Sending
            other assets may result in loss of funds.
          </div>
        </div>

        {/* Copy Button */}
        <div className="pt-4">
          <button
            onClick={handleCopy}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          >
            {copied ? "✅ Wallet Copied!" : "Copy Wallet Address"}
          </button>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/dashboard/deposit"
          className="inline-flex items-center gap-1 hover:underline"
        >
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
  );
}
