import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BoltIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const WHY_CHOOSE_US_ITEMS = [
  {
    icon: AcademicCapIcon,
    title: "Proven Expertise",
    description:
      "Our team combines decades of experience in quantitative finance, data science, and technology. We've worked at leading hedge funds and financial institutions before founding Evermount.",
  },
  {
    icon: BoltIcon,
    title: "Cutting-Edge Technology",
    description:
      "We invest heavily in technology and research, ensuring our strategies leverage the latest advances in machine learning, data science, and computational finance.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Performance Focus",
    description:
      "Our systematic approach has delivered consistent risk-adjusted returns across various market conditions, demonstrating the robustness of our quantitative strategies.",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Reach",
    description:
      "We trade across major global exchanges, providing diversified exposure to opportunities worldwide. Our systematic approach allows us to operate efficiently across multiple markets.",
  },
];

export default function WhyChooseUsAndClosingSection() {
  return (
    <>
      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Choose Evermount Capital
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {WHY_CHOOSE_US_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#00a76f]/10 dark:bg-[#00a76f]/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#00a76f]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Closing Statement */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-600 dark:text-gray-400 italic">
            &quot;We&apos;re not just building portfolios, we&apos;re
            engineering confidence, growth, and resilience — the future belongs
            to empowered investors.&quot;
          </blockquote>
        </div>
      </motion.section>
    </>
  );
}
