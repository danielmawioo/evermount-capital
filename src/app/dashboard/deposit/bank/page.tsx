"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPlus, FaUniversity } from "react-icons/fa";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";

interface SettlementAccount {
  bankName: string;
  accountNumber: string;
  branch?: string;
  swiftCode?: string;
  country?: string;
  cardMasked?: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  isDefault: boolean;
}

interface DepositResult {
  depositId: string;
  reference: string;
  amount: number;
  status: string;
  bankDetails: SettlementAccount;
}

export default function BankDepositPage() {
  const [settlement, setSettlement] = useState<SettlementAccount | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [wireReference, setWireReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [copied, setCopied] = useState(false);
  const [depositResult, setDepositResult] = useState<DepositResult | null>(null);
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
    } catch {
      toast.error("Failed to load bank deposit details");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatSettlementText = (details: SettlementAccount) =>
    [
      `Bank: ${details.bankName}`,
      `Account: ${details.accountNumber}`,
      details.branch ? `Branch: ${details.branch}` : null,
      details.swiftCode ? `SWIFT: ${details.swiftCode}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const handleCopy = () => {
    const details = depositResult?.bankDetails ?? settlement;
    if (!details) return;
    navigator.clipboard.writeText(formatSettlementText(details));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setNewAccount({ bankName: "", accountHolder: "", accountNumber: "", routingNumber: "" });
      setShowAddForm(false);
      await loadData();
      if (data.account?.id) setSelectedBankId(data.account.id);
    } catch (error: unknown) {
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
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.deposits.bank({
        amount: numAmount,
        currency: "USD",
        bankAccountId: selectedBankId,
        reference: wireReference.trim() || undefined,
      });
      setDepositResult(data);
      toast.success("Bank deposit initiated — transfer funds using the details below");
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to initiate bank deposit"));
    } finally {
      setLoading(false);
    }
  };

  const displayDetails = depositResult?.bankDetails ?? settlement;

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00a76f]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Bank Transfer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Initiate a bank deposit, then wire funds to our settlement account.
        </p>
      </div>

      {depositResult ? (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-green-200 dark:border-green-800 shadow-md max-w-lg mx-auto space-y-6">
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Deposit initiated
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Reference: <span className="font-mono">{depositResult.reference}</span>
            </p>
            <p className="text-sm text-gray-500">
              Status: {depositResult.status} · ${Number(depositResult.amount).toFixed(2)}
            </p>
          </div>
          {displayDetails && (
            <div className="space-y-3 text-sm">
              {[
                ["Bank Name", displayDetails.bankName],
                ["Account Number", displayDetails.accountNumber],
                ["Branch", displayDetails.branch],
                ["SWIFT Code", displayDetails.swiftCode],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      {label}:
                    </span>
                    <span className="text-gray-900 dark:text-white text-right">{value}</span>
                  </div>
                ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleCopy}
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
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6"
        >
          {displayDetails && (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-sm">
              <p className="font-medium text-gray-800 dark:text-white">Settlement account</p>
              <p className="text-gray-600 dark:text-gray-400">
                {displayDetails.bankName} · {displayDetails.accountNumber}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[#00a76f] text-xs hover:underline"
              >
                {copied ? "Copied!" : "Copy details"}
              </button>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your source bank account
              </label>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-sm text-[#00a76f] flex items-center gap-1 hover:underline"
              >
                <FaPlus className="text-xs" /> Add account
              </button>
            </div>

            {showAddForm && (
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                <input
                  placeholder="Bank name"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
                />
                <input
                  placeholder="Account holder name"
                  value={newAccount.accountHolder}
                  onChange={(e) => setNewAccount({ ...newAccount, accountHolder: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
                />
                <input
                  placeholder="Account number"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
                />
                <button
                  type="button"
                  disabled={addingAccount}
                  onClick={handleAddAccount}
                  className="w-full py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md text-sm"
                >
                  {addingAccount ? "Saving..." : "Save bank account"}
                </button>
              </div>
            )}

            {bankAccounts.length === 0 ? (
              <p className="text-sm text-gray-500">Add your bank account to continue.</p>
            ) : (
              bankAccounts.map((bank) => (
                <label
                  key={bank.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                    selectedBankId === bank.id
                      ? "border-[#00a76f] bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="sourceBank"
                    checked={selectedBankId === bank.id}
                    onChange={() => setSelectedBankId(bank.id)}
                    className="accent-[#00a76f]"
                  />
                  <FaUniversity className="text-[#00a76f]" />
                  <div className="text-sm">
                    <p className="font-medium">{bank.bankName}</p>
                    <p className="text-gray-500">
                      {bank.accountHolder} · {bank.accountNumber}
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Amount (USD)
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Wire reference (optional)
            </label>
            <input
              type="text"
              placeholder="Your bank transfer reference"
              value={wireReference}
              onChange={(e) => setWireReference(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !selectedBankId}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Initiate Bank Deposit"}
          </button>
        </form>
      )}

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/deposit" className="hover:underline">
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
  );
}
