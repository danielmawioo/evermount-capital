"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { useWallet } from "@/hooks/useWallet";
import WalletBalanceCards from "./WalletBalanceCards";
import WalletQuickActions from "./WalletQuickActions";
import WalletRecentTransactions from "./WalletRecentTransactions";

export default function WalletsPage() {
  const { balance, transactions, loading, transactionsLoading } = useWallet();

  if (loading) {
    return (
      <TranslateTree>
        <div className="space-y-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </TranslateTree>
    );
  }

  return (
    <TranslateTree>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Wallet & Escrow
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Manage your wallet balance, deposits, withdrawals, and transfer
            funds to investments.
          </p>
        </div>

        <WalletBalanceCards balance={balance} />
        <WalletQuickActions />
        <WalletRecentTransactions
          transactions={transactions}
          loading={transactionsLoading}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            About Your Wallet
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2 list-disc list-inside">
            <li>
              Your wallet acts as an escrow account where you can safely store
              funds before investing
            </li>
            <li>
              Deposits go directly to your wallet and are available for
              withdrawal or investment
            </li>
            <li>
              Withdrawn profits from investments are automatically added to your
              wallet balance
            </li>
            <li>
              You can transfer funds from your wallet to investments at any time
            </li>
            <li>
              All payment methods (card, bank, crypto) can be used for deposits
              and withdrawals
            </li>
          </ul>
        </div>
      </div>
    </TranslateTree>
  );
}
