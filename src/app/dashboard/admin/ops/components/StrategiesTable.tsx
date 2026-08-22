"use client";

import type { TradingStatus } from "@/hooks/useTradingOps";

export interface StrategiesTableProps {
  strategies: NonNullable<TradingStatus["quant"]>["strategies"] | undefined;
}

export default function StrategiesTable({ strategies }: StrategiesTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
        Strategies
      </h2>
      {!strategies?.length ? (
        <p className="text-sm text-gray-500">No strategies reported</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                <th className="pb-2">Name</th>
                <th className="pb-2">Active</th>
                <th className="pb-2">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((s) => (
                <tr key={s.name} className="border-b dark:border-gray-700/50">
                  <td className="py-2 font-medium text-gray-900 dark:text-white">
                    {s.name}
                  </td>
                  <td className="py-2">{s.active ? "Yes" : "No"}</td>
                  <td className="py-2">
                    {(s.capital_allocation * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
