"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { PositiveAmountSchema } from "@/lib/schemas";
import KycRequiredGate from "@/components/KycRequiredGate";

export default function WithdrawCryptoPage() {
  const router = useRouter();
  const [cryptoType, setCryptoType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cryptoType || !walletAddress || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    const parsed = PositiveAmountSchema.safeParse(parseFloat(amount));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please enter a valid amount");
      return;
    }
    const numAmount = parsed.data;

    setLoading(true);
    try {
      // Map crypto type to currency code
      const currencyMap: { [key: string]: string } = {
        Bitcoin: "BTC",
        Ethereum: "ETH",
        USDT: "USDT",
      };
      
      const currency = currencyMap[cryptoType] || cryptoType;
      
      await api.withdrawals.crypto({
        amount: numAmount,
        currency,
        walletAddress,
        network: cryptoType.toLowerCase(),
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

  return (
    <KycRequiredGate action="withdraw funds">
    <main className="min-h-screen flex flex-col px-6 md:px-10 py-8 bg-[#f9fafb] dark:bg-[#0f1117]">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Withdraw to Crypto
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Withdraw funds from your wallet to your crypto wallet. Only available wallet balance can be withdrawn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#161a23] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8"
        >
          {/* Select Crypto */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Cryptocurrency
            </label>
            <select
              value={cryptoType}
              onChange={(e) => setCryptoType(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
            >
              <option value="">Select Cryptocurrency</option>
              <option value="Bitcoin">Bitcoin (BTC)</option>
              <option value="Ethereum">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>

          {/* Wallet Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="Paste your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          {/* Amount */}
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
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 dark:text-white bg-white dark:bg-[#161a23] text-sm focus:ring-[#00a76f] focus:outline-none"
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
            {loading ? "Processing..." : "Withdraw to Crypto"}
          </button>
        </form>
      </div>
    </main>
    </KycRequiredGate>
  );
}
