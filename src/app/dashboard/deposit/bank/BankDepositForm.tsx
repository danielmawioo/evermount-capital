"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import { FaPlus, FaUniversity } from "react-icons/fa";
import type { BankAccount, SettlementAccount } from "@/hooks/useBankDeposit";

type NewAccount = {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  routingNumber: string;
};

type Props = {
  displayDetails: SettlementAccount | null;
  copied: boolean;
  onCopy: () => void;
  showAddForm: boolean;
  setShowAddForm: (value: boolean) => void;
  newAccount: NewAccount;
  setNewAccount: Dispatch<SetStateAction<NewAccount>>;
  addingAccount: boolean;
  onAddAccount: () => void;
  bankAccounts: BankAccount[];
  selectedBankId: string | null;
  setSelectedBankId: (id: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  wireReference: string;
  setWireReference: (value: string) => void;
  loading: boolean;
  onSubmit: (event: FormEvent) => void;
};

export default function BankDepositForm({
  displayDetails,
  copied,
  onCopy,
  showAddForm,
  setShowAddForm,
  newAccount,
  setNewAccount,
  addingAccount,
  onAddAccount,
  bankAccounts,
  selectedBankId,
  setSelectedBankId,
  amount,
  setAmount,
  wireReference,
  setWireReference,
  loading,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6"
    >
      {displayDetails ? (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-2 text-sm">
          <p className="font-medium text-gray-800 dark:text-white">
            Settlement account
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {displayDetails.bankName} · {displayDetails.accountNumber}
          </p>
          <button
            type="button"
            onClick={onCopy}
            className="text-[#00a76f] text-xs hover:underline"
          >
            {copied ? "Copied!" : "Copy details"}
          </button>
        </div>
      ) : null}

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

        {showAddForm ? (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
            <input
              placeholder="Bank name"
              value={newAccount.bankName}
              onChange={(e) =>
                setNewAccount({ ...newAccount, bankName: e.target.value })
              }
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
            />
            <input
              placeholder="Account holder name"
              value={newAccount.accountHolder}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  accountHolder: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
            />
            <input
              placeholder="Account number"
              value={newAccount.accountNumber}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  accountNumber: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23]"
            />
            <button
              type="button"
              disabled={addingAccount}
              onClick={onAddAccount}
              className="w-full py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-md text-sm"
            >
              {addingAccount ? "Saving..." : "Save bank account"}
            </button>
          </div>
        ) : null}

        {bankAccounts.length === 0 ? (
          <p className="text-sm text-gray-500">
            Add your bank account to continue.
          </p>
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
  );
}
