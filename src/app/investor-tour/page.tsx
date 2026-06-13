"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
export default function InvestorTourPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Invest with Evermount Capital",
    description:
      "Step-by-step guide to investing with Evermount Capital's AI-powered hedge fund platform.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Onboarding",
        text: "Create an account and complete KYC verification securely.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Fund Wallet",
        text: "Deposit capital using your preferred secure method (bank transfer, card, or crypto).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Invest Smartly",
        text: "Let our AI algorithms allocate and manage trades intelligently across global markets.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Withdraw Profits",
        text: "Enjoy seamless withdrawals to your preferred account with flexible frequency options.",
      },
    ],
  };

  return (
    <>
      <Script
        id="investor-tour-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToStructuredData),
        }}
      />
      <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-[#f0fdf8] dark:via-gray-800 to-white dark:to-gray-900 py-24 px-6 text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 left-1/4 w-72 h-72 bg-[#00a76f] rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
            A Smarter Way to Invest
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-400">
            Explore how Evermount blends AI and Quantitative Models to build
            future-ready investment portfolios.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
              >
                Book a Demo
              </motion.button>
            </Link>
            <Link href="/waitlist">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#00a76f] text-[#00a76f] hover:bg-[#e6f5f0] dark:hover:bg-[#00a76f22] px-6 py-3 rounded-md font-semibold shadow-sm hover:shadow-md transition"
              >
                Get Early Access
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          How It Works
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10 text-center"
        >
          {[
            {
              icon: "/icons/data-analysis.svg",
              title: "Data-Driven Research",
              description: "We analyze millions of data points using machine learning to identify patterns in global markets.",
            },
            {
              icon: "/icons/ai-trade.svg",
              title: "Systematic Execution",
              description: "Proprietary quantitative models execute trades systematically using rigorous signal generation and validation.",
            },
            {
              icon: "/icons/dashboard.svg",
              title: "Transparent Reporting",
              description: "Track performance in real-time via your personalized investor dashboard on web and mobile.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Investor Roadmap */}
      <section className="bg-[#f9f9f9] dark:bg-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Investor Journey Roadmap
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              {
                icon: "/illustrations/signup.svg",
                title: "1. Onboarding",
                description: "Create an account and complete KYC verification securely.",
              },
              {
                icon: "/illustrations/fund.svg",
                title: "2. Fund Wallet",
                description: "Deposit capital using your preferred secure method.",
              },
              {
                icon: "/illustrations/growth.svg",
                title: "3. Portfolio Allocation",
                description: "Systematic allocation across quantitative strategies based on your risk-return objectives.",
              },
              {
                icon: "/illustrations/withdraw.svg",
                title: "4. Performance Monitoring",
                description: "Real-time portfolio analytics and quarterly performance attribution reports.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
              >
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={step.icon}
                  alt={step.title}
                  className="w-20 h-20 mx-auto mb-3"
                />
                <h4 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Performance Snapshot
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-8 text-center"
          >
            {[
              { value: "18.5%", label: "Annualized Returns" },
              { value: "$300K", label: "Assets Under Management" },
              { value: "82", label: "Investor Partners" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                  className="text-4xl md:text-5xl font-extrabold text-[#00a76f]"
                >
                  {metric.value}
                </motion.h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security & Risk Control */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Institutional-Grade Security
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/images/security-dashboard.png"
              alt="Security"
              width={800}
              height={500}
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ul className="space-y-4">
              {[
                "Multi-layer risk management framework",
                "24/7 monitoring of trading environments",
                "Investor capital protected through isolation and limits",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-[#00a76f] font-bold text-lg">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#e8fdf4] dark:bg-gray-800 py-20 text-center px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a76f] rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Experience the Future of Investing?
          </h2>
          <p className="text-lg max-w-xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
            Join institutional and accredited investors leveraging Evermount&apos;s
            quantitative investment strategies and systematic alpha generation.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
              >
                Book a Demo
              </motion.button>
            </Link>
            <Link href="/waitlist">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#00a76f] text-[#00a76f] hover:bg-[#e6f5f0] dark:hover:bg-[#00a76f22] px-6 py-3 rounded-md font-semibold shadow-sm hover:shadow-md transition"
              >
                Join the Waitlist
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
    </>
  );
}
