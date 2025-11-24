"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Script from "next/script";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setLoading(true);
      try {
        const { data } = await axios.post(
          "https://api.evermount.co/auth/login",
          {
            email,
            password,
          }
        );

        const token = data.token;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "Login failed. Please try again.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [email, password, rememberMe]
  );

  return (
    <>
      <Toaster position="top-center" />
      <Script
        id="ld-json-login"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Investor Portal Login",
            url: "https://evermount.co/login",
            description:
              "Login securely to the Evermount Capital investor portal and manage hedge fund investments.",
            isPartOf: {
              "@type": "WebSite",
              name: "Evermount Capital",
              url: "https://evermount.co",
            },
          }),
        }}
      />

      <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 relative">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hi, Welcome back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              More effectively with optimized workflows.
            </p>
            <div className="mt-10 w-72 h-72 relative">
              <Image
                src="/images/login.jpg"
                alt="Welcome Illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-20 py-12 bg-white dark:bg-gray-900">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#00a76f] font-medium hover:underline"
              >
                Get started
              </Link>
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
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

                <div className="flex justify-between items-center text-sm mt-2">
                  <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="form-checkbox text-[#00a76f] border-gray-300 dark:border-gray-700 rounded"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[#00a76f] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "bg-[#8cd9c0]" : "bg-[#00a76f] hover:bg-emerald-700"
                } text-white py-2 rounded-md font-semibold transition`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="flex items-center gap-2 my-6">
              <hr className="flex-grow border-gray-200" />
              <span className="text-sm text-gray-500">OR</span>
              <hr className="flex-grow border-gray-200" />
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
                    // Handle social login
                    toast(`${label} login coming soon!`, {
                      icon: 'ℹ️',
                    });
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 border border-gray-300 dark:border-gray-700 px-3 py-3 rounded-md text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm bg-white dark:bg-gray-900"
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
    </>
  );
}
