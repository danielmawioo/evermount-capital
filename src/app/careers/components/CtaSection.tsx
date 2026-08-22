import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mt-20"
    >
      <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
        Don&apos;t see a role for you?
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
        We&apos;re always looking for passionate people. If you&apos;re excited by our
        mission, we&apos;d love to hear from you.
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
  );
}
