"use client";

import { motion } from "framer-motion";
import {
  BoltIcon,
  ChartBarIcon,
  CircleStackIcon,
  CpuChipIcon,
  BuildingLibraryIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const SYSTEMS = [
  {
    icon: CpuChipIcon,
    title: "Evermount Intelligence",
    desc: "Financial intelligence powered by AI and machine learning.",
  },
  {
    icon: ChartBarIcon,
    title: "Evermount Quant",
    desc: "Quantitative research, strategy development and simulation.",
  },
  {
    icon: CircleStackIcon,
    title: "Evermount Data",
    desc: "Financial market data infrastructure for African markets.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Evermount Risk",
    desc: "Real-time risk intelligence and portfolio monitoring.",
  },
  {
    icon: BoltIcon,
    title: "Evermount Execution",
    desc: "Systematic trading and execution infrastructure.",
  },
  {
    icon: BuildingLibraryIcon,
    title: "Evermount Capital",
    desc: "Systematic investment strategies powered by Evermount's technology.",
  },
];

export default function PlatformSystemsSection() {
  return (
    <section
      id="platform-systems"
      className="py-16 px-6 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            One Platform. Multiple Financial Systems.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Capital management is one application of the Evermount technology
            stack — not the entire company.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SYSTEMS.map((system) => (
            <motion.div
              key={system.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <system.icon className="w-10 h-10 text-[#00a76f] mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {system.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {system.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
