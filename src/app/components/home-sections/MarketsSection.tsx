"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";

const MARKETS = [
  {
    title: "Equities",
    desc: "Technology and analytics infrastructure for equity markets.",
  },
  {
    title: "Foreign Exchange",
    desc: "Market data, analytics, risk and execution infrastructure for FX.",
  },
  {
    title: "Fixed Income",
    desc: "Infrastructure for rates, bonds and credit markets.",
  },
  {
    title: "Commodities",
    desc: "Market data, analytics and execution infrastructure for commodity markets.",
  },
  {
    title: "Derivatives",
    desc: "Infrastructure for futures, options and other derivatives.",
  },
  {
    title: "Digital Assets",
    desc: "Technology infrastructure for digital asset markets where supported.",
  },
];

export default function MarketsSection() {
  return (
    <TranslateTree>
      <section id="markets" className="py-16 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-4"
        >
          Markets
        </motion.h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          Evermount is market-agnostic. We provide infrastructure for asset
          classes — we do not imply that Evermount operates or provides
          regulated access to every market.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETS.map((market, i) => (
            <motion.article
              key={market.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6"
            >
              <h3 className="text-xl font-semibold text-[#00a76f] mb-2">
                {market.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{market.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </TranslateTree>
  );
}
