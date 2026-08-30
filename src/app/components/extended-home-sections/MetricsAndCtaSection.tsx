"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const PERFORMANCE_METRICS = [
  {
    metric: "AI Financial Intelligence",
    label: "Understanding markets",
    icon: CpuChipIcon,
    desc: "Understanding markets through data, machine learning and intelligent systems.",
  },
  {
    metric: "Quantitative Research",
    label: "Discovering strategies",
    icon: ChartBarIcon,
    desc: "Discovering and validating systematic financial strategies.",
  },
  {
    metric: "Risk Intelligence",
    label: "Measuring uncertainty",
    icon: ShieldCheckIcon,
    desc: "Continuously measuring exposure, uncertainty and market risk.",
  },
  {
    metric: "Intelligent Execution",
    label: "Controlled action",
    icon: BoltIcon,
    desc: "Turning validated decisions into systematic, controlled execution.",
  },
];

export default function MetricsAndCtaSection() {
  return (
    <>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Evermount Intelligence Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Four capabilities that turn financial data into intelligence,
            research, risk decisions and execution.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERFORMANCE_METRICS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gradient-to-br from-[#00a76f]/10 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl text-center border border-[#00a76f]/20 dark:border-gray-700"
            >
              <stat.icon className="w-12 h-12 text-[#00a76f] mx-auto mb-4" />
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1 + 0.2,
                  type: "spring",
                }}
                className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-2"
              >
                {stat.metric}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                {stat.label}
              </p>
              {stat.desc && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {stat.desc}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-[#00a76f] to-emerald-600 text-white relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Building the Future of African Financial Markets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Evermount is building the AI financial intelligence and trading
            infrastructure that will power the next generation of African
            financial markets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/platform">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#00a76f] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Explore the Platform
              </motion.button>
            </Link>
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Partner With Evermount
              </motion.button>
            </Link>
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white/70 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Talk to Our Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
