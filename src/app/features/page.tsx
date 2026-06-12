"use client";

import {
  CheckCircleIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
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

export default function FeaturesPage() {
  return (
    <main className="px-6 py-24 max-w-7xl mx-auto space-y-28 text-gray-900 dark:text-white">
      {/* ✅ JSON-LD structured data for search engines */}
      <Script
        id="ld-json-features"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Platform Features",
            url: "https://evermount.co/features",
            description:
              "Explore the proprietary strategies and infrastructure powering Evermount Capital's hedge fund performance.",
            isPartOf: {
              "@type": "WebSite",
              name: "Evermount Capital",
              url: "https://evermount.co",
            },
          }),
        }}
      />

      {/* SECTION 1 - Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Platform Built for Performance
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Dive into the tech stack and strategies that drive speed, accuracy,
          and transparency across every Evermount strategy.
        </p>
      </motion.section>

      {/* SECTION 2 - Feature Cards */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: CpuChipIcon,
            title: "Quantitative Trading Models",
            desc: "Systematic, data-driven execution powered by proprietary algorithms. Trained on decades of financial data.",
          },
          {
            icon: ChartBarIcon,
            title: "Real-Time Dashboards",
            desc: "Access live metrics, performance charts, and allocations anytime, anywhere.",
          },
          {
            icon: CheckCircleIcon,
            title: "Compliance Intelligence",
            desc: "Built for security, audited regularly, and aligned with global financial regulations.",
          },
        ].map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg"
          >
            <Icon className="w-10 h-10 mx-auto text-[#00a76f] mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* SECTION 3 - AI Strategy Overview */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-14">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Quantitative Research Meets Systematic Execution
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Our proprietary quantitative models analyze market patterns, volatility regimes,
            and cross-asset relationships to generate alpha through systematic execution
            across global markets.
          </p>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 text-gray-800 dark:text-gray-200 text-sm"
          >
            {[
              "Statistical pattern recognition based on decades of market data",
              "Dynamic volatility regime detection and portfolio rebalancing",
              "Systematic strategy optimization with real-time risk monitoring",
            ].map((item, i) => (
              <motion.li key={i} variants={itemVariants} className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-[#00a76f] mt-0.5 flex-shrink-0" />
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
          className="md:w-1/2"
        >
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image
              src="/images/section3.png"
              alt="AI Engine and Platform Tools"
              width={600}
              height={400}
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 4 - RISK METRICS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 dark:bg-gray-800 py-20 px-6 rounded-2xl shadow-inner"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Risk Metrics & Capital Protection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            At Evermount, we don&apos;t just chase performance — we prioritize
            preservation through quant analysis, AI stress testing, and smart
            diversification.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10 text-left"
          >
            {[
              {
                title: "Quantitative Risk Indexing",
                desc: "Every client portfolio is assigned a risk-weighted index, dynamically updated as market conditions shift.",
                icon: ShieldCheckIcon,
              },
              {
                title: "Backtested Volatility Control",
                desc: "We simulate thousands of trading scenarios across historical datasets to avoid drawdowns before they occur.",
                icon: ChartBarIcon,
              },
              {
                title: "Live Stress Testing Models",
                desc: "AI stress scenarios run continuously to detect unusual volatility, ensuring proactive allocation rebalancing.",
                icon: CpuChipIcon,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <Icon className="w-8 h-8 text-[#00a76f] mb-4" />
                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
