"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-accepted");
    const rejected = sessionStorage.getItem("cookie-rejected");

    if (!accepted && !rejected) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-accepted", "true");
    setVisible(false);
  };

  const handleReject = () => {
    sessionStorage.setItem("cookie-rejected", "true");
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-gradient-to-r from-white via-[#f0fdf8] to-white border-t border-gray-200 shadow-md px-4 sm:px-6 py-5 animate-fade-in backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base text-gray-800">
        <p className="text-center sm:text-left leading-relaxed">
          We use cookies to enhance your experience, analyze usage, and deliver
          personalized content.{" "}
          <Link
            href="/privacy"
            className="underline text-[#00a76f] hover:text-emerald-700"
          >
            Learn more
          </Link>
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={handleAccept}
            className="bg-[#00a76f] hover:bg-emerald-700 text-white px-5 py-2 rounded-md font-semibold text-sm shadow transition"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2 rounded-md font-semibold text-sm border border-red-300 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
