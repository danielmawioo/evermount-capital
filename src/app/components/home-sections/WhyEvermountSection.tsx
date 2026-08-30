"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const POINTS = [
  "AI-powered market intelligence",
  "Quantitative strategy research",
  "Automated backtesting and simulation",
  "Portfolio optimization",
  "Real-time risk intelligence",
  "Systematic execution",
  "Market-making infrastructure",
  "African market connectivity",
];

export default function WhyEvermountSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="md:w-1/2 relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <Image
            src="/images/section3.png"
            alt="Evermount intelligence to execution"
            width={600}
            height={400}
            className="rounded-xl shadow-xl max-w-full h-auto"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-t from-[#00a76f]/20 to-transparent rounded-xl"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 space-y-6"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          From Financial Intelligence to Execution
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Evermount combines artificial intelligence, quantitative research and
          trading infrastructure to create intelligent systems capable of
          continuously analyzing markets, discovering opportunities, managing
          risk and executing systematic strategies.
        </p>
        {POINTS.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex items-start gap-4"
          >
            <CheckCircleIcon className="w-6 h-6 text-[#00a76f] mt-1 flex-shrink-0" />
            <p className="text-lg text-gray-700 dark:text-gray-300">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
