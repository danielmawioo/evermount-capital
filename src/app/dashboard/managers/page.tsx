"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function ManagersPage() {
  return (
    <TranslateTree>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BriefcaseIcon className="w-8 h-8 text-[#00a76f]" />
            Portfolio Managers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Dedicated relationship manager assignments are available for
            institutional accounts.
          </p>
        </div>

        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No relationship manager assigned to your account yet.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Contact{" "}
            <a
              href="mailto:support@evermount.co"
              className="text-[#00a76f] hover:underline"
            >
              support@evermount.co
            </a>{" "}
            to request dedicated manager coverage for institutional accounts.
          </p>
        </div>
      </div>
    </TranslateTree>
  );
}
