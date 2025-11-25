export const metadata = {
  title: "Best Execution Policy | Evermount Capital",
  description:
    "Evermount Capital's best execution policy for client orders. Our commitment to obtaining the best possible execution for client transactions.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BestExecutionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Best Execution Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Last updated: April 25, 2025
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            This policy outlines Evermount Capital's commitment to obtaining the best 
            possible execution for client orders, taking into account price, costs, 
            speed, likelihood of execution, settlement, and other relevant factors.
          </p>
        </header>

        {/* Policy Statement */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            1. Best Execution Commitment
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
              When executing client orders, Evermount Capital is committed to taking 
              all sufficient steps to obtain the best possible result for clients, 
              taking into account price, costs, speed, likelihood of execution and 
              settlement, size, nature, or any other consideration relevant to the 
              execution of the order.
            </p>
          </div>
        </section>

        {/* Execution Factors */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2. Execution Factors
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4 text-gray-700 dark:text-gray-300">
              When determining best execution, we consider the following factors:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Price:</strong> The price at which the order can be executed
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Costs:</strong> All costs related to execution, including 
                commissions, fees, and spreads
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Speed:</strong> The speed of execution and likelihood of 
                settlement
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Likelihood of Execution:</strong> The probability that the 
                order will be filled
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Size:</strong> The size of the order relative to available 
                liquidity
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Nature:</strong> The nature of the order (market, limit, etc.)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Market Conditions:</strong> Current market conditions and 
                volatility
              </li>
            </ul>
          </div>
        </section>

        {/* Execution Venues */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            3. Execution Venues
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4 text-gray-700 dark:text-gray-300">
              We execute client orders through various execution venues, including:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Regulated exchanges and trading platforms</li>
              <li>Licensed brokers and market makers</li>
              <li>Electronic trading systems</li>
              <li>Over-the-counter (OTC) markets where appropriate</li>
            </ul>
            <p className="text-base leading-7 mt-4 text-gray-700 dark:text-gray-300">
              We select execution venues based on their ability to provide best 
              execution for the specific order type and market conditions.
            </p>
          </div>
        </section>

        {/* Monitoring & Review */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            4. Monitoring & Review
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-base leading-7 mb-4">
              We regularly monitor and review our execution practices to ensure:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>Execution quality meets our best execution standards</li>
              <li>Execution venues continue to provide competitive execution</li>
              <li>Our execution policies remain appropriate and effective</li>
              <li>Any issues with execution quality are identified and addressed</li>
            </ul>
          </div>
        </section>

        {/* Limitations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5. Limitations
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 p-6 rounded-lg">
            <p className="text-base leading-7 mb-4">
              Please note that:
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7">
              <li>
                Best execution does not guarantee the best price in all circumstances
              </li>
              <li>
                Market conditions, liquidity, and other factors may affect execution 
                quality
              </li>
              <li>
                For certain order types or market conditions, best execution may 
                prioritize factors other than price
              </li>
              <li>
                Execution quality may vary across different asset classes and markets
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <footer className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Questions about execution? Contact us at{" "}
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

