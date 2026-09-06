"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const STATS = [
  {
    value: "Market Data",
    label: "Real-time and historical market data infrastructure.",
  },
  {
    value: "Quant Research",
    label: "Research, modeling, simulation and backtesting infrastructure.",
  },
  {
    value: "AI & Intelligence",
    label:
      "Machine learning, market intelligence, signal generation and analytics.",
  },
  {
    value: "Risk",
    label: "Real-time exposure, limits, monitoring and stress testing.",
  },
  {
    value: "Execution",
    label: "Algorithmic execution, order management and execution analytics.",
  },
  {
    value: "Connectivity",
    label:
      "Infrastructure connecting institutions, brokers, venues and financial systems.",
  },
];

export default function StatsSection() {
  return (
    <TranslateTree>
      <section id="platform-overview" className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d1b2a] dark:bg-gray-800 rounded-2xl py-20 px-6 md:px-20 text-white text-center shadow-lg"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            The Infrastructure Behind Modern Markets
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 text-lg">
            Build, connect, analyze and execute across financial markets using
            Evermount infrastructure.
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {STATS.map((item) => (
              <motion.div key={item.value} variants={itemVariants}>
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
    </TranslateTree>
  );
}
