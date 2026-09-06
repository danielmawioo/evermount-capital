import LegalNotice from "@/app/components/marketing/LegalNotice";

export const metadata = {
  title: "Regulatory & Compliance | Evermount",
  description:
    "How Evermount positions itself as a technology provider, and how customers remain responsible for their own regulatory obligations.",
};

export default function RegulatoryCompliancePage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Regulatory & Compliance
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <LegalNotice />
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Technology Provider
          </h2>
          <p>
            Evermount provides technology and infrastructure services. This page
            does not claim SEC registration, FCA authorization, CMA
            authorization, MiFID authorization, broker-dealer status, investment
            adviser status, or custody.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Data
          </h2>
          <p>
            Market data and third-party data are subject to vendor licenses and
            the Data Policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Security
          </h2>
          <p>
            Access controls, encryption and monitoring practices are implemented
            according to the systems in production and the applicable customer
            agreement.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Privacy
          </h2>
          <p>
            Personal data handling is described in the Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Customer Responsibilities
          </h2>
          <p>
            Institutional customers remain responsible for their own regulatory
            obligations, including trading permissions, best execution where
            they are a regulated firm, and client-asset rules that apply to
            them.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Jurisdiction
          </h2>
          <p>
            Availability of specific services depends on jurisdiction and
            applicable regulation. Evermount is not regulated in every
            jurisdiction.
          </p>
        </section>
      </div>
    </main>
  );
}
