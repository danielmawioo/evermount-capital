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
            Founded in 2023, Evermount Capital emerged from a vision to
            democratize access to sophisticated quantitative investment
            strategies. Our founders, combining decades of experience in
            quantitative finance, data science, and technology, recognized that
            institutional-grade investment management could be made accessible
            to a broader range of investors.
          </p>
          <p>
            We began with a simple yet powerful premise: markets contain
            systematic inefficiencies that can be identified and exploited
            through rigorous quantitative analysis. By leveraging cutting-edge
            machine learning, statistical modeling, and high-performance
            computing, we&apos;ve built a platform that processes terabytes of
            market data daily to generate alpha opportunities.
          </p>
          <p>
            Today, Evermount Capital manages assets across multiple asset
            classes, serving investors globally with systematic strategies that
            adapt to changing market conditions. Our commitment to transparency,
            risk management, and technological innovation continues to drive our
            growth and success.
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
            To unlock elite investing opportunities for all growth-focused
            investors, combining algorithmic performance with risk-managed
            systems across emerging and developed markets.
          </p>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
            We believe that sophisticated investment strategies should not be
            limited to institutional investors. Through technology and
            systematic approaches, we make institutional-grade quantitative
            investing accessible to all.
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
            To be Africa&apos;s most trusted AI-powered alternative investment
            ecosystem — enabling secure, scalable, and borderless capital
            growth.
          </p>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
            We envision a future where quantitative excellence and systematic
            investment strategies are the standard, empowering investors
            worldwide to achieve their financial goals through data-driven
            decision-making.
          </p>
        </motion.div>
      </section>
    </>
  );
}
