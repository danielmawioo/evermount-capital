"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const TECHNOLOGY_PILLARS = [
  {
    icon: CpuChipIcon,
    title: "Quantitative Research & Modeling",
    description:
      "Advanced statistical models and machine learning algorithms trained on decades of market data to generate consistent alpha.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ChartBarIcon,
    title: "High-Performance Computing",
    description:
      "Ultra-low latency infrastructure processing millions of market events per second for real-time portfolio optimization.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: ShieldCheckIcon,
    title: "Systematic Risk Management",
    description:
      "Multi-layered risk framework with real-time monitoring and automatic position adjustments to protect capital.",
    color: "from-green-500 to-emerald-500",
  },
];

const SECURITY_FEATURES = [
  "256-bit AES encryption for data at rest and in transit",
  "Segregated client accounts with independent custodians",
  "Multi-factor authentication and role-based access controls",
  "SOC 2 Type II certified, GDPR compliant, MiFID II regulated",
  "24/7 security operations center and real-time monitoring",
  "Independent risk oversight and compliance monitoring",
];

export default function TechnologyAndSecuritySection() {
  return (
    <>
      {/* === TECHNOLOGY & PLATFORM === */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Proprietary Technology & Research Infrastructure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our technology stack processes terabytes of data daily, executing
              millions of calculations per second to identify alpha
              opportunities across global markets.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
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

      {/* === SECURITY & COMPLIANCE === */}
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
              We operate with the highest standards of operational excellence,
              security, and regulatory compliance. Our infrastructure handles
              institutional-scale assets with robust risk management and client
              protection measures.
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
                alt="Security"
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
