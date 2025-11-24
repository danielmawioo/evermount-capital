"use client";

import Script from "next/script";
import { metadata as meta } from "./metadata";

export default function PricingPage() {
  const tiers = [
    {
      size: "$500",
      fee: "$25",
      roi: "5-8%",
      lossLimit: "12%",
      dailyLoss: "6%",
      ai: false,
      dashboard: true,
      advisor: false,
      minDays: "3 Months",
      frequency: "Quarterly (Every 3 Months)",
      support: "Email Only",
    },
    {
      size: "$2,500",
      fee: "$59",
      roi: "10-15%",
      lossLimit: "10%",
      dailyLoss: "5%",
      ai: true,
      dashboard: true,
      advisor: false,
      minDays: "3 Months",
      frequency: "Quarterly (Every 3 Months)",
      support: "Email Only",
    },
    {
      size: "$10,000",
      fee: "$199",
      roi: "15-20%",
      lossLimit: "10%",
      dailyLoss: "5%",
      ai: true,
      dashboard: true,
      advisor: true,
      minDays: "3 Months",
      frequency: "Quarterly (Every 3 Months)",
      support: "Priority Chat",
    },
    {
      size: "$50,000+",
      fee: "$499",
      roi: "25-30%",
      lossLimit: "8%",
      dailyLoss: "4%",
      ai: true,
      dashboard: true,
      advisor: true,
      minDays: "3 Months",
      frequency: "Quarterly (Every 3 Months)",
      support: "Dedicated Manager",
    },
  ];

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hedge Fund Investment Services",
    provider: {
      "@type": "FinancialService",
      name: "Evermount Capital",
      url: "https://www.evermount.co",
    },
    areaServed: "Worldwide",
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${tier.size} Investment Plan`,
      price: tier.fee,
      priceCurrency: "USD",
      description: `Investment plan with ${tier.roi} target ROI, ${tier.lossLimit} max loss limit, and ${tier.support} support.`,
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    })),
  };

  return (
    <main className="px-6 py-20 max-w-7xl mx-auto">
      {/* Enhanced Structured Data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />

      {/* HERO */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Choose Your Investment Tier
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Flexible capital thresholds, tailored returns, and support that grows
          with you.
        </p>
      </section>

      {/* TABLE */}
      <section className="overflow-x-auto">
        <table className="min-w-full text-sm text-center border-collapse shadow rounded-lg overflow-hidden">
          <thead className="bg-[#00a76f] text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left bg-[#008d5e]">Feature</th>
              {tiers.map((tier, i) => (
                <th key={i} className="px-6 py-4">
                  {tier.size}
                  <div className="text-sm font-semibold mt-1 text-white/90">
                    Fee: {tier.fee}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {[
              { label: "Target ROI", key: "roi" },
              { label: "Max Loss Limit", key: "lossLimit" },
              { label: "Max Daily Drawdown", key: "dailyLoss" },
              { label: "AI-Driven Strategy", key: "ai", type: "boolean" },
              {
                label: "Realtime Dashboard",
                key: "dashboard",
                type: "boolean",
              },
              { label: "Capital Advisor", key: "advisor", type: "boolean" },
              { label: "Min Investment Period", key: "minDays" },
              { label: "Withdrawal Frequency", key: "frequency" },
              { label: "Support Channel", key: "support" },
            ].map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50 border-t"}
              >
                <td className="py-4 px-6 text-left font-medium">{row.label}</td>
                {tiers.map((tier, j) => (
                  <td key={j} className="py-4 px-6">
                    {row.type === "boolean"
                      ? tier[row.key as keyof typeof tier]
                        ? "✅"
                        : "❌"
                      : tier[row.key as keyof typeof tier]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-12 text-center text-sm text-gray-500">
        No hidden fees. Refundable after successful qualification.
      </div>
    </main>
  );
}
