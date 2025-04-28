"use client";

import Link from "next/link";
import { useState } from "react";

export default function WithdrawPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyBankDetails = () => {
    const details = `
Bank: Evermount Capital Bank
Account Number: 1234567890
Branch: Nairobi HQ
`;

    navigator.clipboard.writeText(details);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Withdraw Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Securely withdraw your funds to your preferred bank or crypto wallet.
        </p>
      </div>

      {/* Withdrawal Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Withdrawal */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md flex flex-col items-center text-center space-y-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3v18m9-9H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Withdraw to Bank
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transfer your available balance directly to your bank account.
          </p>

          <button
            onClick={handleCopyBankDetails}
            className="mt-4 w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {copied ? "✅ Bank Info Copied!" : "Copy Bank Info"}
          </button>

          <Link
            href="/dashboard/withdraw/bank"
            className="text-sm text-[#00a76f] mt-2 hover:underline"
          >
            Proceed to Withdraw →
          </Link>
        </div>

        {/* Crypto Withdrawal */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md flex flex-col items-center text-center space-y-4">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Withdraw to Crypto Wallet
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Receive your funds in your personal crypto wallet securely.
          </p>

          <Link
            href="/dashboard/withdraw/crypto"
            className="mt-4 w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition text-center"
          >
            Withdraw to Crypto
          </Link>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/wallets" className="hover:underline">
          ← Back to Wallets
        </Link>
      </div>
    </div>
  );
}
