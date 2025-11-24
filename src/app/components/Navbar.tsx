"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  ArrowRightIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleJoin = useCallback(async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://api.evermount.co/waitlist", { email });
      toast.success("You're on the waitlist! 🎉");
      setEmail("");
      setShowModal(false);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    const openWaitlist = () => setShowModal(true);
    window.addEventListener("openWaitlist", openWaitlist);
    return () => {
      window.removeEventListener("openWaitlist", openWaitlist);
    };
  }, []);

  const navItems = [
    {
      label: "Strategies",
      href: "/features",
      submenu: [
        {
          label: "Quantitative Trading",
          description: "AI-powered algorithmic strategies",
          href: "/features",
          icon: CpuChipIcon,
        },
        {
          label: "Risk Management",
          description: "Real-time portfolio risk analytics",
          href: "/portfolio-insights",
          icon: ShieldCheckIcon,
        },
        {
          label: "Portfolio Analytics",
          description: "Advanced performance insights",
          href: "/portfolio-insights",
          icon: PresentationChartLineIcon,
        },
      ],
    },
    {
      label: "Performance",
      href: "/portfolio-insights",
    },
    {
      label: "Institutional",
      href: "/pricing",
    },
    {
      label: "Investors",
      href: "/about",
      submenu: [
        {
          label: "Our Story",
          description: "Learn about our mission and team",
          href: "/about",
          icon: BuildingOfficeIcon,
        },
        {
          label: "Careers",
          description: "Join our quantitative team",
          href: "/careers",
          icon: BuildingOfficeIcon,
        },
      ],
    },
    {
      label: "Resources",
      href: "/investor-tour",
      submenu: [
        {
          label: "Investor Tour",
          description: "Explore our platform",
          href: "/investor-tour",
          icon: BookOpenIcon,
        },
        {
          label: "Platform",
          description: "Technology and infrastructure",
          href: "/platform",
          icon: ChartBarIcon,
        },
      ],
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Announcement Banner */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#00a76f] via-emerald-500 to-green-400 text-white text-sm sm:text-base text-center px-4 py-2.5 font-medium relative z-[60]"
      >
        <p className="flex flex-wrap justify-center items-center gap-2">
          <span className="font-semibold">🚀 New:</span>
          <span className="whitespace-nowrap">We're open-sourcing our AI-powered quantitative trading infrastructure.</span>
          <Link
            href="/book-demo"
            className="ml-2 underline font-semibold hover:text-green-100 transition flex items-center gap-1"
          >
            Try now
            <ArrowRightIcon className="w-4 h-4 inline" />
          </Link>
        </p>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800"
            : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/icons/icon1.png"
                  alt="Evermount Logo"
                  width={32}
                  height={32}
                  priority
                  className="rounded"
                />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#00a76f] transition-colors">
                Evermount
              </span>
            </Link>

            {/* Desktop Navigation - Scale AI Style */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {item.submenu ? (
                    <>
                      <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2">
                        <span>{item.label}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                      </button>
                      <AnimatePresence>
                        {hoveredNav === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2"
                          >
                            {item.submenu.map((subItem, idx) => (
                              <motion.div
                                key={subItem.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group/item"
                                >
                                  <subItem.icon className="w-5 h-5 text-[#00a76f] mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover/item:text-[#00a76f] transition-colors">
                                      {subItem.label}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions - Scale AI Style */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>

              <Link href="/book-demo" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Book a Demo
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#00a76f] hover:bg-emerald-700 rounded-md transition-colors"
                >
                  Log In
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  {/* Theme Toggle in Mobile Menu */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {theme === "dark" ? (
                      <>
                        <SunIcon className="w-5 h-5" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <MoonIcon className="w-5 h-5" />
                        Dark Mode
                      </>
                    )}
                  </motion.button>
                  <Link href="/book-demo" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Book a Demo
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-[#00a76f] hover:bg-emerald-700 rounded-md transition-colors"
                    >
                      Log In
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowModal(false);
                setEmail("");
              }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEmail("");
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Join the Waitlist
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Get early access to our beta and priority onboarding.
                </p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00a76f] focus:border-[#00a76f] focus:outline-none mb-4 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoin}
                  disabled={loading}
                  className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-lg text-base font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
