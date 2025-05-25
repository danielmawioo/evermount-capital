"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-[#e8fdf4] to-white py-20 sm:py-28 transition-all">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 sm:gap-20 items-center">
        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Building the Future of Investing
          </h1>

          <h2 className="text-base sm:text-lg md:text-2xl font-medium text-[#00a76f] min-h-[32px] sm:min-h-[40px]">
            <span className="inline-block min-w-[220px]">
              <Typewriter
                words={[
                  "Quant Hedge Funds",
                  "AI-Powered Portfolios",
                  "Autonomous Trading Systems",
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

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            A next-gen quantitative hedge fund blending data science, AI, and
            algorithmic precision to unlock sustainable alpha and global-scale
            growth.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <Link href="/book-demo">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#00a76f] text-white rounded-md font-semibold hover:bg-emerald-700 transition shadow-md">
                <SupportAgentIcon fontSize="small" />
                Talk to Our Team
              </button>
            </Link>

            <button
              onClick={() => window.dispatchEvent(new Event("openWaitlist"))}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-[#00a76f] text-[#00a76f] rounded-md font-semibold hover:bg-[#e6f5f0] transition shadow-md"
            >
              <RocketLaunchIcon fontSize="small" />
              Get Early Access
            </button>
          </div>

          {/* TRUST METRICS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-800 max-w-md mx-auto lg:mx-0"
          >
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-[#00a76f]" />
              Data-Driven Alpha
            </div>
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="w-5 h-5 text-[#00a76f]" />
              $50M+ Strategies Tracked
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5 text-[#00a76f]" />
              Real-Time AI Trading
            </div>
            <div className="flex items-center gap-3">
              <UserGroupIcon className="w-5 h-5 text-[#00a76f]" />
              10,000+ Global Subscribers
            </div>
          </motion.div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[680px] sm:px-0">
            <Image
              src="/images/section1.png"
              alt="Main Dashboard Preview"
              width={930}
              height={665}
              className="rounded-xl shadow-2xl w-full h-auto object-contain"
              priority
            />
            <div className="absolute -left-6 -bottom-10 w-[240px] hidden md:block">
              <Image
                src="/images/section1.png"
                alt="Mobile Preview"
                width={240}
                height={380}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
