"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import AuthLeftPanel from "../components/AuthLeftPanel";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Accept only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (
      !email ||
      otp.some((digit) => digit === "") ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const otpCode = otp.join(""); // join the OTP digits into a full code

      await axios.post("https://api.evermount.co/auth/reset-password", {
        email,
        otp: otpCode,
        newPassword,
      });

      setSuccessMessage("Password updated successfully! Please log in.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
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
      {/* Left Panel */}
      <AuthLeftPanel title="Manage the job" />

      {/* Right Form Side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-20">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reset your password
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter the 6-digit code sent to your email and your new password.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* OTP Inputs */}
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                />
              ))}
            </div>

            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* Confirm New Password */}
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-600 text-sm font-semibold">
                {successMessage}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          {/* Resend */}
          <div className="text-sm text-center mt-6 text-gray-500">
            <p>
              Don’t have a code?{" "}
              <button
                type="button"
                onClick={() => alert("Feature coming soon.")}
                className="text-[#00a76f] font-medium hover:underline"
              >
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
