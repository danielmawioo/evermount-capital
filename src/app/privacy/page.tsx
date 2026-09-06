"use client";

import TranslateTree from "@/app/components/TranslateTree";

export default function PrivacyPolicyPage() {
  return (
    <TranslateTree>
      <main className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Effective Date: April 25, 2025
          </p>

          <section className="space-y-8 text-base leading-7 text-gray-700 dark:text-gray-300">
            <p>
              This Privacy Policy outlines how Evermount collects, uses, stores,
              and protects your information. Your privacy is critically
              important to us.
            </p>

            <ol className="space-y-6 list-decimal pl-5 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Data Collected:
                </strong>{" "}
                Name, work email, company, role, technical requirements, IP
                address, device type, and usage of the website or platform.
              </li>

              <li>
                <strong>Purpose of Collection:</strong> To improve user
                experience, run analytics, and comply with regulations.
              </li>

              <li>
                <strong>AI & Performance Modeling:</strong> Your anonymized
                behavior may be used to train portfolio models.
              </li>

              <li>
                <strong>Account Analytics:</strong> Portfolio activity, risk
                profile, and execution timing are logged for accuracy.
              </li>

              <li>
                <strong>Third-Party Tools:</strong> We may use analytics and
                performance SDKs (e.g., Google Analytics, Sentry).
              </li>

              <li>
                <strong>Authentication Data:</strong> Login timestamps, IP, and
                geolocation are stored for fraud prevention.
              </li>

              <li>
                <strong>Cookies:</strong> Essential cookies are used for
                functionality. You may opt out of tracking cookies.
              </li>

              <li>
                <strong>Data Retention:</strong> We retain user data as long as
                necessary to comply with financial laws.
              </li>

              <li>
                <strong>Encryption:</strong> All data is encrypted in transit
                and at rest using industry best practices.
              </li>

              <li>
                <strong>Access Control:</strong> Role-based controls govern
                internal access to your account data.
              </li>

              <li>
                <strong>International Storage:</strong> Data may be stored
                across multiple secure jurisdictions.
              </li>

              <li>
                <strong>Regulatory Compliance:</strong> We comply with GDPR,
                CCPA, and Kenyan Data Protection guidelines.
              </li>

              <li>
                <strong>User Rights:</strong> You may request access,
                correction, or deletion of your data at any time.
              </li>

              <li>
                <strong>Withdraw Consent:</strong> You may withdraw data use
                consent, subject to feature limitations.
              </li>

              <li>
                <strong>Data Anonymization:</strong> We anonymize all data used
                for benchmarks and research publications.
              </li>

              <li>
                <strong>Payment Security:</strong> Payments are processed via
                secure, PCI-compliant third parties.
              </li>

              <li>
                <strong>Email Communications:</strong> We may email you
                regarding platform changes, promotions, or reports.
              </li>

              <li>
                <strong>Marketing Opt-Out:</strong> You can unsubscribe from
                promotional emails at any time.
              </li>

              <li>
                <strong>Automated Decision Making:</strong> Some features may
                use AI to auto-adjust strategy insights.
              </li>

              <li>
                <strong>Data Breach Policy:</strong> In case of a breach,
                affected users will be notified within 72 hours.
              </li>

              <li>
                <strong>Children:</strong> Our platform is not intended for
                users under the age of 18.
              </li>

              <li>
                <strong>Do Not Track:</strong> We currently do not respond to
                browser “Do Not Track” signals.
              </li>

              <li>
                <strong>Disclosures:</strong> We may disclose data when required
                by legal process or subpoenas.
              </li>

              <li>
                <strong>Change of Control:</strong> In the event of an
                acquisition, user data may be transferred.
              </li>

              <li>
                <strong>API Logging:</strong> Any external integrations via our
                API are logged and monitored.
              </li>

              <li>
                <strong>Behavioral Profiling:</strong> We may use user actions
                to suggest optimized investment models.
              </li>

              <li>
                <strong>Updates to Policy:</strong> We may revise this Privacy
                Policy. Changes will be communicated to users.
              </li>

              <li>
                <strong>Backup & Recovery:</strong> We maintain redundant secure
                backups to ensure service continuity.
              </li>

              <li>
                <strong>Contact Us:</strong> For any privacy concerns, email us
                at privacy@evermount.com.
              </li>
            </ol>
          </section>
        </div>
      </main>
    </TranslateTree>
  );
}
