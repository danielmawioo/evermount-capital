"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import {
  BoltIcon,
  ChartBarIcon,
  CpuChipIcon,
  GlobeAltIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const HIGHLIGHTS = [
  {
    icon: ChartBarIcon,
    title: "Market Data",
    desc: "Real-time and historical market data infrastructure.",
  },
  {
    icon: PresentationChartLineIcon,
    title: "Quantitative Research",
    desc: "Research, modeling, simulation and backtesting infrastructure.",
  },
  {
    icon: CpuChipIcon,
    title: "AI & Intelligence",
    desc: "Machine learning, market intelligence, signal generation and analytics.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk",
    desc: "Real-time exposure, limits, monitoring and stress testing.",
  },
  {
    icon: BoltIcon,
    title: "Execution",
    desc: "Algorithmic execution, order management and execution analytics.",
  },
  {
    icon: GlobeAltIcon,
    title: "Connectivity",
    desc: "Infrastructure connecting institutions, brokers, venues and financial systems.",
  },
];

export default function KeyHighlightsSection() {
  return (
    <TranslateTree>
    <section id="quant-research" className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          What Evermount Builds
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Data, quantitative research, intelligence, risk, execution and
          connectivity infrastructure for modern financial markets.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
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
  
    </TranslateTree>
  );
}
