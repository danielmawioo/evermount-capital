export const metadata = {
  title: "Investment Agreement | Evermount Capital",
  description:
    "Investment agreement terms and conditions for Evermount Capital platform users. Understand your rights and obligations as an investor.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function InvestmentAgreementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Investment Agreement
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Last updated: April 25, 2025
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            This Investment Agreement (&quot;Agreement&quot;) sets forth the
            terms and conditions governing your investment relationship with
            Evermount Capital. By using our platform and making investments, you
            agree to be bound by this Agreement.
          </p>
        </header>

        {/* Parties */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            1. Parties to the Agreement
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Evermount Capital
                </strong>{" "}
                (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;,
                &quot;our&quot;) - The technology platform provider and
                investment service facilitator.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">
                  Investor
                </strong>{" "}
                (&quot;you&quot;, &quot;your&quot;, &quot;Client&quot;) - The
                individual or entity using the platform to make investments.
              </li>
            </ul>
          </div>
        </section>

        {/* Investment Services */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2. Investment Services
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4 text-gray-700 dark:text-gray-300">
              Evermount Capital provides access to investment opportunities
              including:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Hedge fund investment strategies</li>
              <li>Quantitative trading strategies</li>
              <li>Portfolio management services</li>
              <li>Investment analytics and reporting</li>
              <li>Risk management tools</li>
            </ul>
            <p className="text-base leading-7 mt-4 text-gray-700 dark:text-gray-300">
              Investment services may be provided directly by Evermount Capital
              or through licensed third-party entities, depending on
              jurisdiction and regulatory requirements.
            </p>
          </div>
        </section>

        {/* Client Obligations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            3. Client Obligations
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4 text-gray-700 dark:text-gray-300">
              You agree to:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                Provide accurate and complete information during account
                registration and KYC
              </li>
              <li>
                Maintain the security and confidentiality of your account
                credentials
              </li>
              <li>
                Notify us immediately of any unauthorized access or suspicious
                activity
              </li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Only invest funds that you can afford to lose entirely</li>
              <li>
                Seek independent financial, legal, and tax advice before
                investing
              </li>
              <li>Understand and accept all investment risks</li>
              <li>
                Provide updated information when your circumstances change
              </li>
              <li>Not use the platform for illegal or unauthorized purposes</li>
            </ul>
          </div>
        </section>

        {/* Fees & Charges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            4. Fees & Charges
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7">
              <li>
                <strong>Management Fees:</strong> Annual management fees as
                disclosed in your selected investment plan (typically 2% of
                assets under management).
              </li>
              <li>
                <strong>Performance Fees:</strong> Performance fees may apply
                (typically 20% of profits above high-water mark) as disclosed in
                your investment plan.
              </li>
              <li>
                <strong>Transaction Fees:</strong> Certain transactions may
                incur fees as disclosed at the time of transaction.
              </li>
              <li>
                <strong>Withdrawal Fees:</strong> Withdrawal fees may apply
                depending on withdrawal method and frequency.
              </li>
              <li>
                <strong>Fee Disclosure:</strong> All fees are disclosed in your
                investment plan documentation and fee schedule. You will be
                notified of any fee changes.
              </li>
            </ul>
          </div>
        </section>

        {/* Investment Terms */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5. Investment Terms
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7">
              <li>
                <strong>Minimum Investment:</strong> Minimum investment amounts
                vary by investment plan and are disclosed at the time of
                selection.
              </li>
              <li>
                <strong>Lock-Up Periods:</strong> Some investments may have
                lock-up periods during which withdrawals are restricted.
              </li>
              <li>
                <strong>Redemption Terms:</strong> Withdrawal requests may be
                subject to notice periods and processing times as disclosed in
                your investment plan.
              </li>
              <li>
                <strong>Valuation:</strong> Investment values are calculated and
                reported in accordance with applicable accounting standards and
                valuation methodologies.
              </li>
              <li>
                <strong>Performance Reporting:</strong> Performance reports are
                provided periodically as disclosed in your investment plan.
              </li>
            </ul>
          </div>
        </section>

        {/* Risk Acknowledgment */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            6. Risk Acknowledgment
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-6 rounded-lg">
            <p className="text-base leading-7 mb-4">
              <strong>You acknowledge and agree that:</strong>
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>All investments involve risk of loss</li>
              <li>You may lose some or all of your invested capital</li>
              <li>Past performance does not guarantee future results</li>
              <li>Investments are not insured or guaranteed</li>
              <li>
                You have read and understood the Risk Disclosure Statement
              </li>
              <li>You are capable of evaluating investment risks</li>
              <li>
                You have sufficient financial resources to bear the risk of loss
              </li>
            </ul>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            7. Limitation of Liability
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>
                Evermount Capital&apos;s liability is limited to the fees paid
                by you in the 12 months preceding any claim
              </li>
              <li>
                We are not liable for investment losses, market fluctuations, or
                economic conditions
              </li>
              <li>
                We are not liable for indirect, consequential, or special
                damages
              </li>
              <li>
                We are not liable for third-party actions or system failures
                beyond our reasonable control
              </li>
            </ul>
          </div>
        </section>

        {/* Termination */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            8. Termination
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>
                Either party may terminate this Agreement in accordance with the
                terms of your investment plan
              </li>
              <li>
                We may suspend or terminate your account for breach of this
                Agreement, regulatory violations, or suspicious activity
              </li>
              <li>
                Upon termination, you may withdraw your funds subject to
                applicable lock-up periods and redemption terms
              </li>
              <li>
                Termination does not affect accrued rights and obligations
              </li>
            </ul>
          </div>
        </section>

        {/* Governing Law */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            9. Governing Law & Dispute Resolution
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>
                This Agreement is governed by the laws of Kenya, or as otherwise
                specified in your jurisdiction
              </li>
              <li>
                Disputes will be resolved through arbitration or competent
                courts as per applicable law
              </li>
              <li>
                You may have rights under consumer protection laws in your
                jurisdiction
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <footer className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Questions about this Agreement? Contact us at{" "}
            <a
              href="mailto:legal@evermount.co"
              className="text-[#00a76f] underline font-medium hover:text-emerald-700"
            >
              legal@evermount.co
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
