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
          Building the AI Financial Intelligence Company for Africa
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Evermount is the AI financial intelligence and trading infrastructure
          company for Africa. We build systems that understand markets, manage
          risk and execute capital — and we apply that platform to Evermount
          Capital as one product, not the whole firm.
        </p>
      </motion.section>
    </TranslateTree>
  );
}
