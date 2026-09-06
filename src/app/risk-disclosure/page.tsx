import LegalNotice from "@/app/components/marketing/LegalNotice";

export const metadata = {
  title: "Risk Disclosure | Evermount",
  description:
    "Technology, market data, model, execution, connectivity, cybersecurity and operational risk associated with Evermount infrastructure.",
};

export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Risk Disclosure Statement
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <p>
          IMPORTANT: Please read this risk disclosure carefully. Using financial
          technology involves risk. This is not an investment product
          disclosure for a fund.
        </p>
        <LegalNotice />
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Technology risk.</strong> Software defects, outages and
            configuration errors can interrupt access or produce incorrect
            outputs.
          </li>
          <li>
            <strong>Market data risk.</strong> Feeds may be delayed, missing or
            wrong. Decisions based on data can be flawed.
          </li>
          <li>
            <strong>Model risk.</strong> Quantitative and AI models can be
            misspecified, overfit or fail in new regimes.
          </li>
          <li>
            <strong>Execution risk.</strong> Orders may be delayed, rejected,
            partially filled or filled at unexpected prices where execution
            connectivity exists.
          </li>
          <li>
            <strong>Connectivity risk.</strong> Brokers, venues, networks and
            vendors can fail independently of Evermount.
          </li>
          <li>
            <strong>Cybersecurity risk.</strong> Unauthorized access, malware
            and credential theft can compromise systems and data.
          </li>
          <li>
            <strong>Operational risk.</strong> People, process and third-party
            failures can affect service quality.
          </li>
        </ul>
      </div>
    </main>
  );
}
