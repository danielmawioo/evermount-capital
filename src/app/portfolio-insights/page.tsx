"use client";

import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function PortfolioInsightsPage() {
  return (
    <main className="px-6 py-20 max-w-7xl mx-auto text-gray-900 dark:text-white bg-white dark:bg-gray-900">
      {/* Enhanced Structured Data */}
      <Script
        id="portfolio-insights-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Portfolio Insights",
            url: "https://www.evermount.co/portfolio-insights",
            description:
              "Explore portfolio growth, performance metrics, and capital risk breakdown through the Evermount insights dashboard.",
            isPartOf: {
              "@type": "WebSite",
              name: "Evermount Capital",
              url: "https://www.evermount.co",
            },
            mainEntity: {
              "@type": "FinancialProduct",
              name: "Portfolio Analytics Dashboard",
              description:
                "Real-time portfolio performance tracking with risk metrics, return analysis, and benchmark comparisons.",
            },
          }),
        }}
      />

      {/* INTRO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Portfolio Insights That Drive Performance
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Visualize risk-adjusted returns, monitor drawdowns, and compare
          benchmarks — everything you need to make confident capital decisions.
        </p>
      </motion.section>

      {/* METRICS GRID */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
      >
        {[
          { label: "Annualized Return", value: "18.5%" },
          { label: "Volatility Index", value: "3.7%" },
          { label: "Max Drawdown", value: "-5.2%" },
          { label: "Sharpe Ratio", value: "1.98" },
        ].map(({ label, value }, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-3xl font-bold text-[#00a76f]">{value}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* CHART + INSIGHTS */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Growth Curve Analysis</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Track cumulative returns versus benchmark indices and understand how
            algorithmic rebalancing improves long-term performance.
          </p>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2"
          >
            {[
              "Dynamic capital allocation models",
              "Compounded monthly return visualization",
              "Comparative benchmark overlays",
            ].map((item, i) => (
              <motion.li key={i} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/images/portfolio/line-chart.png"
            alt="Growth Chart"
            width={800}
            height={500}
            className="rounded-xl shadow-xl w-full h-auto"
          />
        </motion.div>
      </section>

      {/* RISK INSIGHTS */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/images/portfolio/pie-risk.png"
            alt="Risk Chart"
            width={800}
            height={500}
            className="rounded-xl shadow-xl w-full h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Risk Distribution</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Understand your capital&apos;s exposure across market sectors, asset
            classes, and volatility groups — in real-time.
          </p>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2"
          >
            {[
              "Global equities vs. African mid-cap split",
              "Risk-index optimization tools",
              "Rebalancing notifications & alerts",
            ].map((item, i) => (
              <motion.li key={i} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Real Insights. Smarter Capital Decisions.
        </h3>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          Access your personalized dashboard today and unlock deeper control
          over your portfolio&apos;s performance and risk profile.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#00a76f] text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition shadow-sm hover:shadow-md"
        >
          Get Access
        </motion.button>
      </motion.section>
    </main>
  );
}
