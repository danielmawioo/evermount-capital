export const metadata = {
  title: "Risk Disclosure Statement | Evermount Capital",
  description:
    "Important risk disclosure statement for investors. Understand the risks associated with hedge fund investments, quantitative trading, and alternative investments.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header with Warning */}
        <header className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-600 p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            ⚠️ Risk Disclosure Statement
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Last updated: April 25, 2025
          </p>
          <p className="text-base text-gray-800 dark:text-gray-200 font-semibold">
            IMPORTANT: Please read this risk disclosure carefully before investing. 
            Investing in hedge funds and alternative investments involves substantial risk 
            of loss. You should only invest funds that you can afford to lose entirely.
          </p>
        </header>

        {/* General Risk Warning */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            1. General Investment Risks
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Capital Loss Risk:</strong> You may lose some or all of your 
                invested capital. There is no guarantee that you will recover your initial 
                investment or achieve any returns.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">No Guaranteed Returns:</strong> Past performance is not indicative 
                of future results. Historical returns do not guarantee future performance, 
                and investments may result in losses.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Market Risk:</strong> Investment values fluctuate based on market 
                conditions, economic factors, geopolitical events, and other variables 
                beyond our control.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Liquidity Risk:</strong> Some investments may not be readily 
                liquid, and you may not be able to withdraw funds immediately or at 
                favorable prices.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Inflation Risk:</strong> Returns may not keep pace with inflation, 
                reducing your purchasing power over time.
              </li>
            </ul>
          </div>
        </section>

        {/* Hedge Fund Specific Risks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            2. Hedge Fund & Alternative Investment Risks
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Leverage Risk:</strong> Hedge funds may use leverage, which can 
                amplify both gains and losses, potentially resulting in losses exceeding 
                your initial investment.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Concentration Risk:</strong> Portfolios may be concentrated in 
                specific sectors, asset classes, or strategies, increasing vulnerability 
                to adverse events.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Counterparty Risk:</strong> Investments may involve exposure to 
                counterparties, including brokers, banks, and other financial institutions, 
                which may default.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Operational Risk:</strong> System failures, human error, fraud, 
                or other operational issues may result in losses.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Regulatory Risk:</strong> Changes in laws, regulations, or 
                regulatory interpretations may adversely affect investments or the 
                platform&apos;s operations.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Lock-Up Periods:</strong> Some investments may have lock-up 
                periods during which you cannot withdraw funds.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Redemption Restrictions:</strong> Withdrawals may be subject to 
                notice periods, gates, or other restrictions.
              </li>
            </ul>
          </div>
        </section>

        {/* Quantitative & AI Trading Risks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            3. Quantitative & AI Trading Risks
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Model Risk:</strong> AI and quantitative models may fail to 
                perform as expected, especially during unprecedented market conditions 
                or &quot;black swan&quot; events.
              </li>
              <li>
                <strong>Data Risk:</strong> Models depend on historical data, which may 
                not accurately predict future market behavior.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Algorithmic Risk:</strong> Automated trading systems may execute 
                trades based on flawed logic, bugs, or unexpected market conditions.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Technology Risk:</strong> System failures, cyberattacks, or 
                connectivity issues may disrupt trading or result in losses.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Over-Optimization:</strong> Models may be over-fitted to 
                historical data and perform poorly in live trading.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Market Regime Changes:</strong> Models trained on one market 
                regime may fail when market conditions change significantly.
              </li>
            </ul>
          </div>
        </section>

        {/* Currency & International Risks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            4. Currency & International Investment Risks
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Currency Risk:</strong> Investments in foreign currencies are 
                subject to exchange rate fluctuations, which may result in losses.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Political Risk:</strong> Investments in foreign markets are 
                subject to political instability, changes in government policies, 
                expropriation, or other political events.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Regulatory Differences:</strong> Foreign markets may have 
                different regulatory frameworks, investor protections, and legal systems.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Settlement Risk:</strong> Cross-border transactions may involve 
                additional settlement risks and delays.
              </li>
            </ul>
          </div>
        </section>

        {/* Cryptocurrency Risks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            5. Cryptocurrency & Digital Asset Risks
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Extreme Volatility:</strong> Cryptocurrency prices can be 
                extremely volatile, with rapid and substantial price movements.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Regulatory Uncertainty:</strong> Cryptocurrency regulations are 
                evolving and may change, potentially affecting investments.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Technology Risk:</strong> Blockchain technology, smart contracts, 
                and digital wallets may have vulnerabilities or fail.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Custody Risk:</strong> Digital assets may be lost, stolen, or 
                inaccessible due to technical issues or security breaches.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Market Manipulation:</strong> Cryptocurrency markets may be 
                subject to manipulation, fraud, or other illegal activities.
              </li>
            </ul>
          </div>
        </section>

        {/* Suitability & Investor Qualifications */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            6. Investor Suitability Requirements
          </h2>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-600 p-6 rounded-lg">
            <p className="text-base leading-7 mb-4 text-gray-800 dark:text-gray-200">
              <strong className="text-gray-900 dark:text-white">Before investing, you should:</strong>
            </p>
            <ul className="space-y-3 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>Understand the risks involved in hedge fund and alternative investments</li>
              <li>Have sufficient financial resources to bear the risk of total loss</li>
              <li>Have investment experience and knowledge appropriate for these investments</li>
              <li>Seek independent financial, legal, and tax advice</li>
              <li>Only invest funds that you can afford to lose entirely</li>
              <li>Understand that investments are not suitable for all investors</li>
            </ul>
          </div>
        </section>

        {/* No Guarantees */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            7. Important Disclaimers
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="space-y-4 list-disc pl-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">No Investment Advice:</strong> Information provided on this 
                platform does not constitute investment, financial, legal, or tax advice.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">No Guarantees:</strong> We do not guarantee any returns, 
                performance, or the safety of your investments.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Not FDIC Insured:</strong> Investments are not insured by the 
                FDIC, SIPC, or any government agency.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Not Bank Deposits:</strong> Investments are not bank deposits 
                and are not covered by deposit insurance.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Regulatory Status:</strong> Evermount Capital operates as a 
                technology platform. Investment services may be provided by licensed 
                third-party entities.
              </li>
            </ul>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Investor Acknowledgment
          </h2>
          <p className="text-base leading-7 text-gray-800 dark:text-gray-200">
            By using Evermount Capital&apos;s platform and investing through our services, 
            you acknowledge that you have read, understood, and accept all risks 
            disclosed in this statement. You confirm that you are capable of evaluating 
            the merits and risks of these investments and that you have sufficient 
            financial resources to bear the risk of loss.
          </p>
          <p className="text-base leading-7 text-gray-800 dark:text-gray-200 mt-4">
            <strong className="text-gray-900 dark:text-white">
              If you do not understand or accept these risks, you should not invest 
              through this platform.
            </strong>
          </p>
        </section>

        {/* Contact */}
        <footer className="pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Questions about risks? Contact us at{" "}
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

