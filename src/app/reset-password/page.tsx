"use client";

import Link from "next/link";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Side Panel */}
      <AuthLeftPanel title="Manage the job" />

      {/* Right Form Side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Request sent successfully!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve sent a 6-digit confirmation code to your email. Enter it below
            to reset your password.
          </p>

          <form className="space-y-6">
            {/* Email */}
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* OTP Inputs */}
            <div className="flex justify-between gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                />
              ))}
            </div>

            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* Confirm New Password */}
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-md font-semibold transition"
            >
              Update password
            </button>
          </form>

          {/* Resend & Link Back */}
          <div className="text-sm text-center mt-6 text-gray-500">
            <p>
              Don’t have a code?{" "}
              <button className="text-[#00a76f] font-medium hover:underline">
                Resend
              </button>
            </p>
            <Link
              href="/login"
              className="mt-4 inline-block text-[#00a76f] hover:underline"
            >
              ← Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
