"use client";

import { motion } from "framer-motion";
import {
  BoltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const HIGHLIGHTS = [
  {
    icon: CurrencyDollarIcon,
    title: "Transparent Fee Structure",
    desc: "Clear management and performance fees aligned with investor interests.",
  },
  {
    icon: BoltIcon,
    title: "Systematic Execution",
    desc: "Proprietary algorithms executing trades with precision and speed.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Multi-Asset Class Access",
    desc: "Diversified exposure across equities, fixed income, currencies, and commodities.",
  },
  {
    icon: DocumentChartBarIcon,
    title: "Real-Time Portfolio Analytics",
    desc: "Institutional-grade dashboards with comprehensive performance metrics.",
  },
  {
    icon: DocumentChartBarIcon,
    title: "Quarterly Performance Reports",
    desc: "Detailed attribution analysis and risk-adjusted return reporting.",
  },
  {
    icon: UserGroupIcon,
    title: "Dedicated Relationship Management",
    desc: "Direct access to portfolio managers and research team.",
  },
];

export default function KeyHighlightsSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Key Highlights
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Power up your investing journey with Evermount&apos;s most valuable
          features.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {HIGHLIGHTS.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            <Icon className="h-8 w-8 text-[#00a76f] mb-4" />
            <h4 className="text-xl font-semibold text-[#00a76f] mb-2">
              {title}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-base">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
