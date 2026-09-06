"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FundHighlightsSection from "../components/home-sections/FundHighlightsSection";

export default function CapitalPageContent() {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <section className="px-6 pt-20 pb-8 max-w-4xl mx-auto text-center">
        <p className="text-[#00a76f] font-semibold tracking-[0.18em] uppercase text-sm mb-4">
          Capital Management
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Evermount Capital
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Evermount Capital applies the company&apos;s AI financial
          intelligence, quantitative research, risk and execution infrastructure
          to systematic investment strategies. It is one product of the
          Evermount platform — not the entire company.
        </p>
      </section>

      <FundHighlightsSection />

      <section className="px-6 pb-20 max-w-3xl mx-auto text-center space-y-6">
        <p className="text-gray-600 dark:text-gray-400">
          Detailed tier minimums, reporting cadence and support levels are
          published on the pricing page.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00a76f] hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-semibold"
            >
              Capital login
            </motion.button>
          </Link>
          <Link href="/pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#00a76f] text-[#00a76f] px-8 py-3 rounded-md font-semibold"
            >
              View Capital Terms
            </motion.button>
          </Link>
          <Link href="/book-demo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#00a76f] text-[#00a76f] px-8 py-3 rounded-md font-semibold"
            >
              Talk to Our Team
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}
