"use client";

import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import Script from "next/script";
import { motion } from "framer-motion";

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
      <main className="px-6 py-20 max-w-7xl mx-auto space-y-28">
        {/* SECTION 1 — Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            A New Breed of Hedge Fund
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We're building the future of capital growth — driven by data,
            protected by tech, and designed for high-growth investors.
          </p>
        </motion.section>

        {/* SECTION 2 — Mission & Vision */}
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
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              To unlock elite investing opportunities for all growth-focused
              investors, combining algorithmic performance with risk-managed
              systems across emerging and developed markets.
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
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              To be Africa's most trusted AI-powered alternative investment
              ecosystem — enabling secure, scalable, and borderless capital
              growth.
            </p>
          </motion.div>
        </section>

        {/* SECTION 3 — Founders */}
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
              },
              {
                name: "Evans Kipngetich",
                role: "Chief Data Officer & Co-Founder",
                image: "/images/founder2.jpg",
                linkedin: "https://www.linkedin.com/in/evans-kipngetich/",
              },
              {
                name: "Tony K.",
                role: "Lead Quant Analyst",
                image: "/images/founder3.jpg",
                linkedin: "#",
              },
            ].map(({ name, role, image, linkedin }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-28 h-28 relative rounded-full overflow-hidden shadow-lg"
                >
                  <Image src={image} alt={name} fill className="object-cover" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
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
                    <FaLinkedin className="text-xl" />
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 4 — Closing Statement */}
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
