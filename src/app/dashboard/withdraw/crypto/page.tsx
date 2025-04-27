"use client";

import { useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

export default function WithdrawCryptoPage() {
  const [cryptoOptions] = useState([
    { id: 1, name: "Bitcoin", symbol: "BTC" },
    { id: 2, name: "Ethereum", symbol: "ETH" },
  ]);

  const [selectedCryptoId, setSelectedCryptoId] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCryptoId || !walletAddress || !amount) {
      alert("Please fill all fields.");
      return;
    }
    console.log(
      "Withdraw",
      amount,
      "to",
      cryptoOptions.find((c) => c.id === selectedCryptoId)?.name,
      "address",
      walletAddress
    );
    alert(`Crypto withdrawal of $${amount} initiated! 🚀`);
    setSelectedCryptoId(null);
    setWalletAddress("");
    setAmount("");
  };

  return (
    <main className="min-h-screen flex flex-col p-6 md:p-10 bg-[#f9fafb] dark:bg-[#0f1117]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Withdraw to Crypto Wallet
      </h1>

      {/* Form */}
      <form
        className="bg-white dark:bg-[#161a23] p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-800 max-w-2xl space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Crypto Selection */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Select Cryptocurrency
          </p>
          <div className="grid grid-cols-1 gap-4">
            {cryptoOptions.map((crypto) => (
              <label
                key={crypto.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  selectedCryptoId === crypto.id
                    ? "border-[#00a76f] bg-[#f2fdf9] dark:bg-[#1c1f2b]"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="crypto"
                  checked={selectedCryptoId === crypto.id}
                  onChange={() => setSelectedCryptoId(crypto.id)}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  {crypto.symbol === "BTC" ? (
                    <FaBitcoin className="text-[#f7931a] w-6 h-6" />
                  ) : (
                    <FaEthereum className="text-[#3c3c3d] w-6 h-6" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {crypto.name}
                    </p>
                    <p className="text-xs text-gray-500">{crypto.symbol}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Wallet Address */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Wallet Address
          </label>
          <input
            type="text"
            placeholder="Enter your wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
            className="w-full mt-2 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none text-sm"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Amount (USD Equivalent)
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
          Withdraw Crypto
        </button>
      </form>
    </main>
  );
}
