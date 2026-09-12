"use client";

import TranslateTree from "@/app/components/TranslateTree";

import Image from "next/image";
import { motion } from "framer-motion";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { containerVariants, itemVariants } from "./motionVariants";

const SECURITY_FEATURES = [
  "256-bit AES encryption for data at rest and in transit",
  "Multi-factor authentication and role-based access controls",
  "Independent risk oversight and compliance monitoring",
];

export default function TechnologyAndSecuritySection() {
  return (
    <TranslateTree>
      <>
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-full">
                <span className="text-[#00a76f] font-semibold text-sm">
                  Security First
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Institutional-Grade Infrastructure & Risk Controls
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We&apos;re building our infrastructure to the highest standards
                of operational excellence, security, and risk management as we
                scale.
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {SECURITY_FEATURES.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <LockClosedIcon className="w-6 h-6 text-[#00a76f] flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/section2.png"
                  alt="Institutional infrastructure and risk controls"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </>
    </TranslateTree>
  );
}
