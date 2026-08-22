import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const SECURITY_POINTS = [
  "Multi-layer risk management framework",
  "24/7 monitoring of trading environments",
  "Investor capital protected through isolation and limits",
];

export default function SecuritySection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        Institutional-Grade Security
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/images/security-dashboard.png"
            alt="Security"
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ul className="space-y-4">
            {SECURITY_POINTS.map((item, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-[#00a76f] font-bold text-lg">✓</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
