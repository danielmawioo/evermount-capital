export const metadata = {
  title: "Regulatory Compliance | Evermount Capital",
  description:
    "Evermount Capital's regulatory compliance framework, licensing information, and commitment to regulatory standards across multiple jurisdictions.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegulatoryCompliancePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Regulatory Compliance & Licensing
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Last updated: April 25, 2025
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Evermount Capital is committed to maintaining the highest standards of 
            regulatory compliance across all jurisdictions in which we operate. This 
            page outlines our regulatory framework, licensing, and compliance commitments.
          </p>
        </header>

        {/* Regulatory Framework */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            1. Regulatory Framework
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4 text-gray-700 dark:text-gray-300">
              Evermount Capital operates in compliance with applicable financial 
              services regulations in the jurisdictions where we provide services. 
              Our regulatory compliance framework includes:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Securities and Exchange Commission (SEC) regulations (where applicable)</li>
              <li>Financial Conduct Authority (FCA) standards (UK/EU)</li>
              <li>Capital Markets Authority (CMA) regulations (Kenya)</li>
              <li>Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) laws</li>
              <li>General Data Protection Regulation (GDPR) and data protection laws</li>
              <li>Payment Services regulations</li>
              <li>Consumer protection laws</li>
            </ul>
          </div>
        </section>

        {/* Licensing Information */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2. Licensing & Authorizations
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Technology Platform License</h3>
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  Evermount Capital operates as a technology platform providing 
                  investment management tools and analytics. Our platform services 
                  are provided under appropriate technology and software licensing 
                  frameworks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Investment Services</h3>
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  Investment services may be provided through licensed third-party 
                  entities or partnerships with regulated financial institutions, 
                  depending on jurisdiction and service type.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Payment Processing</h3>
                <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                  Payment processing services are provided through licensed payment 
                  service providers and financial institutions that maintain appropriate 
                  regulatory authorizations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Programs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            3. Compliance Programs
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">AML/CTF Compliance:</strong> Comprehensive anti-money laundering 
                and counter-terrorism financing program with customer due diligence, 
                transaction monitoring, and suspicious activity reporting.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">KYC Procedures:</strong> Know Your Customer (KYC) verification 
                for all users, including identity verification, address verification, 
                and source of funds checks where required.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Data Protection:</strong> GDPR, CCPA, and other data protection 
                law compliance with appropriate technical and organizational measures.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Client Asset Protection:</strong> Segregation of client funds, 
                appropriate custody arrangements, and protection of client assets.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Conflict of Interest Management:</strong> Policies and procedures 
                to identify, manage, and disclose conflicts of interest.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Best Execution:</strong> Policies to ensure best execution of 
                client orders where applicable.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Complaints Handling:</strong> Formal complaints handling 
                procedures and escalation processes.
              </li>
            </ul>
          </div>
        </section>

        {/* Regulatory Reporting */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            4. Regulatory Reporting & Disclosure
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4">
              We maintain appropriate regulatory reporting and disclosure obligations, 
              including:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>Regular regulatory filings and notifications</li>
              <li>Suspicious activity reports to financial intelligence units</li>
              <li>Client money and asset reporting</li>
              <li>Incident reporting to regulators</li>
              <li>Annual compliance certifications and audits</li>
              <li>Transparent disclosure of fees, risks, and terms</li>
            </ul>
          </div>
        </section>

        {/* Regulatory Updates */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5. Regulatory Monitoring & Updates
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7">
              We continuously monitor regulatory developments and update our policies, 
              procedures, and systems to ensure ongoing compliance. Our compliance team 
              works closely with legal advisors and regulatory consultants to stay 
              abreast of changes in applicable laws and regulations.
            </p>
          </div>
        </section>

        {/* Investor Protection */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            6. Investor Protection
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-base leading-7 mb-4">
              While we maintain appropriate safeguards, investors should be aware that:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>Investments are not covered by deposit insurance schemes</li>
              <li>Investments are not guaranteed by any government or regulatory body</li>
              <li>Investors may lose their entire investment</li>
              <li>Past performance does not guarantee future results</li>
              <li>Investors should carefully review all risk disclosures</li>
            </ul>
          </div>
        </section>

        {/* Contact Information */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            7. Regulatory Contact Information
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Compliance Department</h3>
                <p className="text-base">
                  Email: <a href="mailto:compliance@evermount.co" className="text-[#00a76f] underline">compliance@evermount.co</a>
                </p>
                <p className="text-base">
                  Phone: <a href="tel:+254758578816" className="text-[#00a76f] underline">+254 758 578 816</a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Legal Department</h3>
                <p className="text-base">
                  Email: <a href="mailto:legal@evermount.co" className="text-[#00a76f] underline">legal@evermount.co</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-lg">
          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Disclaimer:</strong> This page provides general information about 
            our regulatory compliance framework. Specific regulatory requirements may 
            vary by jurisdiction and service type. Investors should consult with 
            qualified advisors regarding regulatory matters in their jurisdiction.
          </p>
        </section>
      </div>
    </main>
  );
}

