import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const FOUNDERS = [
  {
    name: "Daniel Mawioo",
    role: "CEO, Co-Founder & Low-Latency Systems Engineer",
    image: "/images/founder1.jpg",
    linkedin: "https://www.linkedin.com/in/danielmawioo/",
    bio: "Former quantitative researcher and portfolio manager with extensive experience in systematic trading strategies, factor investing, and risk management at leading hedge funds. Daniel brings deep expertise in quantitative finance and strategic leadership to Evermount.",
  },
  {
    name: "Evans Kipngetich",
    role: "Chief Data Officer & Co-Founder",
    image: "/images/founder2.jpg",
    linkedin: "https://www.linkedin.com/in/evans-kipngetich/",
    bio: "Expert in machine learning, alternative data, and large-scale data infrastructure. Previously led quantitative research teams developing predictive models for financial markets. Evans drives our data science and technology innovation initiatives.",
  },
  {
    name: "Tony K.",
    role: "Head of Quantitative Research",
    image: "/images/founder3.jpg",
    linkedin: "#",
    bio: "PhD in Financial Engineering with deep expertise in stochastic modeling, statistical arbitrage, and portfolio optimization. Published researcher in quantitative finance. Tony leads our research team in developing proprietary trading strategies.",
  },
  {
    name: "Bonface Kuria",
    role: "Head of Security & Infrastructure",
    image: "/images/founder4.jpg",
    linkedin: "https://www.linkedin.com/in/bonface-kuria-4330b3154/",
    bio: "Cybersecurity and network engineering specialist with a background in banking IT infrastructure. CCNP and CCSA certified, with deep expertise in network security, Linux systems, and DevOps. Bonface leads security and infrastructure for Evermount's trading systems.",
  },
  {
    name: "John Esther",
    role: "Senior AI Engineer",
    image: "/images/founder5.jpg",
    linkedin: "https://www.linkedin.com/in/john-esther/",
    bio: "Senior AI engineer specializing in agentic AI systems, retrieval-augmented generation, and production-grade machine learning infrastructure across multi-cloud environments. John builds the AI systems powering Evermount's research and trading technology.",
  },
];

export default function FoundersSection() {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
      >
        Meet Our Founders
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
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center"
      >
        {FOUNDERS.map(({ name, role, image, linkedin, bio }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-32 h-32 relative rounded-full overflow-hidden shadow-lg"
            >
              <Image src={image} alt={name} fill className="object-cover" />
            </motion.div>
            <div className="text-center">
              <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                {name}
              </h4>
              <p className="text-sm text-[#00a76f] font-medium mb-3">{role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {bio}
              </p>
            </div>
            {linkedin !== "#" && (
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:text-[#005983] transition"
              >
                <FaLinkedin className="text-2xl" />
              </motion.a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
