"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <TranslateTree>
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        status === "active"
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
      }`}
    >
      {status === "active" ? (
        <CheckCircleIcon className="w-3.5 h-3.5" />
      ) : (
        <XCircleIcon className="w-3.5 h-3.5" />
      )}
      {status}
    </span>
      </TranslateTree>
  );
}
