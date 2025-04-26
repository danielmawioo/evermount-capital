"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://evermount-backend.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
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
      <div className="bg-[#f2fdf9] flex flex-col justify-center items-center px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Hi, Welcome back</h1>
        <p className="text-gray-600 text-sm mt-2 max-w-xs">
          More effectively with optimized workflows.
        </p>
        <div className="mt-10">
          <Image
            src="/images/login.jpg"
            alt="Welcome Illustration"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-center px-8 sm:px-12 md:px-20 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#00a76f] font-medium hover:underline"
            >
              Get started
            </Link>
          </p>

          {/* Login Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* Success */}
            {success && (
              <p className="text-green-600 font-medium text-sm mb-2">
                {success}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-600 font-medium text-sm mb-2">{error}</p>
            )}

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

              {/* Remember me + forgot password */}
              <div className="flex justify-between items-center text-sm mt-2">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="form-checkbox text-[#00a76f]"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 rounded-md font-semibold transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Socials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Google", icon: "/icons/google.png" },
              { label: "GitHub", icon: "/icons/github.png" },
              { label: "X", icon: "/icons/twitter.png" },
              { label: "Apple", icon: "/icons/apple.png" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition shadow-sm"
              >
                <Image src={icon} alt={label} width={18} height={18} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
