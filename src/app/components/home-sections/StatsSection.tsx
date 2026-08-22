"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const STATS = [
  { value: "82", label: "Investor Partners" },
  { value: "$300K", label: "Assets Under Management" },
  { value: "18.5%", label: "Annualized Returns" },
  { value: "40+", label: "Global Markets" },
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
          Our Numbers Speak For Themselves
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-12"
        >
          {STATS.map((item, i) => (
            <motion.div key={i} variants={itemVariants}>
              <p className="text-4xl font-extrabold text-[#00a76f]">
                {item.value}
              </p>
              <p className="text-lg lg:text-xl text-gray-300 dark:text-gray-400 mt-2">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
