import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { PositiveAmountSchema } from "@/lib/schemas";

export type SettlementAccount = {
  bankName: string;
  accountNumber: string;
  branch?: string;
  swiftCode?: string;
  country?: string;
  cardMasked?: string;
};

export type BankAccount = {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  isDefault: boolean;
};

export type DepositResult = {
  depositId: string;
  reference: string;
  amount: number;
  status: string;
  bankDetails: SettlementAccount;
};

export function formatSettlementText(details: SettlementAccount) {
  return [
    `Bank: ${details.bankName}`,
    `Account: ${details.accountNumber}`,
    details.branch ? `Branch: ${details.branch}` : null,
    details.swiftCode ? `SWIFT: ${details.swiftCode}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function useBankDeposit() {
  const [settlement, setSettlement] = useState<SettlementAccount | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [wireReference, setWireReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [copied, setCopied] = useState(false);
  const [depositResult, setDepositResult] = useState<DepositResult | null>(
    null,
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [addingAccount, setAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    routingNumber: "",
  });

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [settlementRes, accountsRes] = await Promise.all([
        api.deposits.getSettlementAccount(),
        api.users.bankAccounts.list(),
      ]);
      setSettlement(settlementRes.data);
      const accounts = accountsRes.data.accounts ?? [];
      setBankAccounts(accounts);
      const defaultAccount = accounts.find((a: BankAccount) => a.isDefault);
      setSelectedBankId(defaultAccount?.id ?? accounts[0]?.id ?? null);
      if (accounts.length === 0) setShowAddForm(true);
    } catch (error) {
      logger.error("Failed to load bank deposit details", error);
      toast.error("Failed to load bank deposit details");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCopy = () => {
    const details = depositResult?.bankDetails ?? settlement;
    if (!details) return;
    navigator.clipboard.writeText(formatSettlementText(details));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAccount = async () => {
    if (
      !newAccount.bankName.trim() ||
      !newAccount.accountHolder.trim() ||
      !newAccount.accountNumber.trim()
    ) {
      toast.error("Please fill in all required bank account fields");
      return;
    }
    setAddingAccount(true);
    try {
      const { data } = await api.users.bankAccounts.add({
        bankName: newAccount.bankName.trim(),
        accountHolder: newAccount.accountHolder.trim(),
        accountNumber: newAccount.accountNumber.trim(),
        routingNumber: newAccount.routingNumber.trim() || undefined,
        isDefault: bankAccounts.length === 0,
      });
      toast.success("Bank account added");
      setNewAccount({
        bankName: "",
        accountHolder: "",
        accountNumber: "",
        routingNumber: "",
      });
      setShowAddForm(false);
      await loadData();
      if (data.account?.id) setSelectedBankId(data.account.id);
    } catch (error: unknown) {
      logger.error("Failed to add bank account", error);
      toast.error(getApiErrorMessage(error, "Failed to add bank account"));
    } finally {
      setAddingAccount(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBankId) {
      toast.error("Add your source bank account first");
      return;
    }
    const parsed = PositiveAmountSchema.safeParse(parseFloat(amount));
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please enter a valid amount",
      );
      return;
    }
    const numAmount = parsed.data;

    setLoading(true);
    try {
      const { data } = await api.deposits.bank({
        amount: numAmount,
        currency: "USD",
        bankAccountId: selectedBankId,
        reference: wireReference.trim() || undefined,
      });
      setDepositResult(data);
      toast.success(
        "Bank deposit initiated — transfer funds using the details below",
      );
    } catch (error: unknown) {
      logger.error("Bank deposit failed", error);
      toast.error(getApiErrorMessage(error, "Failed to initiate bank deposit"));
    } finally {
      setLoading(false);
    }
  };

  return {
    settlement,
    bankAccounts,
    selectedBankId,
    setSelectedBankId,
    amount,
    setAmount,
    wireReference,
    setWireReference,
    loading,
    loadingData,
    copied,
    depositResult,
    showAddForm,
    setShowAddForm,
    addingAccount,
    newAccount,
    setNewAccount,
    handleCopy,
    handleAddAccount,
    handleSubmit,
    displayDetails: depositResult?.bankDetails ?? settlement,
  };
}
