"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BriefcaseIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XMarkIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  salary?: string;
  experience: string;
  linkedinUrl?: string;
  indeedUrl?: string;
  applyEmail: string;
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<string | null>(null);

  const openings: JobOpening[] = [
    {
      id: "frontend-engineer",
      title: "Frontend Engineer",
      type: "Full-Time",
      location: "Remote",
      department: "Engineering",
      description: "We're looking for a talented Frontend Engineer to join our engineering team. You'll work on building beautiful, performant user interfaces for our quantitative investment platform using React, Next.js, and TypeScript.",
      responsibilities: [
        "Build and maintain responsive, accessible user interfaces",
        "Collaborate with designers and backend engineers to implement features",
        "Optimize application performance and user experience",
        "Write clean, maintainable, and well-tested code",
        "Participate in code reviews and technical discussions",
        "Contribute to architectural decisions and best practices",
      ],
      requirements: [
        "3+ years of experience with React and TypeScript",
        "Strong proficiency in Next.js and modern frontend tooling",
        "Experience with state management (Redux, Zustand, or similar)",
        "Familiarity with Tailwind CSS and component libraries",
        "Understanding of RESTful APIs and GraphQL",
        "Experience with testing frameworks (Jest, React Testing Library)",
        "Strong problem-solving and debugging skills",
      ],
      niceToHave: [
        "Experience with financial or fintech applications",
        "Knowledge of WebSocket connections and real-time data",
        "Familiarity with data visualization libraries (Chart.js, D3.js)",
        "Experience with animation libraries (Framer Motion)",
        "Understanding of accessibility standards (WCAG)",
      ],
      benefits: [
        "Competitive salary and equity package",
        "Remote-first work environment",
        "Health, dental, and vision insurance",
        "Flexible PTO and paid holidays",
        "Professional development budget",
        "Top-tier equipment and home office setup",
      ],
      salary: "$90,000 - $130,000",
      experience: "Mid-Level",
      linkedinUrl: "https://www.linkedin.com/jobs/view/1234567890",
      indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def456",
      applyEmail: "careers@evermount.co",
    },
    {
      id: "quantitative-analyst",
      title: "Quantitative Analyst",
      type: "Full-Time",
      location: "Nairobi, Kenya",
      department: "Research",
      description: "Join our quantitative research team to develop and implement systematic trading strategies. You'll work with large datasets, build predictive models, and contribute to our proprietary trading algorithms.",
      responsibilities: [
        "Research and develop quantitative trading strategies",
        "Analyze market data and identify alpha opportunities",
        "Build and backtest statistical models",
        "Collaborate with engineering team to implement strategies",
        "Monitor strategy performance and risk metrics",
        "Contribute to research publications and documentation",
      ],
      requirements: [
        "Master's degree or PhD in Quantitative Finance, Mathematics, Statistics, or related field",
        "2+ years of experience in quantitative research or trading",
        "Strong programming skills in Python or R",
        "Experience with statistical modeling and machine learning",
        "Knowledge of financial markets and instruments",
        "Familiarity with backtesting frameworks",
        "Strong analytical and problem-solving skills",
      ],
      niceToHave: [
        "Experience with alternative data sources",
        "Knowledge of high-frequency trading",
        "Publications in quantitative finance",
        "CFA or FRM certification",
        "Experience with cloud computing platforms",
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Hybrid work model (office + remote)",
        "Health insurance and wellness programs",
        "Research conference attendance",
        "Access to premium data sources and tools",
        "Collaborative research environment",
      ],
      salary: "$80,000 - $120,000",
      experience: "Mid to Senior",
      linkedinUrl: "https://www.linkedin.com/jobs/view/1234567891",
      indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def457",
      applyEmail: "careers@evermount.co",
    },
    {
      id: "product-designer",
      title: "Product Designer",
      type: "Contract",
      location: "Hybrid - London",
      department: "Design",
      description: "We're seeking a creative Product Designer to shape the user experience of our investment platform. You'll work closely with product managers and engineers to design intuitive, data-rich interfaces for sophisticated financial tools.",
      responsibilities: [
        "Design user interfaces for complex financial dashboards",
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Collaborate with cross-functional teams",
        "Maintain and evolve design system",
        "Ensure designs are accessible and responsive",
      ],
      requirements: [
        "4+ years of product design experience",
        "Strong portfolio showcasing complex data visualization",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Experience designing for financial or B2B SaaS products",
        "Understanding of user research methodologies",
        "Strong communication and presentation skills",
      ],
      niceToHave: [
        "Experience with design systems",
        "Knowledge of frontend development (HTML/CSS)",
        "Experience with animation and micro-interactions",
        "Understanding of quantitative finance concepts",
      ],
      benefits: [
        "Competitive contract rate",
        "Flexible working hours",
        "Remote work options",
        "Creative freedom and ownership",
        "Collaborative team environment",
      ],
      salary: "$70 - $100/hour",
      experience: "Senior",
      linkedinUrl: "https://www.linkedin.com/jobs/view/1234567892",
      indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def458",
      applyEmail: "careers@evermount.co",
    },
    {
      id: "marketing-strategist",
      title: "Marketing Strategist",
      type: "Part-Time",
      location: "Remote",
      department: "Marketing",
      description: "Join our marketing team to develop and execute growth strategies for our quantitative investment platform. You'll work on content marketing, digital campaigns, and brand positioning in the fintech space.",
      responsibilities: [
        "Develop and execute marketing strategies",
        "Create content for blog, social media, and email campaigns",
        "Manage digital marketing channels (SEO, SEM, social media)",
        "Analyze marketing metrics and optimize campaigns",
        "Collaborate with sales team on lead generation",
        "Attend industry events and build partnerships",
      ],
      requirements: [
        "3+ years of marketing experience, preferably in fintech",
        "Strong writing and content creation skills",
        "Experience with marketing analytics tools",
        "Knowledge of SEO and digital marketing best practices",
        "Familiarity with CRM and marketing automation platforms",
        "Strong analytical and creative thinking",
      ],
      niceToHave: [
        "Experience with financial services marketing",
        "Knowledge of quantitative finance concepts",
        "Experience with video production",
        "Graphic design skills",
      ],
      benefits: [
        "Competitive hourly rate",
        "Flexible schedule",
        "Remote work",
        "Creative autonomy",
        "Growth opportunities",
      ],
      salary: "$40 - $60/hour",
      experience: "Mid-Level",
      linkedinUrl: "https://www.linkedin.com/jobs/view/1234567893",
      indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def459",
      applyEmail: "careers@evermount.co",
    },
  ];

  const jobPostingsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: openings.map((job, index) => ({
      "@type": "JobPosting",
      position: index + 1,
      title: job.title,
      employmentType: job.type,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
        },
      },
      baseSalary: job.salary
        ? {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              value: job.salary,
            },
          }
        : undefined,
      description: job.description,
      qualifications: job.requirements.join(" "),
      responsibilities: job.responsibilities.join(" "),
      url: `https://www.evermount.co/careers#${job.id}`,
    })),
  };

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApply = (job: JobOpening) => {
    setShowApplyModal(job.id);
  };

  const closeApplyModal = () => {
    setShowApplyModal(null);
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
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-20 text-gray-800 dark:text-gray-200">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* HERO */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Join the <span className="text-[#00a76f]">Evermount</span> Mission
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're building the future of quantitative investment management — and we're just
              getting started. Join a team of world-class engineers, researchers, and designers.
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
                  desc: "Help investors worldwide optimize returns through systematic quantitative strategies and transparency.",
                },
                {
                  icon: BriefcaseIcon,
                  title: "Growth Culture",
                  desc: "We invest in you. Mentorship, ownership, and constant learning opportunities.",
                },
                {
                  icon: ArrowRightIcon,
                  title: "Global Collaboration",
                  desc: "Work with brilliant minds across continents — remote-friendly & async-first culture.",
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
            <div className="space-y-4 max-w-4xl mx-auto">
              {openings.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {/* Job Header */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="px-2 py-1 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 text-[#00a76f] rounded-md text-xs font-medium">
                              {job.department}
                            </span>
                          </div>
                        </div>
                        {expandedJob === job.id ? (
                          <ChevronUpIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDownIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 shrink-0" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Job Details */}
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
                          {/* Description */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About the Role</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.description}</p>
                          </div>

                          {/* Key Info */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            {job.salary && (
                              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <CurrencyDollarIcon className="w-5 h-5 text-[#00a76f]" />
                                <span className="text-sm">
                                  <strong>Salary:</strong> {job.salary}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <AcademicCapIcon className="w-5 h-5 text-[#00a76f]" />
                              <span className="text-sm">
                                <strong>Experience:</strong> {job.experience}
                              </span>
                            </div>
                          </div>

                          {/* Responsibilities */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                  <CheckCircleIcon className="w-5 h-5 text-[#00a76f] shrink-0 mt-0.5" />
                                  <span className="text-sm">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                  <CheckCircleIcon className="w-5 h-5 text-[#00a76f] shrink-0 mt-0.5" />
                                  <span className="text-sm">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Nice to Have */}
                          {job.niceToHave.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Nice to Have</h4>
                              <ul className="space-y-2">
                                {job.niceToHave.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                    <CheckCircleIcon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <span className="text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Benefits */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits & Perks</h4>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {job.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                  <CheckCircleIcon className="w-4 h-4 text-[#00a76f] shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Apply Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApply(job)}
                              className="flex-1 bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
                            >
                              Apply Now
                            </motion.button>
                            {job.linkedinUrl && (
                              <motion.a
                                href={job.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white rounded-lg font-semibold transition"
                              >
                                <LinkIcon className="w-5 h-5" />
                                Apply on LinkedIn
                              </motion.a>
                            )}
                            {job.indeedUrl && (
                              <motion.a
                                href={job.indeedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-[#003A9B] text-[#003A9B] hover:bg-[#003A9B] hover:text-white rounded-lg font-semibold transition"
                              >
                                <LinkIcon className="w-5 h-5" />
                                Apply on Indeed
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
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
              href="mailto:careers@evermount.co"
              className="inline-block bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium shadow transition"
            >
              Email Us: careers@evermount.co
            </motion.a>
          </motion.section>
        </div>

        {/* Apply Modal */}
        <AnimatePresence>
          {showApplyModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeApplyModal}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
                  <button
                    onClick={closeApplyModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    Apply for {openings.find((j) => j.id === showApplyModal)?.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Choose how you'd like to apply for this position.
                  </p>
                  <div className="space-y-3">
                    <motion.a
                      href={`mailto:${openings.find((j) => j.id === showApplyModal)?.applyEmail}?subject=Application for ${openings.find((j) => j.id === showApplyModal)?.title}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition shadow-md"
                    >
                      Apply via Email
                    </motion.a>
                    {openings.find((j) => j.id === showApplyModal)?.linkedinUrl && (
                      <motion.a
                        href={openings.find((j) => j.id === showApplyModal)?.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full border-2 border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white px-6 py-3 rounded-lg font-semibold text-center transition"
                      >
                        Apply on LinkedIn
                      </motion.a>
                    )}
                    {openings.find((j) => j.id === showApplyModal)?.indeedUrl && (
                      <motion.a
                        href={openings.find((j) => j.id === showApplyModal)?.indeedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="block w-full border-2 border-[#003A9B] text-[#003A9B] hover:bg-[#003A9B] hover:text-white px-6 py-3 rounded-lg font-semibold text-center transition"
                      >
                        Apply on Indeed
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
