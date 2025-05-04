"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Strong";
    } else if (password.length >= 8) {
      return "Moderate";
    } else {
      return "Weak";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!acceptTerms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    if (getPasswordStrength(password) === "Weak") {
      setError("Password is too weak. Make it stronger.");
      return;
    }

    try {
      setLoading(true);
      const fullName = `${firstName} ${lastName}`;

      await axios.post("https://api.evermount.co/auth/register", {
        email,
        password,
        fullName,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white relative">
      {/* Logo */}
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

      {/* Left Panel */}
      <div className="hidden md:flex bg-[#f2fdf9] flex-col justify-center items-center px-6 py-12 text-center">
        <div className="max-w-xs">
          <h1 className="text-3xl font-bold text-gray-900">Manage the job</h1>
          <p className="text-gray-600 text-sm mt-2">
            More effectively with optimized workflows.
          </p>
          <div className="mt-10 w-72 h-72 relative">
            <Image
              src="/images/login.jpg"
              alt="Register Illustration"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Get started absolutely free
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00a76f] font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* Success */}
            {success && (
              <p className="text-green-600 font-medium text-sm">{success}</p>
            )}
            {/* Error */}
            {error && (
              <p className="text-red-600 font-medium text-sm">{error}</p>
            )}

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900"
                />
              </div>
            </div>

            {/* Email */}
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
                placeholder="you@example.com"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full mt-2 px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900"
              />
              <div
                className="absolute top-[43px] right-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>

              {/* Password Strength */}
              {password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        getPasswordStrength(password) === "Strong"
                          ? "bg-green-500 w-full"
                          : getPasswordStrength(password) === "Moderate"
                          ? "bg-yellow-400 w-2/3"
                          : "bg-red-400 w-1/3"
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Password must be strong. Include uppercase, number, special
                    character.
                  </p>
                </div>
              )}
            </div>

            {/* Accept Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="w-4 h-4 mt-1 text-[#00a76f] border-gray-300 rounded"
              />
              <label htmlFor="terms">
                I accept the{" "}
                <Link
                  href="/terms"
                  className="text-[#00a76f] underline hover:no-underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Google", icon: "/icons/google.png" },
              { label: "GitHub", icon: "/icons/github.png" },
              { label: "X", icon: "/icons/twitter.png" },
              { label: "Apple", icon: "/icons/apple.png" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center justify-center gap-1 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition shadow-sm"
              >
                <Image src={icon} alt={label} width={18} height={18} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
