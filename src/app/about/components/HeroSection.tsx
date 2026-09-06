"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <TranslateTree>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Building the Infrastructure for Modern Financial Markets
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Evermount is a financial technology company building infrastructure
          for market data, quantitative research, artificial intelligence, risk
          and execution.
        </p>
      </motion.section>
    </TranslateTree>
  );
}
