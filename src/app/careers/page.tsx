"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function CareersPage() {
  const openings = [
    {
      title: "Frontend Engineer",
      type: "Full-Time · Remote",
      location: "Remote",
      link: "#",
    },
    {
      title: "Quantitative Analyst",
      type: "Full-Time · Nairobi",
      location: "Nairobi, Kenya",
      link: "#",
    },
    {
      title: "Product Designer",
      type: "Contract · Hybrid",
      location: "Hybrid - London",
      link: "#",
    },
    {
      title: "Marketing Strategist",
      type: "Part-Time · Remote",
      location: "Remote",
      link: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-20 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Join the <span className="text-[#00a76f]">Evermount</span> Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We’re building the future of hedge fund technology — and we’re just
            getting started.
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/Background (2).svg"
              alt="Careers Illustration"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
        </section>

        {/* WHY WORK WITH US */}
        <section className="text-center space-y-12">
          <h2 className="text-4xl font-bold">Why Evermount?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: RocketLaunchIcon,
                title: "Impactful Mission",
                desc: "Help investors worldwide optimize returns through AI and transparency.",
              },
              {
                icon: BriefcaseIcon,
                title: "Growth Culture",
                desc: "We invest in you. Mentorship, ownership, and constant learning.",
              },
              {
                icon: ArrowRightIcon,
                title: "Global Collaboration",
                desc: "Work with brilliant minds across continents — remote-friendly & async.",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 text-left hover:shadow-md transition"
              >
                <Icon className="h-7 w-7 text-[#00a76f] mb-4" />
                <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
                <p className="text-gray-600 text-sm mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OPEN ROLES */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {openings.map((role, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-md p-5 shadow hover:shadow-lg transition"
              >
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {role.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {role.type} · {role.location}
                  </p>
                </div>
                <Link
                  href={role.link}
                  className="mt-3 sm:mt-0 inline-flex items-center gap-1 text-[#00a76f] font-medium hover:underline"
                >
                  View Role
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Don’t see a role for you?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            We’re always looking for passionate people. If you're excited by our
            mission, we'd love to hear from you.
          </p>
          <a
            href="mailto:careers@evermount.com"
            className="bg-[#00a76f] hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium shadow transition"
          >
            Email Us: careers@evermount.com
          </a>
        </section>
      </div>
    </main>
  );
}
