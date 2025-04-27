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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBankId || !amount) {
      alert("Please select a bank and enter an amount.");
      return;
    }
    // You would send withdrawal request to your API here!
    console.log("Withdraw", amount, "to bank id", selectedBankId);
    alert(`Withdrawal of $${amount} initiated successfully! 🚀`);
    setSelectedBankId(null);
    setAmount("");
  };

  return (
    <main className="min-h-screen flex flex-col p-6 md:p-10 bg-[#f9fafb] dark:bg-[#0f1117]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Withdraw to Bank
      </h1>

      {/* Form */}
      <form
        className="bg-white dark:bg-[#161a23] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 max-w-2xl space-y-6"
        onSubmit={handleSubmit}
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
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedBankId === bank.id
                    ? "border-[#00a76f] bg-[#f2fdf9] dark:bg-[#1c1f2b]"
                    : "border-gray-200 dark:border-gray-800"
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
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {bank.bankName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {bank.accountNumber}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Amount ($)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            className="w-full mt-2 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition"
        >
          Withdraw Funds
        </button>
      </form>
    </main>
  );
}
