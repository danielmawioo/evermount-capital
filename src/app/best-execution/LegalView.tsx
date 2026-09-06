"use client";

import TranslateTree from "@/app/components/TranslateTree";
import LegalNotice from "@/app/components/marketing/LegalNotice";

export default function BestExecutionPage() {
  return (
    <TranslateTree>
      <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Best Execution Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: September 6, 2026
          </p>
          <LegalNotice />
          <p>
            Evermount may provide execution infrastructure, order-management
            software and analytics. Where a customer is a regulated firm with
            best-execution obligations, those obligations remain with the
            customer. Evermount does not represent that it is a broker executing
            client orders as an investment firm unless a signed agreement says
            otherwise.
          </p>
        </div>
      </main>
    </TranslateTree>
  );
}
