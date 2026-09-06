"use client";

import TranslateTree from "@/app/components/TranslateTree";
import Link from "next/link";
import Image from "next/image";

export default function EmailVerificationPage() {
  return (
    <TranslateTree>
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Panel */}
      <div className="bg-[#f9fafb] flex flex-col justify-center items-center p-10">
        <h1 className="text-2xl font-bold text-gray-900">Manage the job</h1>
        <p className="text-gray-500 text-sm mt-2">
          More effectively with optimized workflows.
        </p>
        <div className="mt-10">
          <Image
            src="/images/login.jpg"
            alt="Email Verification Illustration"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please check your email!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We’ve emailed a 6-digit confirmation code. Enter the code below to
            verify your email.
          </p>

          {/* Code Input Form */}
          <form className="space-y-6">
            <div className="flex gap-3 justify-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-md font-semibold transition"
            >
              Verify
            </button>
          </form>

          {/* Actions */}
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
    </TranslateTree>
  );
}
