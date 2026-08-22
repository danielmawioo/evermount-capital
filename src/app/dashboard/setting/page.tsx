"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import FileUpload from "@/components/FileUpload";

const LOCK_IN_OPTIONS = [
  { label: "6 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "24 months", value: 24 },
];

const RISK_OPTIONS = [
  { label: "Conservative", value: "LOW", description: "Lower volatility strategies" },
  { label: "Balanced", value: "MODERATE", description: "Moderate risk and return" },
  { label: "Growth", value: "HIGH", description: "Higher return potential" },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [prefsLoading, setPrefsLoading] = useState(true);
  const [investmentPrefs, setInvestmentPrefs] = useState({
    lockInMonths: 6,
    riskTolerance: "MODERATE",
    reinvestProfits: true,
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
    loadInvestmentPrefs();
  }, []);

  const loadInvestmentPrefs = async () => {
    try {
      const { data } = await api.investments.getPreferences();
      setInvestmentPrefs({
        lockInMonths: data.lockInMonths ?? 6,
        riskTolerance: data.riskTolerance ?? "MODERATE",
        reinvestProfits: data.reinvestProfits ?? true,
      });
    } catch (error) {
      logger.error("Failed to load investment preferences", error);
      toast.error("Failed to load investment preferences");
    } finally {
      setPrefsLoading(false);
    }
  };

  const handleInvestmentPrefsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.investments.updatePreferences(investmentPrefs);
      toast.success("Investment preferences saved");
    } catch (error: unknown) {
      logger.error("Failed to save investment preferences", error);
      toast.error(getApiErrorMessage(error, "Failed to save preferences"));
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const { data } = await api.users.getProfile();
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phoneNumber || "",
        dateOfBirth: data.dateOfBirth
          ? String(data.dateOfBirth).slice(0, 10)
          : "",
        address: data.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    } catch (error) {
      logger.error("Failed to load profile", error);
      toast.error("Failed to load profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.users.updateProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phone || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        address: formData.address,
      });
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      logger.error("Failed to update profile", error);
      toast.error(getApiErrorMessage(error, "Failed to update profile"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await api.users.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: unknown) {
      logger.error("Failed to change password", error);
      toast.error(getApiErrorMessage(error, "Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = async (files: File[]) => {
    if (files.length === 0) return;
    try {
      await api.users.uploadProfilePicture(files[0]);
      toast.success("Profile picture updated successfully");
    } catch (error: unknown) {
      logger.error("Failed to upload profile picture", error);
      toast.error(getApiErrorMessage(error, "Failed to upload picture"));
    }
  };

  if (profileLoading || prefsLoading) {
    return (
      <div className="max-w-xl mx-auto space-y-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Account Settings
      </h1>

      {/* Profile Picture Upload */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Profile Picture
        </h2>
        <FileUpload
          accept="image/*"
          maxSize={5}
          multiple={false}
          onUpload={handleProfilePictureUpload}
          label="Upload Profile Picture"
          description="JPG, PNG or GIF (max 5MB)"
        />
      </div>

      {/* Profile Information */}
      <form onSubmit={handleProfileUpdate} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Profile Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">Email cannot be changed here</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a76f] text-white py-2 px-6 rounded-md font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Investment Preferences */}
      <form
        onSubmit={handleInvestmentPrefsSave}
        className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Investment Preferences
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Used when you click Trade. Your capital stays invested for the period you choose.
            Early withdrawal may not be available.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default lock-in period
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LOCK_IN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setInvestmentPrefs({ ...investmentPrefs, lockInMonths: opt.value })
                }
                className={`py-2 rounded-lg text-sm font-medium border transition ${
                  investmentPrefs.lockInMonths === opt.value
                    ? "bg-[#00a76f] text-white border-[#00a76f]"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk comfort
          </label>
          <div className="space-y-2">
            {RISK_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  investmentPrefs.riskTolerance === opt.value
                    ? "border-[#00a76f] bg-[#00a76f]/5"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="riskTolerance"
                  value={opt.value}
                  checked={investmentPrefs.riskTolerance === opt.value}
                  onChange={() =>
                    setInvestmentPrefs({
                      ...investmentPrefs,
                      riskTolerance: opt.value,
                    })
                  }
                  className="mt-1 text-[#00a76f] focus:ring-[#00a76f]"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {opt.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={investmentPrefs.reinvestProfits}
            onChange={(e) =>
              setInvestmentPrefs({
                ...investmentPrefs,
                reinvestProfits: e.target.checked,
              })
            }
            className="rounded border-gray-300 text-[#00a76f] focus:ring-[#00a76f]"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Reinvest profits automatically
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00a76f] text-white py-2 px-6 rounded-md font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Investment Preferences"}
        </button>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePasswordChange} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Change Password
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00a76f] text-white py-2 px-6 rounded-md font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
