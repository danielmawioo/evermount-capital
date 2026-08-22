"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { useInvestor } from "@/hooks/useInvestor";
import InvestorQuickActions from "./components/InvestorQuickActions";
import TradingMetricsGrid from "./components/TradingMetricsGrid";
import EquityCurveChart from "./components/EquityCurveChart";
import RecentActivityList from "./components/RecentActivityList";

interface WalletBalance {
  availableBalance: number;
  investedBalance: number;
  totalBalance: number;
  currency: string;
}

interface PerformanceData {
  equityCurve: { date: string; equity: number }[];
  metrics: {
    gainPercent: number;
    absGain: number;
    dailyPercent: number;
    monthlyPercent: number;
    maxDrawdown: number;
    volatility: number;
    sharpeRatio: number | null;
    balance: number;
    equity: number;
  };
}

interface DashboardStats {
  recentActivity: {
    id: string;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { profile, tier, loading: profileLoading, kycApproved } = useInvestor();
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [recentActivity, setRecentActivity] = useState<DashboardStats["recentActivity"]>([]);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadDashboard(period);
  }, [router, period]);

  const loadDashboard = async (selectedPeriod: string) => {
    try {
      const [walletRes, perfRes, statsRes] = await Promise.all([
        api.wallets.getBalance(),
        api.portfolio.getPerformance({ period: selectedPeriod }),
        api.dashboard.getStats(),
      ]);
      setWalletBalance(walletRes.data);
      setPerformance(perfRes.data);
      setRecentActivity(statsRes.data.recentActivity ?? []);
    } catch (error) {
      logger.error("Failed to load dashboard", error);
    }
  };

  const formatCurrency = (amount: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const currency = walletBalance?.currency ?? "USD";
  const displayBalance =
    performance?.metrics.balance ?? walletBalance?.totalBalance ?? 0;

  const metrics = performance?.metrics ?? {
    gainPercent: 0,
    absGain: 0,
    dailyPercent: 0,
    monthlyPercent: 0,
    maxDrawdown: 0,
    volatility: 0,
    sharpeRatio: null,
    balance: walletBalance?.totalBalance ?? 0,
    equity: walletBalance?.totalBalance ?? 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting()}
            {profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="inline-flex items-center rounded-full bg-[#00a76f]/10 text-[#00a76f] text-xs font-semibold px-3 py-1">
              {tier.label} Plan
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tier.strategies} · Min ${tier.minInvestment.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Account balance</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
            {formatCurrency(displayBalance, currency)}
          </p>
          {walletBalance && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatCurrency(walletBalance.availableBalance, currency)} available ·{" "}
              {formatCurrency(walletBalance.investedBalance, currency)} invested
            </p>
          )}
        </div>
      </section>

      {/* Quick actions */}
      {!profileLoading && (
        <InvestorQuickActions tier={tier} kycApproved={kycApproved} />
      )}

      {/* Period selector */}
      <div className="flex gap-2">
        {[
          { label: "7D", value: "7d" },
          { label: "30D", value: "30d" },
          { label: "90D", value: "90d" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPeriod(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              period === tab.value
                ? "bg-[#00a76f] text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#00a76f]/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trading metrics — MyFxBook style */}
      <TradingMetricsGrid metrics={metrics} currency={currency} />

      {/* Equity curve */}
      <div className="bg-white dark:bg-[#161a23] rounded-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              Equity Curve
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Portfolio value over time
            </p>
          </div>
          <Link
            href="/dashboard/portfolio"
            className="text-sm text-[#00a76f] hover:underline font-medium"
          >
            View portfolio
          </Link>
        </div>
        <EquityCurveChart
          data={performance?.equityCurve ?? []}
          currency={currency}
        />
      </div>

      {/* Recent activity */}
      <div className="bg-white dark:bg-[#161a23] rounded-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Recent Activity
          </h3>
          <Link
            href="/dashboard/transactions"
            className="text-sm text-[#00a76f] hover:underline font-medium"
          >
            View all
          </Link>
        </div>
        <RecentActivityList items={recentActivity} />
      </div>
    </div>
  );
}
