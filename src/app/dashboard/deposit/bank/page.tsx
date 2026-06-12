"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SETTLEMENT_ACCOUNT,
  formatSettlementDetails,
} from "@/lib/settlement-account";

export default function BankDepositPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatSettlementDetails());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const details = [
    { label: "Bank Name", value: SETTLEMENT_ACCOUNT.bankName },
    { label: "Account Number", value: SETTLEMENT_ACCOUNT.accountNumber },
    {
      label: "Card (Visa/Mastercard)",
      value: SETTLEMENT_ACCOUNT.cardMasked,
    },
    { label: "Branch", value: SETTLEMENT_ACCOUNT.branch },
    { label: "SWIFT Code", value: SETTLEMENT_ACCOUNT.swiftCode },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bank Transfer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fund your wallet by transferring to our Equity Bank Kenya account.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          {details.map((item) => (
            <div key={item.label} className="flex justify-between gap-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {item.label}:
              </span>
              <span className="text-gray-800 dark:text-white text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={handleCopy}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          >
            {copied ? "✅ Copied!" : "Copy Account Details"}
          </button>
        </div>
      </div>

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
