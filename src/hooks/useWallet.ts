import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

export type WalletBalance = {
  totalBalance: number;
  availableBalance: number;
  pendingBalance: number;
  investedBalance: number;
  currency: string;
};

export type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  createdAt: string;
};

const EMPTY_BALANCE: WalletBalance = {
  totalBalance: 0,
  availableBalance: 0,
  pendingBalance: 0,
  investedBalance: 0,
  currency: "USD",
};

export function useWallet() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data } = await api.wallets.getBalance();
        setBalance(data);
      } catch (error: unknown) {
        logger.error("Failed to fetch wallet balance", error);
        setBalance(EMPTY_BALANCE);
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      setTransactionsLoading(true);
      try {
        const { data } = await api.wallets.getHistory({ limit: 10 });
        setTransactions(data.transactions || []);
      } catch (error: unknown) {
        logger.error("Failed to fetch wallet transactions", error);
        toast.error(
          getApiErrorMessage(error, "Failed to load transaction history"),
        );
      } finally {
        setTransactionsLoading(false);
      }
    };

    void fetchBalance();
    void fetchTransactions();
  }, []);

  return { balance, transactions, loading, transactionsLoading };
}
