// components/ExportButtons.tsx
"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ExportButtons() {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        Export PDF
      </button>

      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        Export CSV
      </button>
    </div>
  );
}
