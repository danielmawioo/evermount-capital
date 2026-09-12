"use client";

import Link from "next/link";
import type { DepositResult, SettlementAccount } from "@/hooks/useBankDeposit";

type Props = {
  depositResult: DepositResult;
  displayDetails: SettlementAccount | null;
  copied: boolean;
  onCopy: () => void;
};

export default function BankDepositSuccess({
  depositResult,
  displayDetails,
  copied,
  onCopy,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-green-200 dark:border-green-800 shadow-md max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <p className="text-green-600 dark:text-green-400 font-semibold">
          Deposit initiated
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Reference:{" "}
          <span className="font-mono">{depositResult.reference}</span>
        </p>
        <p className="text-sm text-gray-500">
          Status: {depositResult.status} · $
          {Number(depositResult.amount).toFixed(2)}
        </p>
      </div>
      {displayDetails ? (
        <div className="space-y-3 text-sm">
          {(
            [
              ["Bank Name", displayDetails.bankName],
              ["Account Number", displayDetails.accountNumber],
              ["Branch", displayDetails.branch],
              ["SWIFT Code", displayDetails.swiftCode],
            ] as const
          )
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {label}:
                </span>
                <span className="text-gray-900 dark:text-white text-right">
                  {value}
                </span>
              </div>
            ))}
        </div>
      ) : null}
      <button
        type="button"
        onClick={onCopy}
        className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {copied ? "Copied!" : "Copy Settlement Details"}
      </button>
      <Link
        href="/dashboard/wallets"
        className="block text-center text-sm text-[#00a76f] hover:underline"
      >
        View wallet
      </Link>
    </div>
  );
}
