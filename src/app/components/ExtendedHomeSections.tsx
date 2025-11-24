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
  StarIcon,
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
              Pioneering the Future of Quantitative Investing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded in 2023, Evermount Capital represents a new generation of hedge fund 
              management. We combine cutting-edge artificial intelligence, quantitative 
              research, and institutional-grade risk management to deliver superior returns 
              for our investors.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our team of data scientists, financial engineers, and investment professionals 
              work together to create sophisticated trading algorithms that adapt to market 
              conditions in real-time, ensuring optimal performance across all market cycles.
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
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our proprietary platform leverages machine learning, big data analytics, and 
              cloud infrastructure to deliver institutional-grade investment solutions.
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
                title: "Machine Learning Models",
                description: "Deep neural networks trained on 10+ years of market data for pattern recognition and prediction.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: ChartBarIcon,
                title: "Real-Time Analytics",
                description: "Sub-second data processing and analysis across millions of data points for instant decision-making.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: ShieldCheckIcon,
                title: "Risk Management AI",
                description: "Automated risk assessment and portfolio rebalancing to protect capital while maximizing returns.",
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

      {/* === TESTIMONIALS === */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Investors Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See what our clients say about their experience with Evermount Capital
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
              name: "Sarah Johnson",
              role: "Portfolio Manager",
              company: "Tech Ventures Inc.",
              content: "Evermount's AI-driven strategies have consistently outperformed our benchmarks. The transparency and real-time insights are unmatched.",
              rating: 5,
              image: "/images/testimonial1.jpg",
            },
            {
              name: "Michael Chen",
              role: "Private Investor",
              company: "Independent",
              content: "As someone new to hedge funds, Evermount made the process seamless. The returns speak for themselves, and the support team is exceptional.",
              rating: 5,
              image: "/images/testimonial2.jpg",
            },
            {
              name: "David Williams",
              role: "CFO",
              company: "Global Enterprises",
              content: "The risk management and capital protection features give us confidence. We've seen steady growth with minimal volatility.",
              rating: 5,
              image: "/images/testimonial3.jpg",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <StarIcon key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold"
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experienced professionals driving innovation in quantitative finance
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
                bio: "Former quant trader with 15+ years in algorithmic trading and hedge fund management.",
                image: "/images/founder1.jpg",
              },
              {
                name: "Evans Kipngetich",
                role: "Chief Data Officer & Co-Founder",
                bio: "Data science expert specializing in machine learning applications for financial markets.",
                image: "/images/founder2.jpg",
              },
              {
                name: "Tony K.",
                role: "Lead Quant Analyst",
                bio: "PhD in Financial Engineering with expertise in risk modeling and portfolio optimization.",
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
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Your capital and data security are our top priorities. We employ industry-leading 
              security measures and maintain strict regulatory compliance.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                "Bank-level encryption (256-bit SSL/TLS)",
                "Segregated client accounts",
                "Multi-factor authentication",
                "Regular security audits & penetration testing",
                "GDPR & SOC 2 compliant",
                "24/7 security monitoring",
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
              Global Presence, Local Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Serving investors across continents with localized support and market expertise
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
              { region: "North America", clients: "3,500+", growth: "+45%" },
              { region: "Europe", clients: "2,800+", growth: "+38%" },
              { region: "Asia Pacific", clients: "2,200+", growth: "+52%" },
              { region: "Africa", clients: "1,500+", growth: "+68%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700"
              >
                <GlobeAltIcon className="w-12 h-12 text-[#00a76f] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.clients}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{stat.region}</p>
                <p className="text-sm text-[#00a76f] font-semibold">{stat.growth} YoY</p>
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
            Proven Track Record
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Numbers that demonstrate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { metric: "30%+", label: "Average Annual Returns", icon: ChartBarIcon },
            { metric: "$50M+", label: "Assets Under Management", icon: CurrencyDollarIcon },
            { metric: "1.98", label: "Sharpe Ratio", icon: BoltIcon },
            { metric: "4.8/5", label: "Client Satisfaction", icon: StarIcon },
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
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
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
            Ready to Transform Your Investment Strategy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-white/90"
          >
            Join thousands of investors who trust Evermount Capital for their wealth growth
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

