"use client";

import TranslateTree from "@/app/components/TranslateTree";
import Link from "next/link";
import { useBankDeposit } from "@/hooks/useBankDeposit";
import BankDepositSuccess from "./BankDepositSuccess";
import BankDepositForm from "./BankDepositForm";

export default function BankDepositPage() {
  const {
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
    displayDetails,
  } = useBankDeposit();

  if (loadingData) {
    return (
      <TranslateTree>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00a76f]" />
        </div>
      </TranslateTree>
    );
  }

  return (
    <TranslateTree>
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
          <BankDepositSuccess
            depositResult={depositResult}
            displayDetails={displayDetails}
            copied={copied}
            onCopy={handleCopy}
          />
        ) : (
          <BankDepositForm
            displayDetails={displayDetails}
            copied={copied}
            onCopy={handleCopy}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            newAccount={newAccount}
            setNewAccount={setNewAccount}
            addingAccount={addingAccount}
            onAddAccount={() => void handleAddAccount()}
            bankAccounts={bankAccounts}
            selectedBankId={selectedBankId}
            setSelectedBankId={setSelectedBankId}
            amount={amount}
            setAmount={setAmount}
            wireReference={wireReference}
            setWireReference={setWireReference}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/deposit" className="hover:underline">
            ← Back to Deposit Methods
          </Link>
        </div>
      </div>
    </TranslateTree>
  );
}
