"use client";

import TranslateTree from "@/app/components/TranslateTree";

export default function StrategyStatusBadge({
  running,
  active,
  primary,
}: {
  running: boolean;
  active: boolean;
  primary: boolean;
}) {
  if (running) {
    return (
      <TranslateTree>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Running
        </span>
      </TranslateTree>
    );
  }
  if (primary) {
    return (
      <TranslateTree>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          Primary
        </span>
      </TranslateTree>
    );
  }
  if (active) {
    return (
      <TranslateTree>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          Active
        </span>
      </TranslateTree>
    );
  }
  return (
    <TranslateTree>
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        Stopped
      </span>
    </TranslateTree>
  );
}
