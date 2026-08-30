"use client";

import { motion } from "framer-motion";
import {
  BeakerIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const AGENTS = [
  {
    icon: BeakerIcon,
    title: "Research Agent",
    desc: "Investigates market data, generates hypotheses and assists quantitative researchers.",
  },
  {
    icon: ChartBarIcon,
    title: "Market Intelligence Agent",
    desc: "Continuously monitors markets, news, macroeconomic events and emerging signals.",
  },
  {
    icon: PresentationChartLineIcon,
    title: "Portfolio Intelligence Agent",
    desc: "Analyzes portfolio behavior, exposure, correlations and changing market regimes.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk Agent",
    desc: "Identifies potential risks, stress scenarios and abnormal market behavior.",
  },
];

export default function EvermountAiSection() {
  return (
    <section id="evermount-ai" className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-[#00a76f] font-semibold tracking-[0.18em] uppercase text-sm mb-3">
          Meet the Intelligence Layer
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Evermount AI
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          An AI-native intelligence layer designed to help financial systems
          understand markets, research opportunities and make better
          risk-aware decisions.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.title}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <agent.icon className="w-10 h-10 text-[#00a76f] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {agent.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {agent.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
