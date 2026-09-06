"use client";

import TranslateTree from "@/app/components/TranslateTree";

export interface ReconciliationRun {
  id: string;
  status: string;
  navDriftCount: number;
  createdAt: string;
}

export interface DemoReconciliationCardProps {
  reconHistory: ReconciliationRun[];
  actionLoading: boolean;
  onSyncPositions: () => void;
  onRunReconciliation: () => void;
}

export default function DemoReconciliationCard({
  reconHistory,
  actionLoading,
  onSyncPositions,
  onRunReconciliation,
}: DemoReconciliationCardProps) {
  return (
    <TranslateTree>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Demo reconciliation (30d)
        </h2>
        <div className="flex gap-2">
          <button
            disabled={actionLoading}
            onClick={onSyncPositions}
            className="text-xs px-3 py-1.5 border rounded-lg"
          >
            Sync positions
          </button>
          <button
            disabled={actionLoading}
            onClick={onRunReconciliation}
            className="text-xs px-3 py-1.5 bg-[#00a76f] text-white rounded-lg"
          >
            Run reconciliation
          </button>
        </div>
      </div>
      {reconHistory.length === 0 ? (
        <p className="text-sm text-gray-500">No reconciliation runs yet</p>
      ) : (
        <ul className="text-sm space-y-2">
          {reconHistory.slice(0, 5).map((r) => (
            <li key={r.id} className="flex justify-between gap-4">
              <span>
                <span className="font-medium">{r.status}</span> —{" "}
                {r.navDriftCount} drift(s)
              </span>
              <span className="text-gray-500">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
      </TranslateTree>
  );
}
