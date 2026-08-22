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
      "We remove human emotion and bias from investment decisions through entirely systematic processes. Every strategy is built on rigorous quantitative research and validated through extensive backtesting.",
  },
  {
    icon: ChartBarIcon,
    title: "Multi-Strategy Diversification",
    description:
      "Our portfolios span multiple asset classes including equities, fixed income, currencies, and commodities. This diversification helps capture alpha across different market regimes while managing risk.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk-First Philosophy",
    description:
      "Capital preservation is paramount. Our multi-layered risk management framework continuously monitors portfolio exposure and automatically adjusts positions to maintain target risk parameters.",
  },
];

const CORE_VALUES = [
  {
    title: "Transparency",
    description:
      "We believe in complete transparency with our investors. Regular reporting, clear communication, and open dialogue about our strategies and performance.",
  },
  {
    title: "Innovation",
    description:
      "We continuously invest in research and technology to stay at the forefront of quantitative finance, ensuring our strategies remain competitive and effective.",
  },
  {
    title: "Integrity",
    description:
      "Ethical conduct and regulatory compliance are non-negotiable. We operate with the highest standards of professionalism and accountability.",
  },
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do—from research and technology to client service and risk management. Good enough is never enough.",
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
          Our Investment Approach
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
          Our Core Values
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
