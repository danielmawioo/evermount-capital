/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/icons/icon1.png"
            alt="Evermount Capital Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-2xl font-extrabold text-[#00a76f] tracking-tight">
            <i>Evermount</i>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-[16px] font-medium text-gray-700 items-center">
          {/* Platform Dropdown */}
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

          {/* Pricing */}
          <Link href="/pricing" className="hover:text-black">
            Pricing
          </Link>

          {/* About Dropdown */}
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
                        Discover the journey behind Evermount Capital.
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
                        Join a team shaping the future of hedge fund investing.
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
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

        {/* Login Button (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <button className="bg-[#00a76f] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-emerald-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col p-6 space-y-4 text-gray-700 font-medium">
            <Link href="/portfolio-insights" onClick={() => setMenuOpen(false)}>
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
              <button className="mt-4 bg-[#00a76f] text-white px-5 py-2 rounded-md font-semibold hover:bg-emerald-700 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
