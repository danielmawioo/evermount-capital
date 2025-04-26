"use client";

import StatCard from "../components/StatCard";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import ActivityFeed from "../components/ActivityFeed";
import TimeTabs from "../components/TimeTabs";
import PortfolioFilter from "../components/PortfolioFilter";
import ExportButtons from "../components/ExportButtons";

export default function DashboardPage() {
  return (
    <main className="p-6 md:p-8 space-y-10 bg-[#f9fafb] dark:bg-[#0f1117] min-h-screen">
      {/* Filters + Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <TimeTabs />
          <PortfolioFilter />
        </div>
        <ExportButtons />
      </div>

      {/* Stat Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value="$68,250"
          growth="+2.3%"
        />
        <StatCard title="Monthly Growth" value="$3,200" growth="+5.1%" />
        <StatCard title="Active Strategies" value="8" growth="Stable" />
        <StatCard title="Risk Exposure" value="Moderate" growth="-1.2%" />
      </div>

      {/* Charts: 2-1 Layout */}
      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        {/* Portfolio Value */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📈 Portfolio Value Over Time
          </h3>
          <LineChart />
        </div>

        {/* Investment Distribution */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            🧩 Investment Distribution
          </h3>
          <PieChart />
        </div>
      </section>

      {/* Yearly Bar & Activity Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-[#161a23] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            📊 Yearly Performance by Type
          </h3>
          <BarChart />
        </div>

        {/* Activity Feed */}
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
