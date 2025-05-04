"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleJoin = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://api.evermount.co/a/waitlist", { email });
      setMessage({
        type: "success",
        text: "You're on the waitlist! We'll be in touch 🎉",
      });
      setEmail("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Something went wrong. Try again.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sticky Container for Banner + Navbar */}
      <div className="sticky top-0 z-[60] w-full">
        {/* 🎉 Waitlist Banner */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 text-white text-sm sm:text-base text-center px-4 py-1.5 font-medium shadow z-[61]">
          <p className="flex flex-wrap justify-center items-center gap-2">
            🎉 <span className="whitespace-nowrap">Beta Launch Incoming</span> —
            <span className="hidden sm:inline">
              Join our Private Waitlist & Get Early Access!
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="ml-2 underline font-semibold hover:text-lime-100 transition"
            >
              Join Now →
            </button>
          </p>
        </div>

        {/* Main Navbar */}
        <header className="bg-white border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/icons/icon1.png"
                alt="Evermount Logo"
                width={40}
                height={40}
                priority
              />
              <span className="text-2xl font-extrabold text-[#00a76f] tracking-tight">
                <i>Evermount</i>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-10 text-[16px] font-medium text-gray-700 items-center">
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-black">
                  <span>Platform</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </button>
                <div className="absolute top-full left-0 mt-4 bg-white border border-gray-100 rounded-lg shadow-lg w-[280px] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <ul className="space-y-4 text-gray-700 text-sm">
                    <li>
                      <Link
                        href="/portfolio-insights"
                        className="flex items-start space-x-3 hover:text-black"
                      >
                        <ChartBarIcon className="w-6 h-6 text-[#00a76f] mt-1" />
                        <div>
                          <p className="font-semibold">Portfolio Insights</p>
                          <p className="text-xs text-gray-500">
                            View performance and analytics across strategies.
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/features"
                        className="flex items-start space-x-3 hover:text-black"
                      >
                        <ShieldCheckIcon className="w-6 h-6 text-[#00a76f] mt-1" />
                        <div>
                          <p className="font-semibold">Risk Metrics</p>
                          <p className="text-xs text-gray-500">
                            Monitor portfolio risks in real-time.
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="/pricing" className="hover:text-black">
                Pricing
              </Link>

              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-black">
                  <span>About</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </button>
                <div className="absolute top-full left-0 mt-4 bg-white border border-gray-100 rounded-lg shadow-lg w-[260px] p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <ul className="space-y-4 text-gray-700 text-sm">
                    <li className="flex items-start space-x-3 hover:text-black">
                      <BuildingOfficeIcon className="w-6 h-6 text-[#00a76f] mt-1" />
                      <Link href="/about">
                        <div>
                          <p className="font-semibold">Our Story</p>
                          <p className="text-xs text-gray-500">
                            Discover our journey and values.
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-start space-x-3 hover:text-black">
                      <CodeBracketIcon className="w-6 h-6 text-[#00a76f] mt-1" />
                      <Link href="/careers">
                        <div>
                          <p className="font-semibold">Careers</p>
                          <p className="text-xs text-gray-500">
                            Join our mission-driven team.
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none"
            >
              {menuOpen ? (
                <XMarkIcon className="h-7 w-7 text-[#00a76f]" />
              ) : (
                <Bars3Icon className="h-7 w-7 text-[#00a76f]" />
              )}
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition">
                  Invest Now
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="flex flex-col p-6 space-y-4 text-gray-700 font-medium">
                <Link
                  href="/portfolio-insights"
                  onClick={() => setMenuOpen(false)}
                >
                  Portfolio Insights
                </Link>
                <Link href="/features" onClick={() => setMenuOpen(false)}>
                  Risk Metrics
                </Link>
                <Link href="/pricing" onClick={() => setMenuOpen(false)}>
                  Pricing
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
                <Link href="/careers" onClick={() => setMenuOpen(false)}>
                  Careers
                </Link>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="flex items-center gap-2 mt-4 bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 text-white px-5 py-2 rounded-md font-semibold hover:opacity-90 transition">
                    Invest Now
                    <ArrowTrendingUpIcon className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative">
            <button
              onClick={() => {
                setShowModal(false);
                setMessage(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Join the Waitlist
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Get early access to our beta and priority onboarding.
            </p>
            {message && (
              <div
                className={`text-sm text-center mb-4 ${
                  message.type === "error" ? "text-red-600" : "text-green-600"
                }`}
              >
                {message.text}
              </div>
            )}
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-sm text-black placeholder-gray-400 focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none mb-4"
            />
            <button
              onClick={handleJoin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-yellow-400 text-white py-3 rounded-lg text-base font-semibold hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
