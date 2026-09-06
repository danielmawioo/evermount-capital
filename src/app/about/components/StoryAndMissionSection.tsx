"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { motion } from "framer-motion";

export default function StoryAndMissionSection() {
  return (
    <TranslateTree>
      <>
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Story
          </h2>
          <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Founded in 2023, Evermount was created to make sophisticated
              financial infrastructure more accessible, programmable and
              scalable.
            </p>
            <p>
              Financial markets are complex, fragmented and technically
              difficult to build on. We combine data engineering, quantitative
              research, machine learning and execution technology so
              institutions and developers can build on a common foundation.
            </p>
            <p>
              The brand is globally oriented: infrastructure that can operate
              across markets and jurisdictions as capabilities and licenses
              allow.
            </p>
          </div>
        </motion.section>

        <section className="grid md:grid-cols-2 gap-10 text-gray-700 dark:text-gray-300">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#f5fdfb] dark:bg-gray-800 p-8 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-[#00a76f] mb-3">
              Our Mission
            </h2>
            <p className="leading-relaxed">
              Make sophisticated financial infrastructure more accessible,
              programmable and scalable.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#f5fdfb] dark:bg-gray-800 p-8 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold text-[#00a76f] mb-3">
              Our Vision
            </h2>
            <p className="leading-relaxed">
              A financial ecosystem where institutions, developers and
              researchers can build sophisticated market applications on
              reliable infrastructure.
            </p>
          </motion.div>
        </section>
      </>
    </TranslateTree>
  );
}
