import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./motionVariants";

const ROADMAP_STEPS = [
  {
    icon: "/illustrations/signup.svg",
    title: "1. Onboarding",
    description: "Create an account and complete KYC verification securely.",
  },
  {
    icon: "/illustrations/fund.svg",
    title: "2. Fund Wallet",
    description: "Deposit capital using your preferred secure method.",
  },
  {
    icon: "/illustrations/growth.svg",
    title: "3. Portfolio Allocation",
    description:
      "Systematic allocation across quantitative strategies based on your risk-return objectives.",
  },
  {
    icon: "/illustrations/withdraw.svg",
    title: "4. Performance Monitoring",
    description:
      "Real-time portfolio analytics and quarterly performance attribution reports.",
  },
];

export default function RoadmapSection() {
  return (
    <section className="bg-[#f9f9f9] dark:bg-gray-800 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Investor Journey Roadmap
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {ROADMAP_STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
            >
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={step.icon}
                alt={step.title}
                className="w-20 h-20 mx-auto mb-3"
              />
              <h4 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
