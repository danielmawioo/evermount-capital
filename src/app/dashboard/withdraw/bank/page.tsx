"use client";

import { useState } from "react";
import { FaUniversity } from "react-icons/fa";

export default function WithdrawBankPage() {
  const [bankAccounts] = useState([
    { id: 1, bankName: "Chase Bank", accountNumber: "****5678" },
    { id: 2, bankName: "Bank of America", accountNumber: "****1234" },
  ]);
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBankId || !amount) {
      alert("Please select a bank and enter an amount.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log("Withdraw", amount, "to bank id", selectedBankId);
      alert(`Withdrawal of $${amount} initiated successfully! 🚀`);
      setSelectedBankId(null);
      setAmount("");
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 py-8 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Withdraw to Bank
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose your bank and input the amount you want to withdraw securely.
          </p>
        </div>

        {/* Withdraw Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#161a23] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8"
        >
          {/* Bank Selection */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select Bank Account
            </p>

            <div className="grid grid-cols-1 gap-4">
              {bankAccounts.map((bank) => (
                <label
                  key={bank.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                    selectedBankId === bank.id
                      ? "border-[#00a76f] bg-[#f2fdf9] dark:bg-[#1c1f2b]"
                      : "border-gray-200 dark:border-gray-800 hover:border-[#00a76f]"
                  }`}
                >
                  <input
                    type="radio"
                    name="bank"
                    checked={selectedBankId === bank.id}
                    onChange={() => setSelectedBankId(bank.id)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <FaUniversity className="text-[#00a76f] w-6 h-6" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {bank.bankName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {bank.accountNumber}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount Input */}
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
              required
              className="w-full mt-1 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#161a23] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-[#8cd9c0] text-white cursor-not-allowed"
                : "bg-[#00a76f] hover:bg-emerald-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Withdraw Funds"}
          </button>
        </form>
      </div>
    </main>
  );
}
