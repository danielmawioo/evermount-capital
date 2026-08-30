"use client";

import { motion } from "framer-motion";

const LAYERS = [
  { key: "Data", label: "Data" },
  { key: "Intelligence", label: "Intelligence" },
  { key: "Research", label: "Research" },
  { key: "Risk", label: "Risk" },
  { key: "Execution", label: "Execution" },
];

export default function IntelligenceStack() {
  return (
    <section
      id="intelligence-stack"
      className="py-20 max-w-6xl mx-auto px-6 text-center"
    >
      <p className="text-[#00a76f] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
        The Evermount Intelligence Stack
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        DATA → INTELLIGENCE → RESEARCH → RISK → EXECUTION
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
        A unified technology stack designed to transform financial data into
        intelligence, quantitative strategies, risk decisions and systematic
        execution.
      </p>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-2">
        {LAYERS.map((layer, i) => (
          <div key={layer.key} className="flex items-center gap-2 md:gap-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex-1 md:w-36 lg:w-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-[#0d1b2a] dark:bg-gray-800 px-4 py-5 text-white shadow-md"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#00a76f] mb-1">
                Layer {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-lg font-semibold">{layer.label}</p>
            </motion.div>
            {i < LAYERS.length - 1 && (
              <span
                aria-hidden
                className="hidden md:inline text-[#00a76f] font-bold text-xl"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
