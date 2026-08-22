import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { JobOpening } from "./openings";

interface ApplyModalProps {
  job: JobOpening;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Apply for {job.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Choose how you&apos;d like to apply for this position.
          </p>
          <div className="space-y-3">
            <motion.a
              href={`mailto:${job.applyEmail}?subject=Application for ${job.title}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition shadow-md"
            >
              Apply via Email
            </motion.a>
            {job.linkedinUrl && (
              <motion.a
                href={job.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full border-2 border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white px-6 py-3 rounded-lg font-semibold text-center transition"
              >
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
                className="block w-full border-2 border-[#003A9B] text-[#003A9B] hover:bg-[#003A9B] hover:text-white px-6 py-3 rounded-lg font-semibold text-center transition"
              >
                Apply on Indeed
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
