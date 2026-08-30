"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  BoltIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const TECHNOLOGY_PILLARS = [
  {
    icon: CpuChipIcon,
    title: "AI Financial Intelligence",
    description:
      "AI systems analyze market information, news, macroeconomic conditions and alternative data to generate structured financial intelligence.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ChartBarIcon,
    title: "Quantitative Research Engine",
    description:
      "Research infrastructure for factor discovery, hypothesis generation, backtesting, simulation and systematic strategy development.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: CircleStackIcon,
    title: "Market Data Infrastructure",
    description:
      "Unified financial data pipelines designed to support research, analytics and real-time decision systems.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk Intelligence Engine",
    description:
      "Real-time monitoring of exposure, liquidity, volatility, correlation, drawdown and market regimes.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BoltIcon,
    title: "High-Performance Execution",
    description:
      "Systematic execution infrastructure designed for reliability, speed and controlled deployment.",
    color: "from-amber-500 to-orange-500",
  },
];

const SECURITY_FEATURES = [
  "256-bit AES encryption for data at rest and in transit",
  "Multi-factor authentication and role-based access controls",
  "Independent risk oversight and compliance monitoring",
];

export default function TechnologyAndSecuritySection() {
  return (
    <>
      <section id="technology" className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The Evermount Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              An AI-forward stack designed to turn financial data into
              intelligence, validated research, risk decisions and controlled
              execution.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TECHNOLOGY_PILLARS.map((tech, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6`}
                >
                  <tech.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">
                Security First
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Institutional-Grade Infrastructure & Risk Controls
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We&apos;re building our infrastructure to the highest standards
              of operational excellence, security, and risk management as we
              scale.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {SECURITY_FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <LockClosedIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/section2.png"
                alt="Institutional infrastructure and risk controls"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
