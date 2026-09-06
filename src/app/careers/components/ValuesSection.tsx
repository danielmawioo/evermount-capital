"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: RocketLaunchIcon,
    title: "Engineering",
    desc: "Backend, distributed systems, data engineering, SRE and frontend.",
  },
  {
    icon: BriefcaseIcon,
    title: "Quantitative Research",
    desc: "Quant research, quant development, financial engineering and market microstructure.",
  },
  {
    icon: ArrowRightIcon,
    title: "AI & Market Infrastructure",
    desc: "Machine learning, market connectivity, trading systems and execution technology.",
  },
];

export default function ValuesSection() {
  return (
    <TranslateTree>
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
          {values.map(({ icon: Icon, title, desc }, idx) => (
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
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                {title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </TranslateTree>
  );
}
