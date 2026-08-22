"use client";

import { BoltIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export interface OpsHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export default function OpsHeader({ loading, onRefresh }: OpsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BoltIcon className="w-8 h-8 text-[#00a76f]" />
          Trading Ops
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor quant engine, kill switch, and NAV publishing
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        Refresh
      </button>
    </div>
  );
}
