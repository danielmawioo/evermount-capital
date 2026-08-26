"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import {
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function PlatformPage() {
  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Evermount Capital Platform",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Quantitative trading and market-making technology platform for African financial markets, providing systematic strategies, portfolio management, and real-time analytics.",
  };

  const platformFeatures = [
    {
      icon: CpuChipIcon,
      title: "AI-Powered Execution",
      description:
        "Autonomous trading systems powered by machine learning and quantitative models.",
    },
    {
      icon: ChartBarIcon,
      title: "Real-Time Analytics",
      description:
        "Live performance tracking, risk metrics, and portfolio insights.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, multi-factor authentication, and compliance monitoring.",
    },
    {
      icon: BoltIcon,
      title: "Electronic Trading Infrastructure",
      description:
        "Systematic, low-latency execution built for reliability and speed.",
    },
    {
      icon: GlobeAltIcon,
      title: "African Market Focus",
      description:
        "Purpose-built for African financial markets, with a roadmap toward broader market connectivity.",
    },
    {
      icon: LockClosedIcon,
      title: "Risk Management",
      description:
        "Automated risk controls, position limits, and real-time monitoring.",
    },
  ];

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

  return (
    <>
      <Script
        id="platform-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationStructuredData),
        }}
      />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-6">
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 right-10 w-96 h-96 bg-[#00a76f] rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.15, 0.1],
                x: [0, -80, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                The Platform
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Evermount is building systematic quantitative strategies,
                proprietary execution technology, and institutional-grade
                infrastructure — purpose-built for African financial markets.
              </p>
            </motion.div>

            {/* Platform Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {platformFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <feature.icon className="w-10 h-10 text-[#00a76f] mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
