"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function CareersPage() {
  const openings = [
    {
      title: "Frontend Engineer",
      type: "Full-Time · Remote",
      location: "Remote",
      link: "#",
    },
    {
      title: "Quantitative Analyst",
      type: "Full-Time · Nairobi",
      location: "Nairobi, Kenya",
      link: "#",
    },
    {
      title: "Product Designer",
      type: "Contract · Hybrid",
      location: "Hybrid - London",
      link: "#",
    },
    {
      title: "Marketing Strategist",
      type: "Part-Time · Remote",
      location: "Remote",
      link: "#",
    },
  ];

  const jobPostingsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: openings.map((job, index) => ({
      "@type": "JobPosting",
      position: index + 1,
      title: job.title,
      employmentType: job.type.split(" · ")[0],
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
        },
      },
      url: `https://www.evermount.co/careers#${job.title.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  };

  return (
    <>
      <Script
        id="careers-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingsStructuredData),
        }}
      />
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-20 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Join the <span className="text-[#00a76f]">Evermount</span> Mission
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're building the future of hedge fund technology — and we're just
            getting started.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="flex justify-center"
          >
            <Image
              src="/images/Background (2).svg"
              alt="Careers Illustration"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* WHY WORK WITH US */}
        <section className="text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 dark:text-white"
          >
            Why Evermount?
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
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              {
                icon: RocketLaunchIcon,
                title: "Impactful Mission",
                desc: "Help investors worldwide optimize returns through AI and transparency.",
              },
              {
                icon: BriefcaseIcon,
                title: "Growth Culture",
                desc: "We invest in you. Mentorship, ownership, and constant learning.",
              },
              {
                icon: ArrowRightIcon,
                title: "Global Collaboration",
                desc: "Work with brilliant minds across continents — remote-friendly & async.",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-left hover:shadow-md transition"
              >
                <Icon className="h-7 w-7 text-[#00a76f] mb-4" />
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white">{title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* OPEN ROLES */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Open Positions
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
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {openings.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 rounded-md p-5 shadow hover:shadow-lg transition"
              >
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {role.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {role.type} · {role.location}
                  </p>
                </div>
                <Link
                  href={role.link}
                  className="mt-3 sm:mt-0 inline-flex items-center gap-1 text-[#00a76f] font-medium hover:underline"
                >
                  View Role
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Don't see a role for you?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            We're always looking for passionate people. If you're excited by our
            mission, we'd love to hear from you.
          </p>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:careers@evermount.com"
            className="inline-block bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium shadow transition"
          >
            Email Us: careers@evermount.com
          </motion.a>
        </motion.section>
      </div>
    </main>
    </>
  );
}
