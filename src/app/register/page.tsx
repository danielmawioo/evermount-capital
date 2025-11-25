"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "@/lib/api-client";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
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
    if (!acceptTerms) {
      toast.error("Please accept the Terms and Conditions.");
      return;
    }

    if (getPasswordStrength(password) === "Weak") {
      toast.error("Password is too weak. Make it stronger.");
      return;
    }

    try {
      setLoading(true);
      const fullName = `${firstName} ${lastName}`;

      await api.auth.register({
        email,
        password,
        fullName,
      });

      toast.success("Account created! Please check your email to verify.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      const message = err?.response?.data?.error?.message || err?.response?.data?.message || "Registration failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = useCallback(async (provider: string) => {
    setLoading(true);
    try {
      if (provider === "github") {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}/auth/github/callback&scope=user:email`;
        return;
      }
      toast.info(`${provider} sign up integration in progress`);
    } catch (err: any) {
      toast.error(`${provider} sign up failed`);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 relative">
      <Toaster position="top-center" />
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
      <div className="hidden md:flex bg-[#f2fdf9] dark:bg-gray-800 flex-col justify-center items-center px-6 py-12 text-center">
        <div className="max-w-xs">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage the job</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
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
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20 bg-white dark:bg-gray-900">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Get started absolutely free
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900 dark:text-white bg-white dark:bg-gray-800"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="w-full mt-2 px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition text-gray-900 dark:text-white bg-white dark:bg-gray-800"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="flex items-center gap-2 my-6">
            <hr className="flex-grow border-gray-200 dark:border-gray-700" />
            <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
            <hr className="flex-grow border-gray-200 dark:border-gray-700" />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Google", icon: "/icons/google.png", displayText: "G Google" },
              { label: "GitHub", icon: "/icons/github.png", displayText: "GitHub" },
              { label: "X", icon: "/icons/twitter.png", displayText: "X" },
              { label: "Apple", icon: "/icons/apple.png", displayText: "Apple" },
            ].map(({ label, icon, displayText }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  const provider = label.toLowerCase();
                  handleSocialSignup(provider);
                }}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-1.5 border border-gray-300 dark:border-gray-700 px-3 py-3 rounded-md text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm bg-white dark:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image 
                  src={icon} 
                  alt={label} 
                  width={20} 
                  height={20}
                  className="object-contain"
                />
                <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300">{displayText}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
