"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  CpuChipIcon,
  ClockIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

import LiveMarketTicker from "./LiveMarketTicker";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white dark:from-gray-900 via-[#e8fdf4] dark:via-gray-800 to-white dark:to-gray-900 py-20 sm:py-28 transition-all relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#00a76f] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Building Africa&apos;s Quantitative Trading Infrastructure
          </h1>

          <h2 className="text-base sm:text-lg md:text-2xl font-medium text-[#00a76f] dark:text-emerald-400 min-h-[32px] sm:min-h-[40px]">
            <span className="inline-block min-w-[220px]">
              <Typewriter
                words={[
                  "Quantitative Trading",
                  "Systematic Market Making",
                  "Electronic Trading Infrastructure",
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Evermount is building an Africa-focused quantitative trading and
            market-making technology company — combining quantitative
            research, machine learning, and high-performance trading
            infrastructure to help build more liquid, efficient African
            financial markets.
          </p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
          >
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#00a76f] text-white rounded-md font-semibold hover:bg-emerald-700 transition shadow-md"
              >
                <LifebuoyIcon className="w-5 h-5" />
                Talk to Our Team
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event("openWaitlist"))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-[#00a76f] dark:border-emerald-400 text-[#00a76f] dark:text-emerald-400 rounded-md font-semibold hover:bg-[#e6f5f0] dark:hover:bg-emerald-400/20 transition shadow-md"
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Get Early Access
            </motion.button>
          </motion.div>

          {/* TRUST METRICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-800 dark:text-gray-200 max-w-md mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
              Data-Driven Alpha
            </div>
            <div className="flex items-center gap-3">
              <CpuChipIcon className="w-5 h-5 text-[#00a76f]" />
              AI-Powered Research
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5 text-[#00a76f]" />
              Systematic Execution
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-[#00a76f]" />
              Risk-Managed Trading
            </div>
          </motion.div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[680px] sm:px-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/section1.png"
                alt="Main Dashboard Preview"
                width={930}
                height={665}
                className="rounded-xl shadow-2xl w-full h-auto object-contain"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -left-6 -bottom-10 w-[240px] hidden md:block"
            >
              <Image
                src="/images/section1.png"
                alt="Mobile Preview"
                width={240}
                height={380}
                className="rounded-xl shadow-lg"
              />
            </motion.div>

            {/* LIVE MARKET TICKER - Overlay on Image */}
            <div className="absolute -top-8 right-4 xl:-top-10 xl:right-6 z-30">
              <LiveMarketTicker />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
