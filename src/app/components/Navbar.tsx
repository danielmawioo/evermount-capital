"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import { EmailSchema } from "@/lib/schemas";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import NavSubmenu from "./NavSubmenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslatedNav } from "./useTranslatedNav";
import { useLocale } from "@/context/LocaleContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const translatedNav = useTranslatedNav();
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
    if (!EmailSchema.safeParse(email).success) {
      toast.error(t("nav.waitlistInvalid"));
      return;
    }

    try {
      setLoading(true);
      await api.newsletter.subscribe({ email });
      toast.success(t("nav.waitlistSuccess"));
      setEmail("");
      setShowModal(false);
    } catch (err: unknown) {
      logger.error("Waitlist signup failed", err);
      toast.error(getApiErrorMessage(err, t("nav.waitlistError")));
    } finally {
      setLoading(false);
    }
  }, [email, t]);

  useEffect(() => {
    const openWaitlist = () => setShowModal(true);
    window.addEventListener("openWaitlist", openWaitlist);
    return () => {
      window.removeEventListener("openWaitlist", openWaitlist);
    };
  }, []);

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
          <span className="font-semibold">Evermount</span>
          <span className="whitespace-nowrap">{t("banner.tagline")}</span>
          <Link
            href="/platform"
            className="ml-2 underline font-semibold hover:text-green-100 transition flex items-center gap-1"
          >
            {t("banner.explore")}
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
              {translatedNav.map((item) => (
                <div
                  key={item.id}
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
                      <NavSubmenu
                        open={hoveredNav === item.label}
                        items={item.submenu}
                      />
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTheme();
                }}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t("common.toggleTheme")}
                type="button"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>

              <LanguageSwitcher />

              <Link href="/platform" className="hidden xl:inline-flex">
                <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {t("common.explorePlatform")}
                </span>
              </Link>
              <Link href="/book-demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-md transition-all shadow-md hover:shadow-lg bg-[#00a76f] hover:bg-emerald-700"
                >
                  {t("common.requestAccess")}
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t("common.toggleMenu")}
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
                {translatedNav.map((item, idx) => (
                  <motion.div
                    key={item.id}
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
                            key={subItem.id}
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    type="button"
                  >
                    {theme === "dark" ? (
                      <>
                        <SunIcon className="w-5 h-5" />
                        {t("common.lightMode")}
                      </>
                    ) : (
                      <>
                        <MoonIcon className="w-5 h-5" />
                        {t("common.darkMode")}
                      </>
                    )}
                  </motion.button>
                  <div className="flex justify-center py-1">
                    <LanguageSwitcher />
                  </div>
                  <Link href="/book-demo" onClick={() => setMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-md transition-all shadow-md hover:shadow-lg bg-[#00a76f] hover:bg-emerald-700"
                    >
                      {t("common.requestAccess")}
                      <ArrowRightIcon className="w-4 h-4" />
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
                  {t("nav.waitlistTitle")}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {t("nav.waitlistBody")}
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
                  {loading ? t("common.submitting") : t("common.submit")}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
