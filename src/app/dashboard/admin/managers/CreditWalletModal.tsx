"use client";

import type { FormEvent } from "react";
import type { ManagerClient } from "@/hooks/useAdminManagers";

type Props = {
  client: ManagerClient;
  amount: string;
  setAmount: (value: string) => void;
  crediting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
};

export default function CreditWalletModal({
  client,
  amount,
  setAmount,
  crediting,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
          Credit wallet
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {client.fullName} ({client.email})
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="number"
            min={1}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (USD)"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={crediting}
              className="flex-1 px-4 py-2 bg-[#00a76f] text-white rounded-lg font-semibold disabled:opacity-60"
            >
              {crediting ? "Crediting…" : "Credit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
