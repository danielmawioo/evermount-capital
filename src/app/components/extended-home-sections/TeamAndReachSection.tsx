"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const LEADERSHIP_TEAM = [
  {
    name: "Daniel Mawioo",
    role: "CEO & Co-Founder",
    bio: "Former quantitative researcher and portfolio manager with extensive experience in systematic trading strategies, factor investing, and risk management at leading hedge funds.",
    image: "/images/founder1.jpg",
  },
  {
    name: "Evans Kipngetich",
    role: "Chief Data Officer & Co-Founder",
    bio: "Expert in machine learning, alternative data, and large-scale data infrastructure. Previously led quantitative research teams developing predictive models for financial markets.",
    image: "/images/founder2.jpg",
  },
  {
    name: "Tony K.",
    role: "Head of Quantitative Research",
    bio: "PhD in Financial Engineering with deep expertise in stochastic modeling, statistical arbitrage, and portfolio optimization. Published researcher in quantitative finance.",
    image: "/images/founder3.jpg",
  },
];

const GLOBAL_REACH_STATS = [
  { region: "Equities", markets: "50+ Exchanges", coverage: "Global" },
  {
    region: "Fixed Income",
    markets: "Sovereign & Corporate",
    coverage: "Multi-Currency",
  },
  { region: "Currencies", markets: "Major & Emerging", coverage: "24/7 FX" },
  {
    region: "Commodities",
    markets: "Energy & Metals",
    coverage: "Futures & Spot",
  },
];

export default function TeamAndReachSection() {
  return (
    <>
      {/* === LEADERSHIP TEAM === */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              World-Class Research & Engineering Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experienced professionals combining expertise in quantitative
              finance, computer science, and engineering to drive innovation in
              systematic investing.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {LEADERSHIP_TEAM.map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden relative"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[#00a76f] font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === GLOBAL REACH === */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#00a76f]/10 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Global Market Access & Diversification
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We trade across major global exchanges, providing diversified
              exposure to opportunities worldwide through our systematic
              approach.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {GLOBAL_REACH_STATS.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <GlobeAltIcon className="w-12 h-12 text-[#00a76f] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.region}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {stat.markets}
                </p>
                <p className="text-sm text-[#00a76f] font-semibold">
                  {stat.coverage}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
