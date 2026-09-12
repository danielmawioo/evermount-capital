"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { useEffect } from "react";
import { ArrowPathIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useInvestor } from "@/hooks/useInvestor";
import { useManagerStrategies } from "@/hooks/useManagerStrategies";
import CombinedMetricsCard from "./CombinedMetricsCard";
import StrategiesTable from "./StrategiesTable";

export default function ManagerStrategiesPage() {
  const router = useRouter();
  const { isAdmin, isManager, loading: authLoading } = useInvestor();
  const {
    strategies,
    combined,
    loading,
    actionKey,
    load,
    handleSwitch,
    handleToggleActive,
  } = useManagerStrategies();

  useEffect(() => {
    if (!authLoading && !isAdmin && !isManager) {
      router.replace("/dashboard");
      return;
    }
    if (!authLoading) void load();
  }, [authLoading, isAdmin, isManager, router, load]);

  if (authLoading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarSquareIcon className="w-8 h-8 text-[#00a76f]" />
              Strategy Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View running strategies, switch execution, and monitor pooled
              metrics
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {combined ? <CombinedMetricsCard combined={combined} /> : null}

        <StrategiesTable
          strategies={strategies}
          loading={loading}
          actionKey={actionKey}
          onSwitch={(key) => void handleSwitch(key)}
          onToggleActive={(key, active) => void handleToggleActive(key, active)}
        />
      </div>
    </TranslateTree>
  );
}
