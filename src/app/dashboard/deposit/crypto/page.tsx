"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { PositiveAmountSchema } from "@/lib/schemas";

interface CryptoDepositData {
  depositAddress?: string;
  qrCode?: string;
}

export default function CryptoDepositPage() {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BTC");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [depositData, setDepositData] = useState<CryptoDepositData | null>(
    null,
  );

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const { data } = await api.deposits.crypto({
        amount: numAmount,
        currency,
        walletAddress: walletAddress || "user_wallet", // This should come from user's wallet
      });
      setDepositData(data);
      setWalletAddress(data.depositAddress || "");
      toast.success("Deposit address generated");
    } catch (error: unknown) {
      logger.error("Crypto deposit creation failed", error);
      toast.error(getApiErrorMessage(error, "Failed to create deposit"));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!walletAddress) {
      toast.error("Please create a deposit first");
      return;
    }
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Wallet address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TranslateTree>
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Crypto Deposit
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Deposit funds to your wallet using supported cryptocurrencies. Funds
          will be available in your wallet after confirmation.
        </p>
      </div>

      {/* Deposit Form */}
      {!depositData ? (
        <form
          onSubmit={handleCreateDeposit}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cryptocurrency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount ({currency})
            </label>
            <input
              type="number"
              step="0.00000001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Generating Address..." : "Generate Deposit Address"}
          </button>
        </form>
      ) : (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md max-w-lg mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                {currency} Wallet Address
              </p>
              <p className="text-sm text-gray-800 dark:text-white break-all text-center font-mono">
                {walletAddress}
              </p>
              {depositData.qrCode &&
                !depositData.qrCode.includes("placeholder") && (
                  <Image
                    src={depositData.qrCode}
                    alt="QR Code"
                    width={192}
                    height={192}
                    unoptimized
                    className="mt-4 w-48 h-48"
                  />
                )}
              {depositData.qrCode?.includes("placeholder") && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  QR code unavailable in local dev — use the address above.
                </p>
              )}
            </div>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              Send{" "}
              <span className="font-semibold">
                {amount} {currency}
              </span>{" "}
              to this address. Transaction will be confirmed after network
              verification.
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          >
            {copied ? "✅ Wallet Copied!" : "Copy Wallet Address"}
          </button>
        </div>
      )}

      {/* Back Link */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/dashboard/deposit"
          className="inline-flex items-center gap-1 hover:underline"
        >
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
      </TranslateTree>
  );
}
