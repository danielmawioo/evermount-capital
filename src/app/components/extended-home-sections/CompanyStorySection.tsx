"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const PHILOSOPHY_PRINCIPLES = [
  {
    title: "Intelligence First",
    desc: "Understand the market before acting.",
  },
  {
    title: "Research Driven",
    desc: "Every strategy begins with measurable evidence and rigorous validation.",
  },
  {
    title: "Risk First",
    desc: "Every opportunity must be evaluated through a disciplined risk framework.",
  },
  {
    title: "Systematic by Design",
    desc: "Reduce unnecessary human bias through rules, models and automation.",
  },
  {
    title: "Infrastructure Over Products",
    desc: "Build technology that can power multiple financial applications.",
  },
];

export default function CompanyStorySection() {
  return (
    <>
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
              Evermount — The AI Financial Intelligence & Trading Infrastructure
              Company for Africa
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We build intelligent financial systems that understand markets,
              discover opportunities, manage risk and execute capital.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Evermount combines artificial intelligence, quantitative research,
              financial data and high-performance trading infrastructure to
              build the next generation of African financial markets.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We are starting with quantitative research and systematic trading
              infrastructure and building toward a broader financial
              intelligence platform connecting data, capital, liquidity and
              execution across African markets.
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
                alt="Evermount company overview"
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
              Our Technology Philosophy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Financial markets are complex systems. We believe the next
              generation of financial infrastructure will be built by combining
              large-scale data, artificial intelligence, quantitative research
              and automated execution.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Evermount is building systems that continuously learn from
              financial data, generate hypotheses, evaluate risk and translate
              validated intelligence into controlled action.
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
                  className="flex items-start gap-3"
                >
                  <CheckCircleIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white">
                      {principle.title}.
                    </strong>{" "}
                    {principle.desc}
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
                alt="Evermount technology philosophy"
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
