import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
        An Africa-Focused Quantitative Trading Company
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
        We&apos;re building the quantitative research, AI and trading
        infrastructure required to participate in and improve liquidity
        across African financial markets.
      </p>
    </motion.section>
  );
}
