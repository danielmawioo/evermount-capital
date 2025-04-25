"use client";

import Image from "next/image";
import {
  CheckCircleIcon,
  BoltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function HomeSectionsWithImages() {
  return (
    <div className="bg-white text-gray-900">
      {/* === OUR NUMBERS SPEAK === */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-[#0d1b2a] rounded-2xl py-20 px-6 md:px-20 text-white text-center shadow-lg">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">
            Our Numbers Speak For Themselves
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            {[
              { value: "98K+", label: "Clients Funded" },
              { value: "$60M+", label: "Assets Managed" },
              { value: "18.5%", label: "Average Returns" },
              { value: "40+", label: "Global Instruments" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-4xl font-extrabold text-[#00a76f]">
                  {item.value}
                </p>
                <p className="text-lg lg:text-xl text-gray-300 mt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === KEY HIGHLIGHTS === */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-6">
          Key Highlights
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          Power up your investing journey with Evermount’s most valuable
          features.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              icon: CurrencyDollarIcon,
              title: "Zero Entry Fees",
              desc: "No upfront or exit fees — maximize your investment potential.",
            },
            {
              icon: BoltIcon,
              title: "AI-Driven Execution",
              desc: "Real-time insights & automated trades for efficiency.",
            },
            {
              icon: DevicePhoneMobileIcon,
              title: "Multi-Currency Flexibility",
              desc: "Invest in KES or USD — flexibility that fits your needs.",
            },
            {
              icon: DocumentChartBarIcon,
              title: "24/7 Dashboard Access",
              desc: "Stay in control with round-the-clock transparency.",
            },
            {
              icon: DocumentChartBarIcon,
              title: "Quarterly Growth Reports",
              desc: "Backed by expert analysis to track performance.",
            },
            {
              icon: UserGroupIcon,
              title: "Client-First Support",
              desc: "Our dedicated managers are here when you need them.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-gray-50 p-10 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <Icon className="h-8 w-8 text-[#00a76f] mb-4" />
              <h4 className="text-xl font-semibold text-[#00a76f] mb-2">
                {title}
              </h4>
              <p className="text-gray-700 text-base">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === WHY EVERMOUNT === */}
      <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <Image
            src="/images/section3.png"
            alt="Why Evermount"
            width={600}
            height={400}
            className="rounded-xl shadow-xl max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose Evermount
          </h2>
          {[
            "AI-powered, high-frequency strategy",
            "Capital protection via smart risk indexing",
            "Access global and African markets in one portfolio",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-4">
              <CheckCircleIcon className="w-6 h-6 text-[#00a76f] mt-1" />
              <p className="text-lg">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === FUND HIGHLIGHTS === */}
      <section className="bg-gray-50 py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center">
        <div className="md:w-1/2">
          <Image
            src="/images/section2.png"
            alt="Fund Features"
            width={600}
            height={400}
            className="rounded-xl shadow-xl max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Fund Highlights
          </h2>
          <ul className="space-y-5 text-gray-700 text-lg">
            {[
              "0% Entry & Exit Fees",
              "Minimum Investment: $ 500",
              "Quarterly Performance Reports",
              "Audited & Regulated",
              "6 Month Lock-In Period",
              "USD + KES denomination",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#00a76f] mt-1" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* === INVESTMENT TIMELINE === */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
          How We Manage Your Capital
        </h2>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-12 border-l-4 border-[#00a76f] pl-6">
            {[
              {
                title: "Step 1 – Profile Setup",
                desc: "We assess your risk appetite and capital goals for a custom plan.",
              },
              {
                title: "Step 2 – Strategy Mapping",
                desc: "Model-based allocation built on decades of financial insights.",
              },
              {
                title: "Step 3 – Live Execution",
                desc: "Smart execution powered by AI and market data.",
              },
              {
                title: "Step 4 – Weekly & Quarterly Insights",
                desc: "Your performance dashboard keeps you informed 24/7.",
              },
            ].map((step, i) => (
              <div key={i}>
                <h4 className="text-xl font-semibold">{step.title}</h4>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="md:w-1/2">
            <Image
              src="/images/section3.png"
              alt="Capital Management"
              width={600}
              height={400}
              className="rounded-xl shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">
          Let’s Grow Your Capital Together
        </h2>
        <p className="text-lg lg:text-xl text-gray-700 mb-10">
          Whether youre an institutional investor or exploring hedge funds for
          the first time — Evermount has the tools and team to help you grow.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-[#00a76f] text-white px-8 py-3 rounded-md font-semibold hover:bg-emerald-700 text-lg">
            Book a Demo
          </button>
          <button className="px-8 py-3 border border-[#00a76f] text-[#00a76f] rounded-md font-semibold hover:bg-gray-100 text-lg">
            See Performance
          </button>
        </div>
      </section>
    </div>
  );
}
