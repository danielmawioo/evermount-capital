"use client";

import TranslateTree from "@/app/components/TranslateTree";
import LegalNotice from "@/app/components/marketing/LegalNotice";

export default function ConflictOfInterestPage() {
  return (
    <TranslateTree>
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Conflict of Interest Policy
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <LegalNotice />
        <p>
          Evermount is a technology provider. Conflicts may arise between
          commercial interests, vendor relationships and customer interests. We
          aim to identify, manage and disclose material conflicts in customer
          agreements rather than act as a discretionary investment manager for
          website visitors.
        </p>
      </div>
    </main>
  
    </TranslateTree>
  );
}
