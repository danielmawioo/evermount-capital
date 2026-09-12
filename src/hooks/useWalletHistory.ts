import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

export type WalletHistoryTransaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  createdAt: string;
  metadata?: {
    method?: string;
    reference?: string;
    investmentId?: string;
  };
};

export type WalletHistoryFilters = {
  type: string;
  status: string;
  startDate: string;
  endDate: string;
};

const EMPTY_FILTERS: WalletHistoryFilters = {
  type: "",
  status: "",
  startDate: "",
  endDate: "",
};

export function useWalletHistory() {
  const [transactions, setTransactions] = useState<WalletHistoryTransaction[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<WalletHistoryFilters>(EMPTY_FILTERS);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page: pagination.page,
        limit: pagination.limit,
      };
      if (filters.type) params.type = filters.type;
      if (filters.status) params.status = filters.status;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const { data } = await api.wallets.getHistory(params);
      setTransactions(data.transactions || []);
      setPagination((prev) => ({
        ...prev,
        total: data.total || 0,
      }));
    } catch (error: unknown) {
      logger.error("Failed to fetch wallet transaction history", error);
      toast.error(
        getApiErrorMessage(error, "Failed to load transaction history"),
      );
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  const handleFilterChange = (
    key: keyof WalletHistoryFilters,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const goToPreviousPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  };

  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const hasActiveFilters = Boolean(
    filters.type || filters.status || filters.startDate || filters.endDate,
  );

  return {
    transactions,
    loading,
    filters,
    pagination,
    hasActiveFilters,
    handleFilterChange,
    clearFilters,
    goToPreviousPage,
    goToNextPage,
  };
}
