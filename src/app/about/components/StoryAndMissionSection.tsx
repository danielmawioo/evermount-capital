import { motion } from "framer-motion";

export default function StoryAndMissionSection() {
  return (
    <>
      {/* Company Story */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Story
        </h2>
        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Founded in 2023, Evermount Capital emerged from a vision to build
            institutional-grade quantitative trading and market-making
            technology purpose-built for African financial markets. Our
            founders combine experience in quantitative finance, data
            science, and technology.
          </p>
          <p>
            We started with a simple premise: African financial markets have
            enormous potential but remain fragmented, less electronically
            sophisticated, and less liquid than major global markets. By
            leveraging machine learning, statistical modeling, and
            high-performance computing, we&apos;re building the research and
            trading infrastructure needed to help change that.
          </p>
          <p>
            Today, we&apos;re building our systematic trading strategies and
            technology platform. Our long-term ambition is to become a
            leading quantitative trading and market-making firm for African
            markets, with the potential to eventually connect those markets
            to global trading infrastructure.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 text-gray-700 dark:text-gray-300">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-[#f5fdfb] dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-[#00a76f] mb-3">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            To build the quantitative research, AI and trading infrastructure
            required to participate in and improve liquidity across African
            financial markets.
          </p>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
            We believe institutional-grade trading technology shouldn&apos;t
            be limited to major global markets. Through systematic research
            and engineering, we&apos;re building that technology for Africa.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-[#f5fdfb] dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold text-[#00a76f] mb-3">Our Vision</h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            To become one of Africa&apos;s leading quantitative trading and
            market-making firms — helping build deeper, more efficient
            African financial markets.
          </p>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
            We envision a future where systematic, technology-driven trading
            is standard infrastructure for African markets, with the
            long-term potential to connect them to global capital.
          </p>
        </motion.div>
      </section>
    </>
  );
}
