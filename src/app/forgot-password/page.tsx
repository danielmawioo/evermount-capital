"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://api.evermount.co/auth/send-reset-password", {
        email,
      });

      setMessage("OTP sent to your email. Please check your inbox.");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Logo Header */}
      <div className="absolute top-6 left-6 md:left-10 z-50">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/icons/icon1.png"
            alt="Evermount Logo"
            width={36}
            height={36}
          />
          <span className="text-xl font-bold text-[#00a76f]">Evermount</span>
        </Link>
      </div>

      {/* === Left Side === */}
      <div className="bg-[#f2fdf9] flex flex-col justify-center items-center px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage the job</h1>
        <p className="text-gray-600 text-sm mt-2 max-w-xs">
          More effectively with optimized workflows.
        </p>
        <div className="mt-10">
          <Image
            src="/images/login.jpg"
            alt="Forgot Password Illustration"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>
      </div>

      {/* === Right Side === */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot your password?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter the email associated with your account and we'll send you an
            OTP to reset your password.
          </p>

          {/* === Form === */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#00a76f] focus:border-transparent text-gray-800"
              />
            </div>

            {/* Show Messages */}
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>

          <div className="text-sm text-center mt-6">
            <Link
              href="/login"
              className="text-[#00a76f] hover:underline flex items-center justify-center gap-1"
            >
              ← Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
