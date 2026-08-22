import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

export function useSettings() {
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
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
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

  return {
    loading,
    profileLoading,
    prefsLoading,
    investmentPrefs,
    setInvestmentPrefs,
    formData,
    setFormData,
    passwordData,
    setPasswordData,
    loadProfile,
    loadInvestmentPrefs,
    handleProfileUpdate,
    handlePasswordChange,
    handleProfilePictureUpload,
    handleInvestmentPrefsSave,
  };
}
