import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const STEPS = [
  {
    icon: "/icons/data-analysis.svg",
    title: "Data-Driven Research",
    description:
      "We analyze millions of data points using machine learning to identify patterns in global markets.",
  },
  {
    icon: "/icons/ai-trade.svg",
    title: "Systematic Execution",
    description:
      "Proprietary quantitative models execute trades systematically using rigorous signal generation and validation.",
  },
  {
    icon: "/icons/dashboard.svg",
    title: "Transparent Reporting",
    description:
      "Track performance in real-time via your personalized investor dashboard on web and mobile.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        How It Works
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 text-center"
      >
        {STEPS.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
          >
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={item.icon}
              alt={item.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
