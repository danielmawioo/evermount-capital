"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import StatCard from "../components/StatCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import ActivityFeed from "../components/ActivityFeed";
import TimeTabs from "../components/TimeTabs";
import PortfolioFilter from "../components/PortfolioFilter";
import ExportButtons from "../components/ExportButtons";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect unauthenticated users
    }
  }, [router]);

  return (
    <main className="p-6 md:p-8 space-y-10 bg-[#f9fafb] dark:bg-[#0f1117] min-h-screen">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Good morning ☀️
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lets grow your portfolio today 🚀
        </p>
      </section>

      {/* Call to Actions (Deposit, Withdraw, Invest) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/dashboard/wallets">
          <div className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-4 rounded-lg flex items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer">
            ➕ Deposit
          </div>
        </Link>
        <Link href="/dashboard/withdraw">
          <div className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold py-4 rounded-lg flex items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer">
            ➖ Withdraw
          </div>
        </Link>
        <Link href="/dashboard/invest">
          <div className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-4 rounded-lg flex items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer">
            📈 Invest
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
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value="$68,250"
          growth="+2.3%"
        />
        <StatCard title="Monthly Growth" value="$3,200" growth="+5.1%" />
        <StatCard title="Active Strategies" value="8" growth="Stable" />
        <StatCard title="Risk Exposure" value="Moderate" growth="-1.2%" />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        {/* Portfolio Value Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📈 Portfolio Value Over Time
          </h3>
          <LineChart />
        </div>

        {/* Investment Distribution Pie Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🧩 Investment Distribution
          </h3>
          <PieChart />
        </div>
      </section>

      {/* Bar Chart & Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Bar Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📊 Yearly Performance by Type
          </h3>
          <BarChart />
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🕒 Recent Activity
          </h3>
          <ActivityFeed />
        </div>
      </section>
    </main>
  );
}
