"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const FUND_POINTS = [
  "Management Fee: 1.5% - 2.5%",
  "Performance Fee: 20% of profits",
  "Minimum Investment: $10,000",
  "Quarterly Performance Reports",
  "6 Month Lock-In Period",
  "USD + Multi-Currency Support",
];

export default function FundHighlightsSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        className="md:w-1/2 relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <Image
            src="/images/section2.png"
            alt="Fund Features"
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
              delay: 0.5,
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#00a76f]/20 to-transparent rounded-xl"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          Fund Highlights
        </h2>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5 text-gray-700 dark:text-gray-300 text-lg"
        >
          {FUND_POINTS.map((point, i) => (
            <motion.li
              key={i}
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
  );
}
