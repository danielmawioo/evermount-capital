"use client";

export default function AMLPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-14">
        {/* HEADER */}
        <header>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 text-gray-900 dark:text-white">
            🛡️ Anti-Money Laundering (AML) Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Effective Date: April 25, 2025
          </p>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            At Evermount Capital, we are committed to the highest standards of
            anti-money laundering (AML) compliance and ethical behavior. This
            AML Policy outlines our responsibilities and how we detect, prevent,
            and report money laundering activities.
          </p>
        </header>

        {/* POLICY DETAILS */}
        <section className="space-y-10 text-base leading-7 text-gray-700 dark:text-gray-300">
          <ol className="space-y-8 list-decimal pl-5 text-gray-700 dark:text-gray-300">
            {[
              [
                "Purpose",
                "To prevent the use of our platform for laundering money, financing terrorism, or other financial crimes.",
              ],
              [
                "Scope",
                "This policy applies to all users, employees, vendors, and partners of Evermount Capital.",
              ],
              [
                "Risk-Based Approach",
                "We apply appropriate due diligence based on user risk profile, location, and transaction behavior.",
              ],
              [
                "Customer Identification (KYC)",
                "We require identity verification, proof of address, and in some cases, source of funds.",
              ],
              [
                "Ongoing Monitoring",
                "We monitor transactions to identify patterns that may indicate suspicious activity.",
              ],
              [
                "Suspicious Activity Reporting",
                "All detected red flags are escalated to our AML compliance officer for action.",
              ],
              [
                "Sanctions Screening",
                "We screen users and transactions against global sanctions lists and watchlists.",
              ],
              [
                "Record Keeping",
                "All identification and transaction records are securely stored for a minimum of 5 years.",
              ],
              [
                "Training",
                "Our team receives regular training on AML regulations and red flag indicators.",
              ],
              [
                "Cooperation with Authorities",
                "We collaborate with financial regulators and law enforcement when required.",
              ],
              [
                "Technology & Tools",
                "We use AI-based transaction monitoring and automated flagging systems.",
              ],
              [
                "Politically Exposed Persons (PEPs)",
                "Extra scrutiny is applied to users identified as PEPs or linked individuals.",
              ],
              [
                "Third-Party Integrations",
                "All APIs and partners undergo risk assessments and must comply with AML obligations.",
              ],
              [
                "Non-Face-to-Face Onboarding",
                "Enhanced KYC procedures apply for digital onboarding and remote verifications.",
              ],
              [
                "Data Privacy",
                "User data is protected in accordance with our Privacy Policy and applicable data laws.",
              ],
              [
                "Funds Freezing",
                "Suspected illicit funds may be frozen pending investigation or regulatory direction.",
              ],
              [
                "Tipping Off",
                "Staff are trained never to inform users when an AML investigation is ongoing.",
              ],
              [
                "Geographic Risk Controls",
                "Extra measures apply to users from high-risk jurisdictions (FATF-listed countries).",
              ],
              [
                "Transaction Limits",
                "Limits may be enforced depending on verification status and behavior.",
              ],
              [
                "Escalation Procedures",
                "Internal workflows ensure rapid response to confirmed or suspected violations.",
              ],
              [
                "Audits & Reviews",
                "Our AML processes are audited periodically to ensure compliance and effectiveness.",
              ],
              [
                "Regulatory Framework",
                "We follow the FATF, SEC, EU AMLD, and Kenyan AML guidelines.",
              ],
              [
                "Crypto Compliance",
                "Where applicable, we monitor and analyze blockchain transactions.",
              ],
              [
                "Beneficial Ownership",
                "We identify ultimate beneficial owners of accounts, especially for institutions.",
              ],
              [
                "Whistleblower Protection",
                "Employees can report suspicious activity anonymously and without retaliation.",
              ],
              [
                "AML Officer Contact",
                "Direct reports can be made to compliance@evermount.com.",
              ],
              [
                "Automated Suspicion Flags",
                "Patterns like structuring, unusual volumes, or rapid movement are flagged.",
              ],
              [
                "Source of Wealth Checks",
                "May be required based on deposit behavior or institutional onboarding.",
              ],
              [
                "Client Classification",
                "Users are classified by risk category upon onboarding and reviewed periodically.",
              ],
              [
                "Enforcement",
                "Breach of AML policy can lead to suspension, closure, or legal escalation.",
              ],
            ].map(([title, desc], i) => (
              <li key={i}>
                <strong className="text-gray-900 dark:text-white">
                  {title}:
                </strong>{" "}
                {desc}
              </li>
            ))}
          </ol>
        </section>

        {/* CONTACT */}
        <footer className="pt-10 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Questions? Contact our AML Compliance Officer at{" "}
            <a
              href="mailto:compliance@evermount.com"
              className="text-[#00a76f] underline font-medium"
            >
              compliance@evermount.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
