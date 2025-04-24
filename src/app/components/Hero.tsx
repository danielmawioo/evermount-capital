"use client";

import Image from "next/image";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-screen-xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT TEXT CONTENT */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Empowering Smart
          </h1>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#00a76f] h-[60px]">
            <Typewriter
              words={[
                "Hedge Fund Models",
                "Investment Strategies",
                "AI-Driven Portfolios",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </h2>
          <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
            Strategic hedge fund platform combining AI, HFT, and algorithmic
            trading — engineered for optimized returns and investor growth.
          </p>

          <button className="mt-2 px-6 py-3 bg-[#00a76f] text-white rounded-md font-semibold hover:bg-emerald-700 transition w-fit shadow">
            Contact Sales
          </button>

          {/* TRUST METRICS - Grid Layout */}
          <div className="pt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-base text-gray-800 max-w-md">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <ChartBarIcon className="w-6 h-6 text-[#00a76f]" />
              <span>Up to 30% ROI Quarterly</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <CurrencyDollarIcon className="w-6 h-6 text-[#00a76f]" />
              <span>$50M+ Assets Managed</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <ClockIcon className="w-6 h-6 text-[#00a76f]" />
              <span>24/7 Algo Trading</span>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap">
              <UserGroupIcon className="w-6 h-6 text-[#00a76f]" />
              <span>Trusted by 10K+ Clients</span>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative w-full flex justify-center lg:justify-end">
          <div className="relative w-[90%] max-w-[700px]">
            <Image
              src="/images/section1.png"
              alt="Main Dashboard Preview"
              width={700}
              height={500}
              className="rounded-xl shadow-xl"
              priority
            />
            <div className="absolute -left-6 -bottom-10 w-[240px]">
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
    </section>
  );
}
