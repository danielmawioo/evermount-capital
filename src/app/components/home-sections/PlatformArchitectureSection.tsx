"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LAYERS = [
  ["Market Data"],
  ["Data Platform"],
  ["Quant Research + AI"],
  ["Risk Engine"],
  ["Execution Engine"],
  ["Brokers / Exchanges / Venues"],
  ["Financial Applications"],
];

export default function PlatformArchitectureSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        className="md:w-1/2 relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
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
            alt="Evermount financial intelligence platform"
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
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Evermount Platform
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          A conceptual architecture connecting AI, research, risk and
          execution into one institutional technology platform.
        </p>
        <div className="rounded-2xl bg-[#0d1b2a] text-white p-6 space-y-3 font-mono text-sm shadow-lg">
          <div className="text-center text-[#00a76f] font-semibold tracking-[0.2em] text-xs uppercase">
            Evermount AI
          </div>
          <div className="h-px bg-[#00a76f]/40 mx-auto w-8" />
          {LAYERS.map((row, i) => (
            <div key={i}>
              <div
                className={`grid gap-2 ${
                  row.length === 3 ? "grid-cols-3" : "grid-cols-1"
                }`}
              >
                {row.map((node) => (
                  <div
                    key={node}
                    className="rounded-lg border border-[#00a76f]/30 bg-[#11263a] px-3 py-3 text-center text-xs sm:text-sm"
                  >
                    {node}
                  </div>
                ))}
              </div>
              {i < LAYERS.length - 1 && (
                <div className="text-center text-[#00a76f] py-1" aria-hidden>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
