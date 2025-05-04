"use client";

import {
  CheckCircleIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Script from "next/script";

export default function FeaturesPage() {
  return (
    <main className="px-6 py-24 max-w-7xl mx-auto space-y-28 text-gray-900">
      {/* ✅ JSON-LD structured data for search engines */}
      <Script
        id="ld-json-features"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Platform Features",
            url: "https://evermount.co/features",
            description:
              "Explore the proprietary strategies and infrastructure powering Evermount Capital's hedge fund performance.",
            isPartOf: {
              "@type": "WebSite",
              name: "Evermount Capital",
              url: "https://evermount.co",
            },
          }),
        }}
      />

      {/* SECTION 1 - Hero */}
      <section className="text-center">
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
          Platform Built for Performance
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Dive into the tech stack and strategies that drive speed, accuracy,
          and transparency across every Evermount strategy.
        </p>
      </section>

      {/* SECTION 2 - Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            icon: CpuChipIcon,
            title: "AI Trading Models",
            desc: "Autonomous, data-driven execution around the clock. Trained on over a decade of financial data.",
          },
          {
            icon: ChartBarIcon,
            title: "Real-Time Dashboards",
            desc: "Access live metrics, performance charts, and allocations anytime, anywhere.",
          },
          {
            icon: CheckCircleIcon,
            title: "Compliance Intelligence",
            desc: "Built for security, audited regularly, and aligned with global financial regulations.",
          },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-white border shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg"
          >
            <Icon className="w-10 h-10 mx-auto text-[#00a76f] mb-4" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{desc}</p>
          </div>
        ))}
      </section>

      {/* SECTION 3 - AI Strategy Overview */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-14">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">Smart AI Meets Hedge Funds</h2>
          <p className="text-gray-600 text-base">
            Our proprietary models process market patterns, volatility trends,
            and sentiment data to execute at lightning speed and adapt
            dynamically.
          </p>
          <ul className="space-y-3 text-gray-800 text-sm">
            <li>✔ Pattern recognition based on 10+ years of data</li>
            <li>✔ Automatic volatility hedging and reallocation</li>
            <li>✔ Emotion-free strategy optimization in real-time</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/section3.png"
            alt="AI Engine and Platform Tools"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* SECTION 4 - RISK METRICS */}
      <section className="bg-gray-50 py-20 px-6 rounded-2xl shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Risk Metrics & Capital Protection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            At Evermount, we don’t just chase performance — we prioritize
            preservation through quant analysis, AI stress testing, and smart
            diversification.
          </p>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "Quantitative Risk Indexing",
                desc: "Every client portfolio is assigned a risk-weighted index, dynamically updated as market conditions shift.",
                icon: ShieldCheckIcon,
              },
              {
                title: "Backtested Volatility Control",
                desc: "We simulate thousands of trading scenarios across historical datasets to avoid drawdowns before they occur.",
                icon: ChartBarIcon,
              },
              {
                title: "Live Stress Testing Models",
                desc: "AI stress scenarios run continuously to detect unusual volatility, ensuring proactive allocation rebalancing.",
                icon: CpuChipIcon,
              },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <Icon className="w-8 h-8 text-[#00a76f] mb-4" />
                <h4 className="font-semibold text-lg mb-2">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
