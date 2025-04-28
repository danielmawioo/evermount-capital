"use client";

import { useState } from "react";
import Link from "next/link";

export default function BankDepositPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const accountDetails = `
      Bank Name: Evermount Capital Bank
      Account Number: 1234567890
      Swift Code: EVRCBKEN
      Branch: Nairobi HQ
    `;

    navigator.clipboard.writeText(accountDetails.trim());
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bank Transfer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fund your wallet by securely transferring to our bank account.
        </p>
      </div>

      {/* Bank Details */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          {[
            { label: "Bank Name", value: "Evermount Capital Bank" },
            { label: "Account Number", value: "1234567890" },
            { label: "Swift Code", value: "EVRCBKEN" },
            { label: "Branch", value: "Nairobi HQ" },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {item.label}:
              </span>
              <span className="text-gray-800 dark:text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Copy Button */}
        <div className="pt-4">
          <button
            onClick={handleCopy}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          >
            {copied ? "✅ Copied!" : "Copy Account Details"}
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
