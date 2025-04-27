"use client";

import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";

export default function WithdrawCardPage() {
  const [cards] = useState([
    { id: 1, cardType: "Visa", cardNumber: "**** 1234" },
    { id: 2, cardType: "Mastercard", cardNumber: "**** 5678" },
  ]);

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCardId || !amount) {
      alert("Please select a card and enter an amount.");
      return;
    }
    console.log("Withdraw", amount, "to card id", selectedCardId);
    alert(`Withdrawal of $${amount} initiated to your card! 🚀`);
    setSelectedCardId(null);
    setAmount("");
  };

  return (
    <main className="min-h-screen flex flex-col p-6 md:p-10 bg-[#f9fafb] dark:bg-[#0f1117]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Withdraw to Card
      </h1>

      {/* Form */}
      <form
        className="bg-white dark:bg-[#161a23] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 max-w-2xl space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Card Selection */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Select Card
          </p>
          <div className="grid grid-cols-1 gap-4">
            {cards.map((card) => (
              <label
                key={card.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedCardId === card.id
                    ? "border-[#00a76f] bg-[#f2fdf9] dark:bg-[#1c1f2b]"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="card"
                  checked={selectedCardId === card.id}
                  onChange={() => setSelectedCardId(card.id)}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-[#00a76f] w-6 h-6" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {card.cardType}
                    </p>
                    <p className="text-xs text-gray-500">{card.cardNumber}</p>
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
          Withdraw to Card
        </button>
      </form>
    </main>
  );
}
