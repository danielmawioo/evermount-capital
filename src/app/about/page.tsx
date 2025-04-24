import Image from "next/image";

export const metadata = {
  title: "About Us | Evermount Capital",
  description:
    "Meet the Evermount team, our mission, vision, and how we secure your capital with next-gen hedge fund strategies.",
};

export default function AboutPage() {
  return (
    <main className="px-6 py-20 max-w-7xl mx-auto space-y-24">
      {/* Section 1 - Intro */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          A New Breed of Hedge Fund
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          We’re building the future of capital growth — driven by data,
          protected by tech.
        </p>
      </section>

      {/* Section 2 - 2 Column */}
      <section className="grid md:grid-cols-2 gap-10 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-[#00a76f]">Mission</h2>
          <p className="mt-2">
            Unlock elite investing opportunities for all growth-focused
            investors worldwide.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#00a76f]">Vision</h2>
          <p className="mt-2">
            To be the leading AI-powered alternative investment ecosystem in
            Africa & beyond.
          </p>
        </div>
      </section>

      {/* Section 3 - Team Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Founders</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {["Evelyn N.", "James M.", "Tony K."].map((name, i) => (
            <div key={i}>
              <div className="w-28 h-28 mx-auto bg-gray-300 rounded-full shadow" />
              <h4 className="font-semibold mt-2">{name}</h4>
              <p className="text-sm text-gray-500">Quant Strategist</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
