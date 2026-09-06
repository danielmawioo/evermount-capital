"use client";

import TranslateTree from "@/app/components/TranslateTree";
import LegalNotice from "@/app/components/marketing/LegalNotice";

export default function AMLPolicyPage() {
  return (
    <TranslateTree>
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Anti-Money Laundering (AML) Policy
        </h1>
        <p className="text-sm text-gray-500">
          Effective Date: September 6, 2026
        </p>
        <LegalNotice />
        <p>
          This statement describes financial-crime controls appropriate to a
          technology and infrastructure provider. It is not a fund-administrator
          AML manual and does not mean Evermount accepts investor subscriptions
          or holds client money.
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>Customer onboarding for institutional and developer accounts.</li>
          <li>Institutional due diligence where commercially required.</li>
          <li>Sanctions screening where applicable.</li>
          <li>
            Partner due diligence for connectivity and data relationships.
          </li>
          <li>Fraud prevention on accounts, APIs and billing.</li>
          <li>
            Financial crime controls proportional to the services offered.
          </li>
          <li>Regulatory cooperation where legally required.</li>
        </ul>
      </div>
    </main>
  
    </TranslateTree>
  );
}
