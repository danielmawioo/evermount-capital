"use client";

import Script from "next/script";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import RoadmapSection from "./components/RoadmapSection";
import PerformanceMetricsSection from "./components/PerformanceMetricsSection";
import SecuritySection from "./components/SecuritySection";
import FinalCtaSection from "./components/FinalCtaSection";

export default function InvestorTourPage() {
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Invest with Evermount Capital",
    description:
      "Step-by-step guide to investing with Evermount Capital's AI-powered trading platform.",
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
        <HeroSection />
        <HowItWorksSection />
        <RoadmapSection />
        <PerformanceMetricsSection />
        <SecuritySection />
        <FinalCtaSection />
      </main>
    </>
  );
}
