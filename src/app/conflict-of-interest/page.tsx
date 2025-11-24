export const metadata = {
  title: "Conflict of Interest Policy | Evermount Capital",
  description:
    "Evermount Capital's conflict of interest policy and procedures for identifying, managing, and disclosing potential conflicts.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConflictOfInterestPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-800 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Conflict of Interest Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Last updated: April 25, 2025
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Evermount Capital is committed to managing conflicts of interest fairly 
            and transparently. This policy outlines how we identify, manage, and 
            disclose potential conflicts of interest.
          </p>
        </header>

        {/* Policy Statement */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            1. Policy Statement
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7">
              Evermount Capital maintains policies and procedures to identify, prevent, 
              manage, and disclose conflicts of interest that may arise between our 
              interests and those of our clients, or between the interests of different 
              clients. We are committed to acting in the best interests of our clients 
              and maintaining the highest standards of integrity.
            </p>
          </div>
        </section>

        {/* Types of Conflicts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2. Types of Conflicts of Interest
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4">Potential conflicts may arise from:</p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>
                <strong>Proprietary Trading:</strong> We may trade for our own account 
                or related entities, which may conflict with client interests
              </li>
              <li>
                <strong>Fee Structures:</strong> Our compensation may create incentives 
                that conflict with client interests
              </li>
              <li>
                <strong>Soft Dollar Arrangements:</strong> Receipt of goods or services 
                from brokers or other service providers
              </li>
              <li>
                <strong>Related Party Transactions:</strong> Transactions with affiliates, 
                related entities, or connected parties
              </li>
              <li>
                <strong>Information Barriers:</strong> Access to material non-public 
                information that could benefit certain clients
              </li>
              <li>
                <strong>Allocation of Investment Opportunities:</strong> Deciding which 
                clients receive access to limited investment opportunities
              </li>
              <li>
                <strong>Personal Trading:</strong> Personal investments by employees 
                that may conflict with client interests
              </li>
            </ul>
          </div>
        </section>

        {/* Management Measures */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            3. Conflict Management Measures
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7">
              <li>
                <strong>Organizational Measures:</strong> Information barriers, separate 
                reporting lines, and independent oversight functions
              </li>
              <li>
                <strong>Operational Measures:</strong> Separate management of different 
                activities, separate accounts, and independent pricing
              </li>
              <li>
                <strong>Disclosure:</strong> Transparent disclosure of conflicts to 
                affected clients where appropriate
              </li>
              <li>
                <strong>Policies & Procedures:</strong> Written policies and procedures 
                for identifying and managing conflicts
              </li>
              <li>
                <strong>Employee Training:</strong> Regular training on conflict 
                identification and management
              </li>
              <li>
                <strong>Monitoring:</strong> Regular review and monitoring of potential 
                conflicts
              </li>
              <li>
                <strong>Personal Trading Policies:</strong> Restrictions on personal 
                trading by employees
              </li>
            </ul>
          </div>
        </section>

        {/* Disclosure */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            4. Disclosure of Conflicts
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4">
              Where conflicts cannot be avoided or adequately managed, we will:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>Disclose the conflict to affected clients in a clear and timely manner</li>
              <li>Provide sufficient information for clients to make informed decisions</li>
              <li>Obtain client consent where required by applicable regulations</li>
              <li>Document all disclosures and client consents</li>
            </ul>
          </div>
        </section>

        {/* Client Rights */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5. Client Rights
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-base leading-7 mb-4">
              Clients have the right to:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>Be informed of material conflicts of interest</li>
              <li>Receive clear and understandable disclosure of conflicts</li>
              <li>Make informed decisions about whether to proceed with transactions</li>
              <li>Request additional information about conflicts</li>
              <li>File complaints regarding conflict management</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <footer className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Questions about conflicts of interest? Contact us at{" "}
            <a
              href="mailto:compliance@evermount.co"
              className="text-[#00a76f] underline font-medium hover:text-emerald-700"
            >
              compliance@evermount.co
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

