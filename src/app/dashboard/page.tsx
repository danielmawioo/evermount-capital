"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SunIcon,
  RocketLaunchIcon,
  PlusIcon,
  MinusIcon,
  ChartBarIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../components/StatCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import ActivityFeed from "../components/ActivityFeed";
import TimeTabs from "../components/TimeTabs";
import PortfolioFilter from "../components/PortfolioFilter";
import ExportButtons from "../components/ExportButtons";
import Link from "next/link";
import { api } from "@/lib/api-client";

export default function DashboardPage() {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState<{
    availableBalance: number;
    investedBalance: number;
    totalBalance: number;
    currency: string;
  } | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect unauthenticated users
    } else {
      fetchWalletBalance();
    }
  }, [router]);

  const fetchWalletBalance = async () => {
    try {
      const { data } = await api.wallets.getBalance();
      setWalletBalance(data);
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10 bg-[#f9fafb] dark:bg-[#0f1117] min-h-screen">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          Good morning
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
          <RocketLaunchIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#00a76f]" />
          Let's grow your portfolio today
        </p>
      </section>

      {/* Call to Actions (Deposit, Withdraw, Invest) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Link href="/dashboard/wallets">
          <div className="bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 font-semibold py-3 sm:py-4 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 text-center transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Deposit</span>
          </div>
        </Link>
        <Link href="/dashboard/withdraw">
          <div className="bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-orange-800 dark:text-orange-300 font-semibold py-3 sm:py-4 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 text-center transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md">
            <MinusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Withdraw</span>
          </div>
        </Link>
        <Link href="/dashboard/invest">
          <div className="bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-semibold py-3 sm:py-4 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 text-center transition-all hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md">
            <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Invest</span>
          </div>
        </Link>
      </section>

      {/* Filters + Export */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <TimeTabs />
          <PortfolioFilter />
        </div>
        <ExportButtons />
      </section>

      {/* Stat Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Wallet Balance"
          value={walletBalance ? formatCurrency(walletBalance.availableBalance, walletBalance.currency) : "$0.00"}
          growth="Available"
        />
        <StatCard
          title="Total Portfolio Value"
          value={walletBalance ? formatCurrency(walletBalance.totalBalance, walletBalance.currency) : "$0.00"}
          growth="+2.3%"
        />
        <StatCard
          title="Invested Balance"
          value={walletBalance ? formatCurrency(walletBalance.investedBalance, walletBalance.currency) : "$0.00"}
          growth="Active"
        />
        <StatCard title="Active Strategies" value="8" growth="Stable" />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 sm:gap-6">
        {/* Portfolio Value Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
            Portfolio Value Over Time
          </h3>
          <LineChart />
        </div>

        {/* Investment Distribution Pie Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
            Investment Distribution
          </h3>
          <PieChart />
        </div>
      </section>

      {/* Bar Chart & Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Yearly Bar Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
            Yearly Performance by Type
          </h3>
          <BarChart />
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
            Recent Activity
          </h3>
          <ActivityFeed />
        </div>
      </section>
    </main>
  );
}
