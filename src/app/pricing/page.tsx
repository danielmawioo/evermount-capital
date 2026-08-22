"use client";

import Script from "next/script";
import { motion } from "framer-motion";
export default function PricingPage() {
  const tiers = [
    {
      size: "$10,000",
      managementFee: "2.5%",
      performanceFee: "20%",
      targetReturn: "12-18%",
      sharpeRatio: "1.5+",
      maxDrawdown: "15%",
      strategies: "Core Strategies",
      dashboard: true,
      reporting: "Quarterly",
      support: "Email Support",
      minPeriod: "6 Months",
    },
    {
      size: "$50,000",
      managementFee: "2.0%",
      performanceFee: "20%",
      targetReturn: "15-22%",
      sharpeRatio: "1.7+",
      maxDrawdown: "12%",
      strategies: "Enhanced Strategies",
      dashboard: true,
      reporting: "Monthly",
      support: "Priority Support",
      minPeriod: "6 Months",
    },
    {
      size: "$250,000",
      managementFee: "1.5%",
      performanceFee: "20%",
      targetReturn: "18-25%",
      sharpeRatio: "1.9+",
      maxDrawdown: "10%",
      strategies: "Premium Strategies",
      dashboard: true,
      reporting: "Monthly + Custom",
      support: "Dedicated Manager",
      minPeriod: "6 Months",
    },
    {
      size: "$1,000,000+",
      managementFee: "1.0%",
      performanceFee: "20%",
      targetReturn: "20-30%",
      sharpeRatio: "2.0+",
      maxDrawdown: "8%",
      strategies: "Institutional Strategies",
      dashboard: true,
      reporting: "Monthly + Custom",
      support: "Dedicated Team",
      minPeriod: "6 Months",
    },
  ];

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hedge Fund Investment Services",
    provider: {
      "@type": "FinancialService",
      name: "Evermount Capital",
      url: "https://www.evermount.co",
    },
    areaServed: "Worldwide",
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.size} Investment Tier`,
      price: tier.size,
      priceCurrency: "USD",
      description: `Investment tier with ${tier.managementFee} management fee, ${tier.performanceFee} performance fee, ${tier.targetReturn} target annual return, and ${tier.support} support.`,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    })),
  };

  return (
    <main className="px-6 py-20 max-w-7xl mx-auto">
      {/* Enhanced Structured Data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Investment Minimums & Fee Structure
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          Institutional-grade quantitative strategies with transparent fee
          structures. Performance fees align our interests with yours.
        </p>
      </motion.section>

      {/* TABLE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-x-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="min-w-full text-sm text-center border-collapse">
            <thead className="bg-[#00a76f] text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left bg-[#008d5e]">Feature</th>
                {tiers.map((tier, i) => (
                  <motion.th
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="px-6 py-4"
                  >
                    {tier.size}
                    <div className="text-sm font-semibold mt-1 text-white/90">
                      Minimum Investment
                    </div>
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { label: "Management Fee (Annual)", key: "managementFee" },
                { label: "Performance Fee", key: "performanceFee" },
                { label: "Target Annual Return", key: "targetReturn" },
                { label: "Target Sharpe Ratio", key: "sharpeRatio" },
                { label: "Maximum Drawdown", key: "maxDrawdown" },
                { label: "Strategy Access", key: "strategies" },
                {
                  label: "Portfolio Dashboard",
                  key: "dashboard",
                  type: "boolean",
                },
                { label: "Performance Reporting", key: "reporting" },
                { label: "Minimum Lock-In Period", key: "minPeriod" },
                { label: "Client Support", key: "support" },
              ].map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(0, 167, 111, 0.05)" }}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  }
                >
                  <td className="py-4 px-6 text-left font-medium text-gray-900 dark:text-white">
                    {row.label}
                  </td>
                  {tiers.map((tier, j) => (
                    <motion.td
                      key={j}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 + j * 0.1 }}
                      className="py-4 px-6"
                    >
                      {row.type === "boolean"
                        ? tier[row.key as keyof typeof tier]
                          ? "✅"
                          : "❌"
                        : tier[row.key as keyof typeof tier]}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center space-y-4"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Performance fees are calculated on realized profits only. Management
          fees are charged quarterly in advance.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">
          All investments are subject to our standard terms and risk disclosure.
          Past performance does not guarantee future results.
        </p>
      </motion.div>
    </main>
  );
}
