"use client";

import TranslateTree from "@/app/components/TranslateTree";
import LegalNotice from "@/app/components/marketing/LegalNotice";
export default function DataPolicyPage() {
  return (
    <TranslateTree>
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Market Data Terms
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <LegalNotice />
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Data licensing.</strong> Data is licensed, not sold. Rights
            are limited to the use cases in your agreement.
          </li>
          <li>
            <strong>Redistribution.</strong> Redistribution to third parties is
            prohibited unless expressly allowed in writing.
          </li>
          <li>
            <strong>Permitted use.</strong> Typical permitted use includes
            internal research, risk, analytics and application features you
            operate for your organization.
          </li>
          <li>
            <strong>Third-party data.</strong> Exchange, vendor and alternative
            data remain subject to those providers&apos; terms.
          </li>
          <li>
            <strong>Accuracy.</strong> Data may be delayed, incomplete or
            incorrect. It is not a substitute for official venue feeds where
            those are required.
          </li>
        </ul>
      </div>
    </main>
    </TranslateTree>
  );
}