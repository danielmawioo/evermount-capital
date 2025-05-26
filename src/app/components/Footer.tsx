"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaDiscord,
  FaXTwitter,
} from "react-icons/fa6";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await axios.post("/waitlist", { email });
      setSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter submission error:", error);
    }
  };

  return (
    <footer className="bg-[#0e0e1a] text-gray-400 pt-16 pb-6 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Grid Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-sm mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">Markets</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Evermount CFDs</Link>
              </li>
              <li>
                <Link href="#">Future Markets</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Education</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/investor-tour">Investor Tour</Link>
              </li>
              <li>
                <Link href="#">AI Trading Guide</Link>
              </li>
              <li>
                <Link href="#">Growth Dashboard</Link>
              </li>
              <li>
                <Link href="#">Insights Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Partnerships</Link>
              </li>
              <li>
                <Link href="#">Investor Events</Link>
              </li>
              <li>
                <Link href="#">Risk Disclosure</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Privacy & Policy</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link href="/aml-policy">AML Statement</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@evermount.co"
                  className="hover:text-blue-400 transition"
                >
                  info@evermount.co
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+254758578816"
                  className="hover:text-blue-400 transition"
                >
                  +254 758 578 816
                </a>
              </li>
              <li>
                <Link href="#">Live Chat</Link>
              </li>
              <li>
                <Link href="#">Messenger</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Local Communities</Link>
              </li>
              <li>
                <Link href="#">Join Discord</Link>
              </li>
              <li>
                <Link href="#">Join X</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-10 text-center">
          <h4 className="text-lg text-white font-semibold mb-2">
            Subscribe to our Newsletter
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            Get updates on new products, investor tools, and market strategies.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md w-full sm:w-64 text-sm text-white placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
              required
            />
            <button
              type="submit"
              className="bg-[#00a76f] hover:bg-emerald-600 text-white px-6 py-2 rounded-md font-medium transition"
            >
              {submitted ? "✓ Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-6 text-[#00a76f] text-lg">
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

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} Evermount Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
