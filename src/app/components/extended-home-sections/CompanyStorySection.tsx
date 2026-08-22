"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const PHILOSOPHY_PRINCIPLES = [
  "Multi-strategy approach across asset classes",
  "Systematic signal generation and validation",
  "Dynamic portfolio optimization",
  "Risk-adjusted return maximization",
];

export default function CompanyStorySection() {
  return (
    <>
      {/* === COMPANY OVERVIEW === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">
                About Evermount
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Systematic Alpha Generation Through Quantitative Excellence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Evermount Capital is a quantitative investment management firm
              that applies systematic, data-driven approaches to generate alpha
              across global markets. We combine machine learning, statistical
              arbitrage, and proprietary research to deliver consistent
              risk-adjusted returns.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[#00a76f] font-semibold cursor-pointer"
            >
              <Link href="/about" className="flex items-center gap-2">
                Learn More About Us
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/section1.png"
                alt="Company Overview"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-t from-[#00a76f]/20 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* === INVESTMENT PHILOSOPHY === */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">
                Our Approach
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Systematic Investment Philosophy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe markets contain systematic inefficiencies that can be
              identified through rigorous quantitative analysis. Our entirely
              systematic approach removes human emotion and bias, focusing on
              superior data, advanced modeling, and execution excellence across
              multiple asset classes.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 pt-4"
            >
              {PHILOSOPHY_PRINCIPLES.map((principle, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <CheckCircleIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {principle}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/section1.png"
                alt="Investment Philosophy"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-t from-[#00a76f]/20 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
