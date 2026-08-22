import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white via-[#f0fdf8] dark:via-gray-800 to-white dark:to-gray-900 py-24 px-6 text-center">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-1/4 w-72 h-72 bg-[#00a76f] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          A Smarter Way to Invest
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-400">
          Explore how Evermount blends AI and Quantitative Models to build
          future-ready investment portfolios.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link href="/book-demo">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
            >
              Book a Demo
            </motion.button>
          </Link>
          <Link href="/waitlist">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#00a76f] text-[#00a76f] hover:bg-[#e6f5f0] dark:hover:bg-[#00a76f22] px-6 py-3 rounded-md font-semibold shadow-sm hover:shadow-md transition"
            >
              Get Early Access
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
