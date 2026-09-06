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
  institutionsColumn,
  developersColumn,
  researchColumn,
  companyColumn,
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8 lg:gap-10 text-sm mb-16">
            <FooterColumn {...platformColumn} />
            <FooterColumn {...marketsColumn} />
            <FooterColumn {...institutionsColumn} />
            <FooterColumn {...developersColumn} />
            <FooterColumn {...researchColumn} />
            <FooterColumn {...companyColumn} />
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
              Get updates on Evermount technology, research, and market
              infrastructure.
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Evermount is a financial technology and infrastructure company.
              Availability of specific services depends on jurisdiction and
              applicable regulation.
            </p>
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
            © {new Date().getFullYear()} Evermount. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
