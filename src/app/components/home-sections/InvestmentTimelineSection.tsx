"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STEPS = [
  {
    title: "01 — Understand",
    desc: "Our systems ingest and analyze market, macroeconomic, fundamental and alternative data.",
  },
  {
    title: "02 — Discover",
    desc: "AI and quantitative research systems identify patterns, opportunities and potential strategies.",
  },
  {
    title: "03 — Manage Risk",
    desc: "Institutional-grade risk systems evaluate exposure, liquidity, volatility, correlation and downside scenarios.",
  },
  {
    title: "04 — Execute",
    desc: "Validated strategies move through systematic execution infrastructure with defined controls and monitoring.",
  },
];

export default function InvestmentTimelineSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
      >
        How Evermount Turns Intelligence Into Action
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 space-y-12 border-l-4 border-[#00a76f] pl-6"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="md:w-1/2 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Image
              src="/images/section3.png"
              alt="Intelligence to execution pipeline"
              width={600}
              height={400}
              className="rounded-xl shadow-xl max-w-full h-auto"
            />
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-[#00a76f]/20 via-transparent to-emerald-400/20 rounded-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
