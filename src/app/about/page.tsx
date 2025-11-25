"use client";

import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import Script from "next/script";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircleIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BoltIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Evermount Capital",
    description:
      "Learn about Evermount Capital's mission, vision, and team of founders building the future of AI-powered hedge fund investing.",
    url: "https://www.evermount.co/about",
    mainEntity: {
      "@type": "Organization",
      name: "Evermount Capital",
      founder: [
        {
          "@type": "Person",
          name: "Daniel Mawioo",
          jobTitle: "CEO & Co-Founder",
          sameAs: "https://www.linkedin.com/in/danielmawioo/",
        },
        {
          "@type": "Person",
          name: "Evans Kipngetich",
          jobTitle: "Chief Data Officer & Co-Founder",
          sameAs: "https://www.linkedin.com/in/evans-kipngetich/",
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      <main className="px-6 py-20 max-w-7xl mx-auto space-y-20 bg-white dark:bg-gray-900">
      {/* SECTION 1 — Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          A New Breed of Hedge Fund
        </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're building the future of capital growth — driven by data,
          protected by tech, and designed for high-growth investors.
        </p>
        </motion.section>

        {/* SECTION 2 — Company Story */}
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
              Founded in 2023, Evermount Capital emerged from a vision to democratize 
              access to sophisticated quantitative investment strategies. Our founders, 
              combining decades of experience in quantitative finance, data science, and 
              technology, recognized that institutional-grade investment management could 
              be made accessible to a broader range of investors.
            </p>
            <p>
              We began with a simple yet powerful premise: markets contain systematic 
              inefficiencies that can be identified and exploited through rigorous 
              quantitative analysis. By leveraging cutting-edge machine learning, 
              statistical modeling, and high-performance computing, we've built a platform 
              that processes terabytes of market data daily to generate alpha opportunities.
            </p>
            <p>
              Today, Evermount Capital manages assets across multiple asset classes, 
              serving investors globally with systematic strategies that adapt to changing 
              market conditions. Our commitment to transparency, risk management, and 
              technological innovation continues to drive our growth and success.
            </p>
          </div>
        </motion.section>

        {/* SECTION 3 — Mission & Vision */}
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
              We believe that sophisticated investment strategies should not be limited 
              to institutional investors. Through technology and systematic approaches, 
              we make institutional-grade quantitative investing accessible to all.
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
              To be Africa's most trusted AI-powered alternative investment
            ecosystem — enabling secure, scalable, and borderless capital
            growth.
          </p>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
              We envision a future where quantitative excellence and systematic 
              investment strategies are the standard, empowering investors worldwide 
              to achieve their financial goals through data-driven decision-making.
            </p>
          </motion.div>
      </section>

        {/* SECTION 4 — Our Approach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Investment Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CpuChipIcon,
                title: "Systematic & Data-Driven",
                description: "We remove human emotion and bias from investment decisions through entirely systematic processes. Every strategy is built on rigorous quantitative research and validated through extensive backtesting.",
              },
              {
                icon: ChartBarIcon,
                title: "Multi-Strategy Diversification",
                description: "Our portfolios span multiple asset classes including equities, fixed income, currencies, and commodities. This diversification helps capture alpha across different market regimes while managing risk.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Risk-First Philosophy",
                description: "Capital preservation is paramount. Our multi-layered risk management framework continuously monitors portfolio exposure and automatically adjusts positions to maintain target risk parameters.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
              >
                <item.icon className="w-10 h-10 text-[#00a76f] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 5 — Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Transparency",
                description: "We believe in complete transparency with our investors. Regular reporting, clear communication, and open dialogue about our strategies and performance.",
              },
              {
                title: "Innovation",
                description: "We continuously invest in research and technology to stay at the forefront of quantitative finance, ensuring our strategies remain competitive and effective.",
              },
              {
                title: "Integrity",
                description: "Ethical conduct and regulatory compliance are non-negotiable. We operate with the highest standards of professionalism and accountability.",
              },
              {
                title: "Excellence",
                description: "We strive for excellence in everything we do—from research and technology to client service and risk management. Good enough is never enough.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <CheckCircleIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 6 — Technology & Innovation */}
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
              At the heart of Evermount Capital is our proprietary technology platform, 
              designed to process and analyze vast amounts of market data in real-time. 
              Our infrastructure handles terabytes of data daily, executing millions of 
              calculations per second to identify alpha opportunities.
            </p>
            <p>
              We leverage advanced machine learning algorithms, statistical models, and 
              high-performance computing to develop and deploy systematic trading strategies. 
              Our research team continuously refines these models, incorporating new data 
              sources and adapting to evolving market conditions.
            </p>
            <p>
              Our technology stack includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
              <li>Machine learning models trained on decades of historical market data</li>
              <li>Real-time data processing and analysis infrastructure</li>
              <li>Automated risk management and portfolio optimization systems</li>
              <li>High-frequency execution capabilities across global exchanges</li>
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

        {/* SECTION 7 — Founders */}
      <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
          Meet Our Founders
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center"
          >
          {[
            {
              name: "Daniel Mawioo",
              role: "CEO & Co-Founder",
              image: "/images/founder1.jpg",
              linkedin: "https://www.linkedin.com/in/danielmawioo/",
                bio: "Former quantitative researcher and portfolio manager with extensive experience in systematic trading strategies, factor investing, and risk management at leading hedge funds. Daniel brings deep expertise in quantitative finance and strategic leadership to Evermount Capital.",
            },
            {
              name: "Evans Kipngetich",
              role: "Chief Data Officer & Co-Founder",
              image: "/images/founder2.jpg",
              linkedin: "https://www.linkedin.com/in/evans-kipngetich/",
                bio: "Expert in machine learning, alternative data, and large-scale data infrastructure. Previously led quantitative research teams developing predictive models for financial markets. Evans drives our data science and technology innovation initiatives.",
            },
            {
              name: "Tony K.",
                role: "Head of Quantitative Research",
              image: "/images/founder3.jpg",
              linkedin: "#",
                bio: "PhD in Financial Engineering with deep expertise in stochastic modeling, statistical arbitrage, and portfolio optimization. Published researcher in quantitative finance. Tony leads our research team in developing proprietary trading strategies.",
              },
            ].map(({ name, role, image, linkedin, bio }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg"
                >
                <Image src={image} alt={name} fill className="object-cover" />
                </motion.div>
                <div className="text-center">
                  <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                    {name}
                  </h4>
                  <p className="text-sm text-[#00a76f] font-medium mb-3">{role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {bio}
                  </p>
              </div>
              {linkedin !== "#" && (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:text-[#005983] transition"
                >
                    <FaLinkedin className="text-2xl" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 8 — Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Choose Evermount Capital
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: AcademicCapIcon,
                title: "Proven Expertise",
                description: "Our team combines decades of experience in quantitative finance, data science, and technology. We've worked at leading hedge funds and financial institutions before founding Evermount.",
              },
              {
                icon: BoltIcon,
                title: "Cutting-Edge Technology",
                description: "We invest heavily in technology and research, ensuring our strategies leverage the latest advances in machine learning, data science, and computational finance.",
              },
              {
                icon: CurrencyDollarIcon,
                title: "Performance Focus",
                description: "Our systematic approach has delivered consistent risk-adjusted returns across various market conditions, demonstrating the robustness of our quantitative strategies.",
              },
              {
                icon: GlobeAltIcon,
                title: "Global Reach",
                description: "We trade across major global exchanges, providing diversified exposure to opportunities worldwide. Our systematic approach allows us to operate efficiently across multiple markets.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#00a76f]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
            </div>
              </motion.div>
          ))}
        </div>
        </motion.section>

        {/* SECTION 9 — Closing Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
        <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl text-gray-600 dark:text-gray-400 italic">
              "We're not just building portfolios, we're engineering confidence,
              growth, and resilience — the future belongs to empowered investors."
          </blockquote>
        </div>
        </motion.section>
    </main>
    </>
  );
}
