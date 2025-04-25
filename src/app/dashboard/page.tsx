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
    <main className="p-6 space-y-10 overflow-auto">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-4">
          <TimeTabs />
          <PortfolioFilter />
        </div>
        <ExportButtons />
      </div>

      {/* Stat Cards */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Portfolio Value Over Time
          </h3>
          <LineChart />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Investment Distribution
          </h3>
          <PieChart />
        </div>
      </div>

      {/* Lower Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Yearly Performance by Type
          </h3>
          <BarChart />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <ActivityFeed />
        </div>
      </div>
    </main>
  );
}
