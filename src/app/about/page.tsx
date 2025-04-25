import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export const metadata = {
  title: "About Us | Evermount Capital",
  description:
    "Meet the Evermount team, our mission, vision, and how we secure your capital with next-gen hedge fund strategies.",
};

export default function AboutPage() {
  return (
    <main className="px-6 py-20 max-w-7xl mx-auto space-y-28">
      {/* SECTION 1 — Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          A New Breed of Hedge Fund
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We’re building the future of capital growth — driven by data,
          protected by tech, and designed for high-growth investors.
        </p>
      </section>

      {/* SECTION 2 — Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-10 text-gray-700">
        <div className="bg-[#f5fdfb] p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-[#00a76f] mb-3">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-700">
            To unlock elite investing opportunities for all growth-focused
            investors, combining algorithmic performance with risk-managed
            systems across emerging and developed markets.
          </p>
        </div>
        <div className="bg-[#f5fdfb] p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-[#00a76f] mb-3">Our Vision</h2>
          <p className="leading-relaxed text-gray-700">
            To be Africa’s most trusted AI-powered alternative investment
            ecosystem — enabling secure, scalable, and borderless capital
            growth.
          </p>
        </div>
      </section>

      {/* SECTION 3 — Founders */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Founders
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {[
            {
              name: "Daniel Mawioo",
              role: "CEO & Co-Founder",
              image: "/images/founder1.jpg",
              linkedin: "https://www.linkedin.com/in/danielmawioo/",
            },
            {
              name: "Evans Kipngetich",
              role: "Chief Data Officer & Co-Founder",
              image: "/images/founder2.jpg",
              linkedin: "https://www.linkedin.com/in/evans-kipngetich/",
            },
            {
              name: "Tony K.",
              role: "Lead Quant Analyst",
              image: "/images/founder3.jpg",
              linkedin: "#",
            },
          ].map(({ name, role, image, linkedin }, i) => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="w-28 h-28 relative rounded-full overflow-hidden shadow-lg">
                <Image src={image} alt={name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900">{name}</h4>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
              {linkedin !== "#" && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:text-[#005983] transition"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Closing Statement */}
      <section className="text-center">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-600 italic">
            “We’re not just building portfolios, we’re engineering confidence,
            growth, and resilience — the future belongs to empowered investors.”
          </blockquote>
        </div>
      </section>
    </main>
  );
}
