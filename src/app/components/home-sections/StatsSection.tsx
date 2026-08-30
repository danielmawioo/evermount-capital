"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const STATS = [
  {
    value: "Financial Data",
    label:
      "Market, macroeconomic, fundamental and alternative data unified into a research-ready intelligence layer.",
  },
  {
    value: "AI & Machine Intelligence",
    label:
      "Machine learning and AI systems designed to understand market behavior and identify patterns across financial data.",
  },
  {
    value: "Quantitative Research",
    label:
      "Research, factor discovery, simulation, backtesting and strategy validation.",
  },
  {
    value: "Risk & Execution",
    label:
      "Real-time risk controls and systematic execution built for institutional financial systems.",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#0d1b2a] dark:bg-gray-800 rounded-2xl py-20 px-6 md:px-20 text-white text-center shadow-lg"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-12">
          The Intelligence Infrastructure Behind Evermount
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {STATS.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <p className="text-xl sm:text-2xl font-extrabold text-[#00a76f]">
                {item.value}
              </p>
              <p className="text-base lg:text-lg text-gray-300 dark:text-gray-400 mt-3 leading-relaxed">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
