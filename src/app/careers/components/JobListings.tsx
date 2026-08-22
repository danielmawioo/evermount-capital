import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import type { JobOpening } from "./openings";

interface JobListingsProps {
  openings: JobOpening[];
  expandedJob: string | null;
  onToggleJob: (jobId: string) => void;
  onApply: (job: JobOpening) => void;
}

export default function JobListings({
  openings,
  expandedJob,
  onToggleJob,
  onApply,
}: JobListingsProps) {
  return (
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
              onClick={() => onToggleJob(job.id)}
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
                        onClick={() => onApply(job)}
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
  );
}
