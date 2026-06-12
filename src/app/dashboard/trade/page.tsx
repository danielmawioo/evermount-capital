"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { api } from "@/lib/api-client";
import { useInvestor } from "@/hooks/useInvestor";
import TradePreviewCard, { TradePreview } from "./components/TradePreviewCard";

type Step = "amount" | "preview" | "confirm";

const LOCK_IN_OPTIONS = [
  { label: "6 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "24 months", value: 24 },
];

export default function TradePage() {
  const router = useRouter();
  const { tier, kycApproved, loading: profileLoading } = useInvestor();

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [lockInMonths, setLockInMonths] = useState(6);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [preview, setPreview] = useState<TradePreview | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.wallets.getBalance(), api.investments.getPreferences()])
      .then(([walletRes, prefsRes]) => {
        setAvailableBalance(walletRes.data.availableBalance ?? 0);
        setLockInMonths(prefsRes.data.lockInMonths ?? 6);
      })
      .catch(() => toast.error("Failed to load trade data"))
      .finally(() => setPageLoading(false));
  }, []);

  const parsedAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const minInvestment = tier.minInvestment;

  const formatUsd = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  const formatLockInDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handlePreview = async () => {
    if (parsedAmount < minInvestment) {
      toast.error(`Minimum investment is ${formatUsd(minInvestment)}`);
      return;
    }
    if (parsedAmount > availableBalance) {
      toast.error("Insufficient wallet balance");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.investments.previewTrade({
        amount: parsedAmount,
        lockInMonths,
      });
      setPreview(data);
      setStep("preview");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Could not find a matching strategy"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview || !acknowledged) return;

    setLoading(true);
    try {
      await api.investments.executeTrade({
        amount: parsedAmount,
        lockInMonths,
      });
      toast.success("Trade executed successfully");
      router.push("/dashboard/portfolio?traded=1");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Trade failed");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading || pageLoading) {
    return (
      <div className="max-w-lg mx-auto py-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!kycApproved) {
    return (
      <div className="max-w-lg mx-auto space-y-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trade
        </h1>
        <Link
          href="/dashboard/kyc"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-semibold py-4 px-4"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Complete verification to start trading
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trade
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Enter an amount — we match you to the best strategy for your plan.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {(["amount", "preview", "confirm"] as Step[]).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${
              step === s ||
              (step === "confirm" && s !== "amount") ||
              (step === "preview" && s === "amount")
                ? "bg-[#00a76f]"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            aria-hidden
          />
        ))}
      </div>

      {step === "amount" && (
        <div className="space-y-5 bg-white dark:bg-[#161a23] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Available balance
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
              {formatUsd(availableBalance)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Investment amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                min={minInvestment}
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={minInvestment.toLocaleString()}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum for your {tier.label} plan: {formatUsd(minInvestment)}
            </p>
            {parsedAmount > availableBalance && parsedAmount > 0 && (
              <p className="text-xs text-red-500 mt-1">
                Insufficient balance.{" "}
                <Link href="/dashboard/deposit" className="underline">
                  Deposit funds
                </Link>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lock-in period
            </label>
            <div className="grid grid-cols-3 gap-2">
              {LOCK_IN_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLockInMonths(opt.value)}
                  className={`py-2 px-2 rounded-lg text-sm font-medium border transition ${
                    lockInMonths === opt.value
                      ? "bg-[#00a76f] text-white border-[#00a76f]"
                      : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#00a76f]/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Capital stays invested for this period. Early withdrawal may not be available.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePreview}
            disabled={loading || parsedAmount <= 0}
            className="w-full flex items-center justify-center gap-2 bg-[#00a76f] text-white py-3 rounded-lg font-semibold hover:bg-[#008f5d] transition disabled:opacity-50"
          >
            {loading ? "Finding match..." : "Continue"}
            {!loading && <ArrowRightIcon className="w-4 h-4" />}
          </button>
        </div>
      )}

      {step === "preview" && preview && (
        <div className="space-y-4">
          <TradePreviewCard preview={preview} tierLabel={tier.label} />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("amount")}
              className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep("confirm")}
              className="flex-1 flex items-center justify-center gap-1 bg-[#00a76f] text-white py-2.5 rounded-lg font-semibold hover:bg-[#008f5d]"
            >
              Review & confirm
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === "confirm" && preview && (
        <div className="space-y-4">
          <TradePreviewCard preview={preview} tierLabel={tier.label} />

          <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161a23] cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-[#00a76f] focus:ring-[#00a76f]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I understand my capital of {formatUsd(parsedAmount)} is locked until{" "}
              <strong>{formatLockInDate(preview.lockInEndsAt)}</strong> and I have
              read the allocation summary above.
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep("preview")}
              className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading || !acknowledged}
              className="flex-1 bg-[#00a76f] text-white py-3 rounded-lg font-semibold hover:bg-[#008f5d] disabled:opacity-50"
            >
              {loading ? "Processing..." : "Start trading"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
