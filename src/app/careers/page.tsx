"use client";

import TranslateTree from "@/app/components/TranslateTree";

import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import JobListings from "./components/JobListings";
import CtaSection from "./components/CtaSection";
import ApplyModal from "./components/ApplyModal";
import { openings, type JobOpening } from "./components/openings";

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<string | null>(null);

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

  const applyJob = openings.find((job) => job.id === showApplyModal) ?? null;

  return (
    <TranslateTree>
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
            <HeroSection />
            <ValuesSection />
            <JobListings
              openings={openings}
              expandedJob={expandedJob}
              onToggleJob={toggleJob}
              onApply={handleApply}
            />
            <CtaSection />
          </div>

          <AnimatePresence>
            {applyJob && (
              <ApplyModal job={applyJob} onClose={closeApplyModal} />
            )}
          </AnimatePresence>
        </main>
      </>
    </TranslateTree>
  );
}
