import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const APPROACH_ITEMS = [
  {
    icon: CpuChipIcon,
    title: "Systematic & Data-Driven",
    description:
      "We design systems around data quality, research evidence and measurable risk — not discretionary fund marketing.",
  },
  {
    icon: ChartBarIcon,
    title: "API First",
    description:
      "Financial infrastructure should be programmable. APIs, streaming and integrations are first-class.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk First",
    description:
      "Risk controls should be embedded directly into systems, including pre-trade and real-time monitoring.",
  },
];

const CORE_VALUES = [
  {
    title: "Infrastructure First",
    description:
      "Build reliable foundations before financial applications.",
  },
  {
    title: "Data Driven",
    description:
      "High-quality financial infrastructure begins with high-quality data.",
  },
  {
    title: "Globally Oriented",
    description:
      "Build infrastructure that can operate across markets and jurisdictions.",
  },
  {
    title: "Technology Driven",
    description:
      "Use modern engineering, quantitative methods and AI to solve complex financial problems.",
  },
];

export default function ApproachAndValuesSection() {
  return (
    <>
      {/* Our Approach */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Technology Approach
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {APPROACH_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <item.icon className="w-10 h-10 text-[#00a76f] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CORE_VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <CheckCircleIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
}
