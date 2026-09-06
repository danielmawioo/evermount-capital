import LegalNotice from "@/app/components/marketing/LegalNotice";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "API Terms",
  "Terms for Evermount API usage, authentication, rate limits, data use and security.",
  "/api-terms",
);

export default function ApiTermsPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          API Terms
        </h1>
        <p className="text-sm text-gray-500">Last updated: September 6, 2026</p>
        <LegalNotice />
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>API usage.</strong> APIs may only be used for permitted
            purposes in your access grant.
          </li>
          <li>
            <strong>Authentication.</strong> Credentials are confidential and
            may not be shared.
          </li>
          <li>
            <strong>Rate limits.</strong> Excessive or abusive traffic may be
            throttled or blocked.
          </li>
          <li>
            <strong>Data use.</strong> You may not scrape, reverse engineer, or
            redistribute data beyond your license.
          </li>
          <li>
            <strong>Abuse.</strong> Attempts to circumvent security, quotas or
            licensing are prohibited.
          </li>
          <li>
            <strong>Security.</strong> Report vulnerabilities to
            security@evermount.co.
          </li>
          <li>
            <strong>Availability.</strong> APIs may change, be versioned, or be
            withdrawn with notice where reasonably practicable.
          </li>
        </ul>
      </div>
    </main>
  );
}
