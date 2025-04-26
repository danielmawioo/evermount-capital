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

      await axios.post("https://evermount-backend.onrender.com/auth/register", {
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
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#0b0b12] text-gray-900 dark:text-white">
      {/* Logo */}
      <div className="absolute top-6 left-6 md:left-10 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/icon1.png"
            alt="Evermount Logo"
            width={36}
            height={36}
          />
          <span className="text-xl font-bold text-[#00a76f]">Evermount</span>
        </Link>
      </div>

      {/* Left Illustration Panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#f2fdf9] dark:bg-gray-900 px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">Manage the job</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-10 text-center max-w-xs">
          More effectively with optimized workflows.
        </p>
        <Image
          src="/images/login.jpg"
          alt="Register Illustration"
          width={280}
          height={280}
          className="object-contain"
        />
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold">Get started absolutely free</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00a76f] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {success && (
              <p className="text-green-600 dark:text-green-400 font-semibold text-sm">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-600 dark:text-red-400 font-semibold text-sm">
                {error}
              </p>
            )}

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                  className="input-style"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                  className="input-style"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-style"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-style pr-10"
              />
              <div
                className="absolute top-[43px] right-3 cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>

              {/* Password strength */}
              {password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Must be 8+ characters, include uppercase, number, and
                    special character.
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="checkbox-style"
              />
              <label className="ml-2 text-sm">
                I accept the{" "}
                <Link
                  href="/terms"
                  className="text-[#00a76f] underline hover:no-underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit button */}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-8">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Google", icon: "/icons/google.png" },
              { label: "GitHub", icon: "/icons/github.png" },
              { label: "X", icon: "/icons/twitter.png" },
              { label: "Apple", icon: "/icons/apple.png" },
            ].map(({ label, icon }) => (
              <button key={label} type="button" className="btn-social">
                <Image src={icon} alt={label} width={20} height={20} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
