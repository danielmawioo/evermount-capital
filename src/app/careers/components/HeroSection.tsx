import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
        Join the <span className="text-[#00a76f]">Evermount</span> Mission
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        We&apos;re building the future of quantitative investment management —
        and we&apos;re just getting started. Join a team of world-class
        engineers, researchers, and designers.
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="flex justify-center"
      >
        <Image
          src="/images/Background (2).svg"
          alt="Careers Illustration"
          width={500}
          height={300}
          className="rounded-lg shadow-xl"
        />
      </motion.div>
    </motion.section>
  );
}
