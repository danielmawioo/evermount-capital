import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const METRICS = [
  { value: "18.5%", label: "Annualized Returns" },
  { value: "$300K", label: "Assets Under Management" },
  { value: "82", label: "Investor Partners" },
];

export default function PerformanceMetricsSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Performance Snapshot
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-8 text-center"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: "spring",
                }}
                className="text-4xl md:text-5xl font-extrabold text-[#00a76f]"
              >
                {metric.value}
              </motion.h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
