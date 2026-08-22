"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const PERFORMANCE_METRICS = [
  { metric: "1.85+", label: "Information Ratio", icon: ChartBarIcon, desc: "Risk-adjusted performance metric" },
  { metric: "$300K", label: "Assets Under Management", icon: CurrencyDollarIcon, desc: "Growing portfolio" },
  { metric: "0.35", label: "Maximum Drawdown", icon: ShieldCheckIcon, desc: "Capital preservation focus" },
  { metric: "15%+", label: "Annualized Alpha", icon: BoltIcon, desc: "Excess returns vs benchmark" },
];

export default function MetricsAndCtaSection() {
  return (
    <>
      {/* === SUCCESS METRICS === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Metrics & Track Record
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Consistent risk-adjusted returns across various market conditions, demonstrating
            the robustness of our quantitative strategies.
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
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2, type: "spring" }}
                className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2"
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

      {/* === CALL TO ACTION === */}
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
            Partner with a Systematic Investment Leader
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Discover how quantitative excellence and systematic strategies can enhance your
            investment portfolio. Schedule a consultation to learn more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#00a76f] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Schedule a Demo
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Get Started Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
