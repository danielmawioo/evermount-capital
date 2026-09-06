"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const CAPABILITIES = [
  "Real-time market data",
  "Historical market datasets",
  "Quantitative research",
  "AI analytics",
  "Backtesting",
  "Portfolio analytics",
  "Risk management",
  "Execution infrastructure",
  "Market connectivity",
  "APIs",
  "WebSockets",
  "Institutional integrations",
  "Monitoring and observability",
];

export default function InfrastructureCapabilitiesSection() {
  return (
    <TranslateTree>
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Infrastructure Capabilities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Capabilities of the Evermount platform. Specific availability
            depends on access tier and jurisdiction.
          </p>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 text-gray-700 dark:text-gray-300 text-lg"
          >
            {CAPABILITIES.map((point) => (
              <motion.li
                key={point}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircleIcon className="w-5 h-5 text-[#00a76f] mt-1 flex-shrink-0" />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </TranslateTree>
  );
}
