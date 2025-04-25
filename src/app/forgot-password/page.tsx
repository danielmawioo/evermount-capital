"use client";

import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
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
            Enter the email associated with your account and well send you a
            link to reset your password.
          </p>

          {/* === Form === */}
          <form className="space-y-6">
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
                placeholder="example@gmail.com"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#00a76f] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition"
            >
              Send request
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
