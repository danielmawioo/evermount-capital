"use client";

import TranslateTree from "@/app/components/TranslateTree";

export interface NavPublishingCardProps {
  actionLoading: boolean;
  onRunNavBatch: () => void;
}

export default function NavPublishingCard({
  actionLoading,
  onRunNavBatch,
}: NavPublishingCardProps) {
  return (
    <TranslateTree>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            NAV Publishing
          </h2>
          <button
            disabled={actionLoading}
            onClick={onRunNavBatch}
            className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Run NAV Batch
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pulls strategy NAV from evermount-quant and updates investor portfolio
          values.
        </p>
      </div>
    </TranslateTree>
  );
}
