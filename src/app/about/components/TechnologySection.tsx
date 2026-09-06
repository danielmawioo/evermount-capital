import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function TechnologySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#00a76f]/10 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Technology & Innovation
      </h2>
      <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          At the heart of Evermount is a technology platform for market data,
          quantitative research, intelligence, risk and execution.
        </p>
        <p>
          We use machine learning, statistical models and modern software
          engineering. Specific performance characteristics are not published
          as marketing statistics.
        </p>
        <p>Our technology stack includes:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
          <li>
            Machine learning models trained on historical market data
          </li>
          <li>Real-time data processing and analysis infrastructure</li>
          <li>Automated risk management and portfolio optimization systems</li>
          <li>Systematic, low-latency electronic trading infrastructure</li>
          <li>Comprehensive backtesting and validation frameworks</li>
        </ul>
        <div className="pt-4">
          <Link href="/platform">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More About Our Platform
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
