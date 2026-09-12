const STATUS_BADGE_CLASS: Record<string, string> = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  success:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  processing:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const DEFAULT_BADGE_CLASS =
  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";

const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  investment: "Investment",
  "profit-withdrawal": "Profit Withdrawal",
  "transfer-to-investment": "Transferred to Investment",
  dividend: "Dividend",
  fee: "Fee",
};

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  options?: { maximumFractionDigits?: number },
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: options?.maximumFractionDigits === 0 ? 0 : 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(amount);
}

export function getStatusBadgeClass(status: string): string {
  return STATUS_BADGE_CLASS[status.toLowerCase()] ?? DEFAULT_BADGE_CLASS;
}

export function formatStatusLabel(status: string): string {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getTransactionTypeLabel(type: string): string {
  return (
    TRANSACTION_TYPE_LABELS[type] ??
    type.charAt(0).toUpperCase() + type.slice(1)
  );
}

export function getTransactionIcon(type: string): string {
  if (
    type === "deposit" ||
    type === "dividend" ||
    type === "profit-withdrawal"
  ) {
    return "↓";
  }
  if (
    type === "withdrawal" ||
    type === "investment" ||
    type === "transfer-to-investment"
  ) {
    return "↑";
  }
  return "•";
}

export function isCreditTransaction(type: string): boolean {
  return (
    type === "deposit" || type === "dividend" || type === "profit-withdrawal"
  );
}

export function formatPct(n: number, digits = 2): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}
