"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  BoltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FiShield, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomeSectionsWithImages() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* === OUR NUMBERS SPEAK === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d1b2a] dark:bg-gray-800 rounded-2xl py-20 px-6 md:px-20 text-white text-center shadow-lg"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">
            Our Numbers Speak For Themselves
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-12"
          >
            {[
              { value: "80", label: "Investor Partners" },
              { value: "$300K", label: "Assets Under Management" },
              { value: "18.5%", label: "Annualized Returns" },
              { value: "40+", label: "Global Markets" },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <p className="text-4xl font-extrabold text-[#00a76f]">
                  {item.value}
                </p>
                <p className="text-lg lg:text-xl text-gray-300 dark:text-gray-400 mt-2">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* === KEY HIGHLIGHTS === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Key Highlights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Power up your investing journey with Evermount's most valuable
            features.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {[
            {
              icon: CurrencyDollarIcon,
              title: "Transparent Fee Structure",
              desc: "Clear management and performance fees aligned with investor interests.",
            },
            {
              icon: BoltIcon,
              title: "Systematic Execution",
              desc: "Proprietary algorithms executing trades with precision and speed.",
            },
            {
              icon: DevicePhoneMobileIcon,
              title: "Multi-Asset Class Access",
              desc: "Diversified exposure across equities, fixed income, currencies, and commodities.",
            },
            {
              icon: DocumentChartBarIcon,
              title: "Real-Time Portfolio Analytics",
              desc: "Institutional-grade dashboards with comprehensive performance metrics.",
            },
            {
              icon: DocumentChartBarIcon,
              title: "Quarterly Performance Reports",
              desc: "Detailed attribution analysis and risk-adjusted return reporting.",
            },
            {
              icon: UserGroupIcon,
              title: "Dedicated Relationship Management",
              desc: "Direct access to portfolio managers and research team.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-800 p-10 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <Icon className="h-8 w-8 text-[#00a76f] mb-4" />
              <h4 className="text-xl font-semibold text-[#00a76f] mb-2">
                {title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-base">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === WHY EVERMOUNT === */}
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
              alt="Why Evermount"
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
          className="md:w-1/2 space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Systematic Investment Excellence
          </h2>
          {[
            "Proprietary quantitative models with machine learning and statistical arbitrage",
            "Institutional-grade risk management and portfolio optimization",
            "Global market access across multiple asset classes",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <CheckCircleIcon className="w-6 h-6 text-[#00a76f] mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-700 dark:text-gray-300">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === FUND HIGHLIGHTS === */}
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
            {[
              "Management Fee: 1.5% - 2.5%",
              "Performance Fee: 20% of profits",
              "Minimum Investment: $10,000",
              "Quarterly Performance Reports",
              "Audited & Regulated",
              "6 Month Lock-In Period",
              "USD + Multi-Currency Support",
            ].map((point, i) => (
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

      {/* === INVESTMENT TIMELINE === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-12"
        >
          How We Manage Your Capital
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-12 border-l-4 border-[#00a76f] pl-6"
          >
            {[
              {
                title: "Step 1 – Investor Onboarding",
                desc: "KYC verification, risk profiling, and investment mandate alignment.",
              },
              {
                title: "Step 2 – Portfolio Allocation",
                desc: "Systematic allocation across quantitative strategies based on risk-return objectives.",
              },
              {
                title: "Step 3 – Systematic Execution",
                desc: "Proprietary algorithms execute trades across global markets with precision.",
              },
              {
                title: "Step 4 – Performance Monitoring",
                desc: "Real-time portfolio analytics and quarterly performance attribution reports.",
              },
            ].map((step, i) => (
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
                alt="Capital Management"
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

      {/* === FINAL CTA === */}
      <section className="relative py-32 px-6 bg-white dark:bg-gray-900 text-center overflow-hidden">
        {/* Decorative Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-80px] left-[30%] w-[250px] h-[250px] bg-[#00a76f22] dark:bg-[#00a76f33] rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[-60px] right-[20%] w-[200px] h-[200px] bg-[#00a76f33] dark:bg-[#00a76f44] rounded-full blur-2xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* React Icons Badge Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-12 flex-wrap mb-12 opacity-90 text-[#00a76f] text-3xl"
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiShield title="ISO Certified" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiCheckCircle title="Financially Regulated" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiTrendingUp title="SOC Compliant" />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            The future of <span className="text-[#00a76f]">your capital</span>{" "}
            <span className="text-[#00a76f]">starts here.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Whether you're new to hedge funds or an institutional investor,
            Evermount equips you with the insights, execution, and support to
            outperform.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00a76f] hover:bg-emerald-700 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-sm transition"
              >
                Book a Demo
              </motion.button>
            </Link>
            <Link href="/portfolio-insights">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-[#00a76f] text-[#00a76f] hover:bg-[#00a76f0d] dark:hover:bg-[#00a76f22] rounded-md text-lg font-semibold transition shadow-sm"
              >
                See Performance
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
