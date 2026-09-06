"use client";

import TranslateTree from "@/app/components/TranslateTree";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MetricsAndCtaSection() {
  return (
    <TranslateTree>
      <section className="py-16 px-6 bg-gradient-to-r from-[#00a76f] to-emerald-600 text-white relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Building AI Financial Intelligence for Africa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Request access to discuss data, research, risk, execution and
            connectivity infrastructure with the Evermount team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/platform">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#00a76f] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Explore Platform
              </motion.button>
            </Link>
            <Link href="/partners">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Become a Partner
              </motion.button>
            </Link>
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white/70 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Request Access
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </TranslateTree>
  );
}
