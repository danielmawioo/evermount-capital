"use client";

import Image from "next/image";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";

// MUI Icons
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white via-[#e8fdf4] to-white py-28 lg:py-36 transition-all">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT TEXT CONTENT */}
        <div className="space-y-6">
          {/* Static headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-1xl">
            Building the Future of Investing
          </h1>

          {/* Animated subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-4xl font-medium text-[#00a76f] min-h-[40px]">
            <span className="inline-block min-w-[240px]">
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

          {/* Description */}
          <p className="text-gray-600 text-lg lg:text-xl max-w-xl leading-relaxed mt-4">
            A next-gen quantitative hedge fund blending data science, AI, and
            algorithmic precision to unlock sustainable alpha and global-scale
            growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00a76f] text-white rounded-md font-semibold hover:bg-emerald-700 transition shadow-lg">
              <SupportAgentIcon fontSize="small" />
              Talk to Our Team
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[#00a76f] text-[#00a76f] rounded-md font-semibold hover:bg-[#e6f5f0] transition shadow-lg">
              <RocketLaunchIcon fontSize="small" />
              Get Early Access
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base text-gray-800 max-w-md">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <ChartBarIcon className="w-6 h-6 text-[#00a76f]" />
              <span>Data-Driven Alpha</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <CurrencyDollarIcon className="w-6 h-6 text-[#00a76f]" />
              <span>$50M+ Strategies Tracked</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <ClockIcon className="w-6 h-6 text-[#00a76f]" />
              <span>Real-Time AI Trading</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <UserGroupIcon className="w-6 h-6 text-[#00a76f]" />
              <span>10,000+ Global Subscribers</span>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative w-full flex justify-center lg:justify-end">
          <div className="relative w-[90%] max-w-[700px]">
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
        </div>
      </div>

      {/* PAYMENT LOGOS */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-24 pb-12">
        <p className="text-center text-gray-500 text-sm font-medium mb-6">
          WE SUPPORT SEAMLESS TRANSACTIONS VIA:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Image
            src="/logos/mastercard.png"
            alt="Mastercard"
            width={50}
            height={50}
          />
          <Image src="/logos/paypal.png" alt="PayPal" width={50} height={50} />
          <Image
            src="/logos/coinbase.png"
            alt="Coinbase"
            width={50}
            height={50}
          />
          <Image src="/logos/usdc.png" alt="USDC" width={50} height={50} />
          <Image src="/logos/stripe.png" alt="Stripe" width={50} height={50} />
          <Image
            src="/logos/applepay.png"
            alt="Apple Pay"
            width={50}
            height={50}
          />
          <Image
            src="/logos/bitcoin.png"
            alt="Bitcoin"
            width={50}
            height={50}
          />
        </div>
      </div>
    </section>
  );
}
