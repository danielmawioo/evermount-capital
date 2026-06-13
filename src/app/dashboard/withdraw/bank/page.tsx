"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUniversity, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import KycRequiredGate from "@/components/KycRequiredGate";

interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  isDefault: boolean;
}

export default function WithdrawBankPage() {
  const router = useRouter();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addingAccount, setAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    routingNumber: "",
  });

  const loadAccounts = useCallback(async () => {
    setLoadingAccounts(true);
    try {
      const { data } = await api.users.bankAccounts.list();
      const accounts = data.accounts ?? [];
      setBankAccounts(accounts);
      const defaultAccount = accounts.find((a: BankAccount) => a.isDefault);
      setSelectedBankId(defaultAccount?.id ?? accounts[0]?.id ?? null);
      if (accounts.length === 0) {
        setShowAddForm(true);
      }
    } catch {
      toast.error("Failed to load bank accounts");
    } finally {
      setLoadingAccounts(false);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

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
      setNewAccount({
        bankName: "",
        accountHolder: "",
        accountNumber: "",
        routingNumber: "",
      });
      setShowAddForm(false);
      await loadAccounts();
      if (data.account?.id) {
        setSelectedBankId(data.account.id);
      }
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to add bank account"));
    } finally {
      setAddingAccount(false);
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (!confirm("Remove this bank account?")) return;
    try {
      await api.users.bankAccounts.remove(accountId);
      toast.success("Bank account removed");
      await loadAccounts();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Failed to remove bank account"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBankId || !amount) {
      toast.error("Please select a bank account and enter an amount.");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      await api.withdrawals.bank({
        amount: numAmount,
        currency: "USD",
        bankAccountId: selectedBankId,
        reason: "Personal withdrawal",
      });
      toast.success(
        "Withdrawal submitted. It will be processed after admin approval."
      );
      setTimeout(() => {
        router.push("/dashboard/wallets");
      }, 2000);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error, "Withdrawal failed"));
    } finally {
      setLoading(false);
    }
  };

  if (loadingAccounts) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00a76f]" />
      </div>
    );
  }

  return (
    <KycRequiredGate action="withdraw funds">
    <main className="min-h-screen flex flex-col px-6 md:px-10 py-8 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Withdraw to Bank
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Withdraw USD to your linked bank account. Requests are reviewed and
            approved by our team (typically within 2 business days).
          </p>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddAccount}
            className="bg-white dark:bg-[#161a23] p-6 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Add Bank Account
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bank name"
                value={newAccount.bankName}
                onChange={(e) =>
                  setNewAccount((f) => ({ ...f, bankName: e.target.value }))
                }
                required
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Account holder name"
                value={newAccount.accountHolder}
                onChange={(e) =>
                  setNewAccount((f) => ({
                    ...f,
                    accountHolder: e.target.value,
                  }))
                }
                required
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Account number"
                value={newAccount.accountNumber}
                onChange={(e) =>
                  setNewAccount((f) => ({
                    ...f,
                    accountNumber: e.target.value,
                  }))
                }
                required
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Routing number (optional)"
                value={newAccount.routingNumber}
                onChange={(e) =>
                  setNewAccount((f) => ({
                    ...f,
                    routingNumber: e.target.value,
                  }))
                }
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={addingAccount}
                className="bg-[#00a76f] text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {addingAccount ? "Saving..." : "Save Account"}
              </button>
              {bankAccounts.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#161a23] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select Bank Account
              </label>
              {!showAddForm && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-1 text-sm text-[#00a76f] hover:underline"
                >
                  <FaPlus className="w-3 h-3" /> Add account
                </button>
              )}
            </div>

            {bankAccounts.length === 0 ? (
              <p className="text-sm text-gray-500">
                Add a bank account above to continue.
              </p>
            ) : (
              <div className="space-y-3">
                {bankAccounts.map((bank) => (
                  <label
                    key={bank.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                      selectedBankId === bank.id
                        ? "border-[#00a76f] bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bankAccount"
                      value={bank.id}
                      checked={selectedBankId === bank.id}
                      onChange={() => setSelectedBankId(bank.id)}
                      className="accent-[#00a76f]"
                    />
                    <FaUniversity className="text-[#00a76f] text-xl" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bank.bankName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {bank.accountHolder} · {bank.accountNumber}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAccount(bank.id);
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Amount (USD)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
              required
              disabled={bankAccounts.length === 0}
              className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              A $5.00 processing fee applies to bank withdrawals.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || bankAccounts.length === 0 || !selectedBankId}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading || bankAccounts.length === 0
                ? "bg-[#8cd9c0] text-white cursor-not-allowed"
                : "bg-[#00a76f] hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Withdrawal Request"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/withdraw" className="hover:underline">
            ← Back to Withdrawal Methods
          </Link>
        </div>
      </div>
    </main>
    </KycRequiredGate>
  );
}
