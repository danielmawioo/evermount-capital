"use client";

import Link from "next/link";
import Script from "next/script";
import { metadata as meta } from "./metadata";

export default function InvestorTourPage() {
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
      <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-white via-[#f0fdf8] to-white py-24 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          A Smarter Way to Invest
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Explore how Evermount blends AI and Quantitative Models to build
          future-ready investment portfolios.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/book-demo">
            <button className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold shadow">
              Book a Demo
            </button>
          </Link>
          <Link href="/waitlist">
            <button className="border border-[#00a76f] text-[#00a76f] hover:bg-[#e6f5f0] px-6 py-3 rounded-md font-semibold shadow">
              Get Early Access
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <img
              src="/icons/data-analysis.svg"
              alt="Step 1"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Data-Driven Research</h3>
            <p>
              We analyze millions of data points using machine learning to
              identify patterns in global markets.
            </p>
          </div>
          <div>
            <img
              src="/icons/ai-trade.svg"
              alt="Step 2"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Autonomous AI Models</h3>
            <p>
              Our AI models execute trades with precision using predefined quant
              rules and real-time signals.
            </p>
          </div>
          <div>
            <img
              src="/icons/dashboard.svg"
              alt="Step 3"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Transparent Reporting
            </h3>
            <p>
              Track performance in real-time via your personalized investor
              dashboard on web and mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Investor Roadmap */}
      <section className="bg-[#f9f9f9] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Investor Journey Roadmap
          </h2>
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            <div>
              <img
                src="/illustrations/signup.svg"
                alt="Sign Up"
                className="w-20 h-20 mx-auto mb-3"
              />
              <h4 className="font-semibold text-lg mb-1">1. Onboarding</h4>
              <p className="text-sm">
                Create an account and complete KYC verification securely.
              </p>
            </div>
            <div>
              <img
                src="/illustrations/fund.svg"
                alt="Fund Account"
                className="w-20 h-20 mx-auto mb-3"
              />
              <h4 className="font-semibold text-lg mb-1">2. Fund Wallet</h4>
              <p className="text-sm">
                Deposit capital using your preferred secure method.
              </p>
            </div>
            <div>
              <img
                src="/illustrations/growth.svg"
                alt="Invest"
                className="w-20 h-20 mx-auto mb-3"
              />
              <h4 className="font-semibold text-lg mb-1">3. Invest Smartly</h4>
              <p className="text-sm">
                Let our algorithms allocate and manage trades intelligently.
              </p>
            </div>
            <div>
              <img
                src="/illustrations/withdraw.svg"
                alt="Profit"
                className="w-20 h-20 mx-auto mb-3"
              />
              <h4 className="font-semibold text-lg mb-1">
                4. Withdraw Profits
              </h4>
              <p className="text-sm">
                Enjoy seamless withdrawals to your preferred account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Performance Snapshot
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-extrabold text-[#00a76f]">30%+</h3>
              <p className="mt-2 text-sm">Average Quarterly ROI</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-[#00a76f]">$50M+</h3>
              <p className="mt-2 text-sm">Assets Tracked</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-[#00a76f]">
                10,000+
              </h3>
              <p className="mt-2 text-sm">Global Subscribers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Risk Control */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Institutional-Grade Security
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="/images/security-dashboard.png"
              alt="Security"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#00a76f] font-bold">✓</span>
                <span>Multi-layer risk management framework</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a76f] font-bold">✓</span>
                <span>24/7 monitoring of trading environments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00a76f] font-bold">✓</span>
                <span>
                  Investor capital protected through isolation and limits
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#e8fdf4] py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Experience the Future of Investing?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Join thousands of forward-thinking investors using Evermount's
          AI-powered hedge fund technology.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/book-demo">
            <button className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold shadow">
              Book a Demo
            </button>
          </Link>
          <Link href="/waitlist">
            <button className="border border-[#00a76f] text-[#00a76f] hover:bg-[#e6f5f0] px-6 py-3 rounded-md font-semibold shadow">
              Join the Waitlist
            </button>
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
