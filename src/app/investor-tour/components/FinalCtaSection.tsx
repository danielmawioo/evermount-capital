import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#e8fdf4] dark:bg-gray-800 py-20 text-center px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a76f] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to Experience the Future of Investing?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
          Join institutional and accredited investors leveraging
          Evermount&apos;s quantitative investment strategies and systematic
          alpha generation.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              Join the Waitlist
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
