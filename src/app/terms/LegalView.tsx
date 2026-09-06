"use client";

import TranslateTree from "@/app/components/TranslateTree";
import LegalNotice from "@/app/components/marketing/LegalNotice";
export default function TermsPage() {
  return (
    <TranslateTree>
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Platform Services Agreement
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <LegalNotice />
        <div className="space-y-8 text-base leading-7 text-gray-700 dark:text-gray-300">
          <p>
            These terms govern access to Evermount software, APIs, data and
            infrastructure services. They do not constitute an investment
            management agreement, subscription to a fund, or an invitation to
            deposit client money with Evermount.
          </p>
          <ol className="space-y-6 list-decimal pl-5">
            <li>
              <strong>Platform access.</strong> We may grant access to
              environments, credentials and documentation subject to approval
              and applicable law.
            </li>
            <li>
              <strong>Software services.</strong> Services are provided on a
              technology basis. Features may be in preview, limited, or
              unavailable in some jurisdictions.
            </li>
            <li>
              <strong>APIs.</strong> Use of APIs is also subject to the API
              Terms.
            </li>
            <li>
              <strong>Data.</strong> Market data and third-party data are
              subject to the Data Policy and any vendor licenses.
            </li>
            <li>
              <strong>Infrastructure.</strong> Hosting, connectivity and
              operational arrangements are described in the applicable order
              form or statement of work.
            </li>
            <li>
              <strong>Customer responsibilities.</strong> Customers remain
              responsible for their own trading, regulatory, KYC/AML and
              fiduciary obligations. Evermount is not a broker-dealer, bank,
              custodian, exchange or investment adviser unless expressly stated
              in a signed agreement.
            </li>
            <li>
              <strong>Intellectual property.</strong> Evermount retains rights
              in its software, models and documentation. Customers retain rights
              in their own data, subject to licenses granted to operate the
              service.
            </li>
            <li>
              <strong>Security.</strong> Each party will implement reasonable
              security measures. Customers must protect credentials and report
              suspected compromise.
            </li>
            <li>
              <strong>Fees.</strong> Fees, if any, are set out in an order form.
              This website does not list fund management or performance fees.
            </li>
            <li>
              <strong>Availability.</strong> We do not guarantee uninterrupted
              service. Maintenance, vendor outages and force majeure may affect
              access.
            </li>
            <li>
              <strong>Liability.</strong> Liability is limited to the extent
              permitted by law and as set out in the signed commercial terms.
            </li>
            <li>
              <strong>Termination.</strong> Either party may terminate as
              provided in the commercial agreement. Access may be suspended for
              abuse, security risk or legal requirement.
            </li>
          </ol>
        </div>
      </div>
    </main>
    </TranslateTree>
  );
}