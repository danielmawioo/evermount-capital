"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  LockClosedIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ExtendedHomeSections() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* === COMPANY OVERVIEW === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">About Evermount</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Systematic Alpha Generation Through Quantitative Excellence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Evermount Capital is a quantitative investment management firm that applies 
              systematic, data-driven approaches to generate alpha across global markets. 
              Our proprietary research platform combines machine learning, statistical arbitrage, 
              and high-frequency trading strategies to identify and exploit market inefficiencies.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We employ a rigorous scientific methodology, leveraging petabytes of historical 
              market data, alternative datasets, and real-time information flows to construct 
              portfolios that deliver consistent risk-adjusted returns. Our quantitative models 
              continuously evolve through machine learning, adapting to changing market regimes 
              and maintaining competitive edge.
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
                alt="Company Overview"
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

      {/* === TECHNOLOGY & PLATFORM === */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Proprietary Technology & Research Infrastructure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our technology stack processes terabytes of data daily, executing millions of 
              calculations per second to identify alpha opportunities. We combine quantitative 
              research, computational finance, and engineering excellence to build systems that 
              outperform traditional investment approaches.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: CpuChipIcon,
                title: "Quantitative Research & Modeling",
                description: "Advanced statistical models, factor analysis, and machine learning algorithms trained on decades of market data. Our research team develops proprietary signals that capture market anomalies and generate consistent alpha across multiple asset classes and time horizons.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: ChartBarIcon,
                title: "High-Performance Computing",
                description: "Ultra-low latency execution infrastructure processing millions of market events per second. Our distributed computing architecture enables real-time portfolio optimization, risk monitoring, and trade execution across global exchanges.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: ShieldCheckIcon,
                title: "Systematic Risk Management",
                description: "Multi-layered risk framework incorporating VaR models, stress testing, and dynamic position sizing. Our risk systems monitor portfolio exposure in real-time, automatically adjusting positions to maintain target risk parameters and protect capital.",
                color: "from-green-500 to-emerald-500",
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6`}
                >
                  <tech.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === INVESTMENT PHILOSOPHY === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">Our Approach</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Systematic Investment Philosophy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              At Evermount Capital, we believe that markets are largely efficient but contain 
              systematic inefficiencies that can be identified and exploited through rigorous 
              quantitative analysis. Our investment process is entirely systematic, removing 
              human emotion and bias from decision-making.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We focus on developing edge through superior data, advanced modeling techniques, 
              and execution excellence. Our strategies span multiple asset classes including 
              equities, fixed income, currencies, commodities, and derivatives, allowing us to 
              diversify risk and capture alpha across different market regimes.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 pt-4"
            >
              {[
                "Multi-strategy approach across asset classes",
                "Systematic signal generation and validation",
                "Dynamic portfolio optimization and rebalancing",
                "Continuous model refinement and backtesting",
                "Risk-adjusted return maximization",
              ].map((principle, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <CheckCircleIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{principle}</span>
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
                alt="Investment Philosophy"
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

      {/* === LEADERSHIP TEAM === */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              World-Class Research & Engineering Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our team combines deep expertise in quantitative finance, computer science, 
              mathematics, and engineering to drive innovation in systematic investing
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Daniel Mawioo",
                role: "CEO & Co-Founder",
                bio: "Former quantitative researcher and portfolio manager with extensive experience in systematic trading strategies, factor investing, and risk management at leading hedge funds.",
                image: "/images/founder1.jpg",
              },
              {
                name: "Evans Kipngetich",
                role: "Chief Data Officer & Co-Founder",
                bio: "Expert in machine learning, alternative data, and large-scale data infrastructure. Previously led quantitative research teams developing predictive models for financial markets.",
                image: "/images/founder2.jpg",
              },
              {
                name: "Tony K.",
                role: "Head of Quantitative Research",
                bio: "PhD in Financial Engineering with deep expertise in stochastic modeling, statistical arbitrage, and portfolio optimization. Published researcher in quantitative finance.",
                image: "/images/founder3.jpg",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden relative"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[#00a76f] font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === SECURITY & COMPLIANCE === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
              <span className="text-[#00a76f] font-semibold text-sm">Security First</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Institutional-Grade Infrastructure & Risk Controls
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We operate with the highest standards of operational excellence, security, and 
              regulatory compliance. Our infrastructure is designed to handle institutional-scale 
              assets with robust risk management, operational controls, and client protection measures.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                "256-bit AES encryption for data at rest and in transit",
                "Segregated client accounts with independent custodians",
                "Multi-factor authentication and role-based access controls",
                "Regular third-party security audits and penetration testing",
                "SOC 2 Type II certified, GDPR compliant, MiFID II regulated",
                "24/7 security operations center and real-time threat monitoring",
                "Disaster recovery and business continuity planning",
                "Independent risk oversight and compliance monitoring",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <LockClosedIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
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
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/section2.png"
                alt="Security"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === GLOBAL REACH === */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#00a76f]/10 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Global Market Access & Diversification
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We trade across major global exchanges and markets, providing our investors with 
              diversified exposure to opportunities worldwide. Our systematic approach allows us 
              to operate efficiently across multiple time zones and jurisdictions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { region: "Equities", markets: "50+ Exchanges", coverage: "Global" },
              { region: "Fixed Income", markets: "Sovereign & Corporate", coverage: "Multi-Currency" },
              { region: "Currencies", markets: "Major & Emerging", coverage: "24/7 FX" },
              { region: "Commodities", markets: "Energy & Metals", coverage: "Futures & Spot" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <GlobeAltIcon className="w-12 h-12 text-[#00a76f] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.region}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{stat.markets}</p>
                <p className="text-sm text-[#00a76f] font-semibold">{stat.coverage}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === SUCCESS METRICS === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Metrics & Track Record
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our systematic approach has delivered consistent risk-adjusted returns across 
            various market conditions, demonstrating the robustness of our quantitative strategies
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { metric: "1.85+", label: "Information Ratio", icon: ChartBarIcon, desc: "Risk-adjusted performance metric" },
            { metric: "$50M+", label: "Assets Under Management", icon: CurrencyDollarIcon, desc: "Institutional scale" },
            { metric: "0.35", label: "Maximum Drawdown", icon: ShieldCheckIcon, desc: "Capital preservation focus" },
            { metric: "15%+", label: "Annualized Alpha", icon: BoltIcon, desc: "Excess returns vs benchmark" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gradient-to-br from-[#00a76f]/10 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl text-center border border-[#00a76f]/20 dark:border-gray-700"
            >
              <stat.icon className="w-12 h-12 text-[#00a76f] mx-auto mb-4" />
              <motion.h3
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2, type: "spring" }}
                className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2"
              >
                {stat.metric}
              </motion.h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                {stat.label}
              </p>
              {stat.desc && (
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {stat.desc}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CALL TO ACTION === */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#00a76f] to-emerald-600 text-white relative overflow-hidden">
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
            Partner with a Systematic Investment Leader
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Discover how quantitative excellence and systematic strategies can enhance your 
            investment portfolio. Schedule a consultation with our team to learn more about 
            our approach and investment solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/book-demo">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#00a76f] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition"
              >
                Schedule a Demo
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                Get Started Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

