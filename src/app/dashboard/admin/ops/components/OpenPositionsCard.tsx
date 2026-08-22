"use client";

export interface OpenPositionsCardProps {
  positionsCount: number | undefined;
}

export default function OpenPositionsCard({
  positionsCount,
}: OpenPositionsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
        Open Positions
      </h2>
      <p className="text-sm text-gray-500">
        {positionsCount
          ? `${positionsCount} position(s)`
          : "No open positions reported (paper trading)"}
      </p>
    </div>
  );
}
