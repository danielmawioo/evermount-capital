"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLinkedinIn, FaTiktok, FaDiscord, FaXTwitter } from "react-icons/fa6";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { EmailSchema } from "@/lib/schemas";
import FooterColumn from "./FooterColumn";
import {
  platformColumn,
  marketsColumn,
  companyColumn,
  resourcesColumn,
  legalComplianceColumn,
} from "./footerColumns";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EmailSchema.safeParse(email).success) return;

    try {
      await api.newsletter.subscribe({ email });
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      logger.error("Newsletter submission error", error);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-600 dark:bg-[#0e0e1a] dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          {/* Grid Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 text-sm mb-16">
            <FooterColumn {...platformColumn} />
            <FooterColumn {...marketsColumn} />
            <FooterColumn {...companyColumn} />
            <FooterColumn {...resourcesColumn} />
            <FooterColumn {...legalComplianceColumn} />
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-5 text-base">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-500">Email: </span>
                  <a
                    href="mailto:info@evermount.co"
                    className="hover:text-[#00a76f] transition-colors"
                  >
                    info@evermount.co
                  </a>
                </li>
                <li>
                  <span className="text-gray-500">Phone: </span>
                  <a
                    href="tel:+254758578816"
                    className="hover:text-[#00a76f] transition-colors"
                  >
                    +254 758 578 816
                  </a>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Messenger
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-16 text-center">
            <h4 className="text-xl text-gray-900 dark:text-white font-semibold mb-3">
              Subscribe to our Newsletter
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Get updates on Evermount technology, research, and African
              market infrastructure.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg w-full sm:flex-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00a76f] focus:border-transparent transition"
                required
              />
              <button
                type="submit"
                className="bg-[#00a76f] hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition w-full sm:w-auto"
              >
                {submitted ? "✓ Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* App Store Badges & Social Icons Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            {/* App Store Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-gray-400 mb-2 sm:mb-0">
                Download our app:
              </p>
              <div className="flex flex-row gap-3">
                {/* Apple App Store Badge */}
                <a
                  href="https://apps.apple.com/app/evermount-capital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Download on the App Store"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="flex-shrink-0"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px]">Download on the</span>
                    <span className="text-sm font-semibold -mt-0.5">
                      App Store
                    </span>
                  </div>
                </a>

                {/* Google Play Store Badge */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.evermount.capital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Get it on Google Play"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z"
                      fill="#00D9FF"
                    />
                    <path
                      d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z"
                      fill="#00FF88"
                    />
                    <path
                      d="M16.81 8.88L14.54 11.15L6.05 2.66L16.81 8.88Z"
                      fill="#FFD000"
                    />
                    <path
                      d="M20.16 10.81L17.19 12L20.16 13.19C20.66 13.44 21 13.96 21 14.55V9.45C21 8.86 20.66 8.34 20.16 8.09L20.16 10.81Z"
                      fill="#FF3838"
                    />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px]">GET IT ON</span>
                    <span className="text-sm font-semibold -mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 text-[#00a76f] text-xl">
              {[
                {
                  href: "https://x.com",
                  icon: <FaXTwitter />,
                  label: "X Twitter",
                },
                {
                  href: "https://linkedin.com/company/evermount-capital",
                  icon: <FaLinkedinIn />,
                  label: "LinkedIn",
                },
                {
                  href: "https://tiktok.com/@evermount",
                  icon: <FaTiktok />,
                  label: "TikTok",
                },
                {
                  href: "https://discord.gg/evermount",
                  icon: <FaDiscord />,
                  label: "Discord",
                },
              ].map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 dark:border-gray-800 pt-6 pb-6">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Evermount Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
