"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiShield, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

export default function FinalCtaSection() {
  return (
    <TranslateTree>
    <section className="relative py-32 px-6 bg-white dark:bg-gray-900 text-center overflow-hidden">
      {/* Decorative Background Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-80px] left-[30%] w-[250px] h-[250px] bg-[#00a76f22] dark:bg-[#00a76f33] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-60px] right-[20%] w-[200px] h-[200px] bg-[#00a76f33] dark:bg-[#00a76f44] rounded-full blur-2xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-12 flex-wrap mb-12 opacity-90 text-[#00a76f] text-3xl"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiShield title="Risk Intelligence" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiCheckCircle title="Research Driven" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiTrendingUp title="Market Intelligence" />
          </motion.div>
        </motion.div>

        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
          Financial Infrastructure for{" "}
          <span className="text-[#00a76f]">Modern Markets</span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Financial markets are complex, fragmented and technically difficult to
          build on. Evermount provides infrastructure that makes market
          technology easier to build, integrate and operate.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/platform">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00a76f] hover:bg-emerald-700 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-sm transition"
            >
              Explore Platform
            </motion.button>
          </Link>
          <Link href="/book-demo">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-[#00a76f] text-[#00a76f] hover:bg-[#00a76f0d] dark:hover:bg-[#00a76f22] rounded-md text-lg font-semibold transition shadow-sm"
            >
              Request Access
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  
    </TranslateTree>
  );
}
