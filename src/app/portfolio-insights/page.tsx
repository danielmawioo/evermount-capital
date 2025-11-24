"use client";

import Script from "next/script";
import { metadata as meta } from "./metadata";

export default function PortfolioInsightsPage() {
  return (
    <main className="px-6 py-20 max-w-7xl mx-auto text-gray-900">
      {/* Enhanced Structured Data */}
      <Script
        id="portfolio-insights-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Portfolio Insights",
            url: "https://www.evermount.co/portfolio-insights",
            description:
              "Explore portfolio growth, performance metrics, and capital risk breakdown through the Evermount insights dashboard.",
            isPartOf: {
              "@type": "WebSite",
              name: "Evermount Capital",
              url: "https://www.evermount.co",
            },
            mainEntity: {
              "@type": "FinancialProduct",
              name: "Portfolio Analytics Dashboard",
              description:
                "Real-time portfolio performance tracking with risk metrics, return analysis, and benchmark comparisons.",
            },
          }),
        }}
      />

      {/* INTRO SECTION */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-extrabold">
          Portfolio Insights That Drive Performance
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Visualize risk-adjusted returns, monitor drawdowns, and compare
          benchmarks — everything you need to make confident capital decisions.
        </p>
      </section>

      {/* METRICS GRID */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {[
          { label: "Avg Quarterly Return", value: "18.5%" },
          { label: "Volatility Index", value: "3.7%" },
          { label: "Max Drawdown", value: "-5.2%" },
          { label: "Sharpe Ratio", value: "1.98" },
        ].map(({ label, value }, i) => (
          <div
            key={i}
            className="bg-white shadow-md p-6 rounded-xl text-center border"
          >
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-[#00a76f]">{value}</p>
          </div>
        ))}
      </section>

      {/* CHART + INSIGHTS */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-4">Growth Curve Analysis</h2>
          <p className="text-gray-600 mb-6">
            Track cumulative returns versus benchmark indices and understand how
            algorithmic rebalancing improves long-term performance.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Dynamic capital allocation models</li>
            <li>Compounded monthly return visualization</li>
            <li>Comparative benchmark overlays</li>
          </ul>
        </div>
        <div>
          <img
            src="/images/portfolio/line-chart.png"
            alt="Growth Chart"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* RISK INSIGHTS */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <img
            src="/images/portfolio/pie-risk.png"
            alt="Risk Chart"
            className="rounded-xl shadow-xl"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Risk Distribution</h2>
          <p className="text-gray-600 mb-6">
            Understand your capital's exposure across market sectors, asset
            classes, and volatility groups — in real-time.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Global equities vs. African mid-cap split</li>
            <li>Risk-index optimization tools</li>
            <li>Rebalancing notifications & alerts</li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">
          Real Insights. Smarter Capital Decisions.
        </h3>
        <p className="text-gray-700 mb-6">
          Access your personalized dashboard today and unlock deeper control
          over your portfolio’s performance and risk profile.
        </p>
        <button className="bg-[#00a76f] text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition">
          Get Access
        </button>
      </section>
    </main>
  );
}
