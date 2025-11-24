"use client";

import { useState } from "react";
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

type SettingsState = {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    ipWhitelist: boolean;
  };
  platform: {
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    apiEnabled: boolean;
  };
  integrations: {
    stripe: boolean;
    intercom: boolean;
    analytics: boolean;
  };
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      ipWhitelist: false,
    },
    platform: {
      maintenanceMode: false,
      registrationEnabled: true,
      apiEnabled: true,
    },
    integrations: {
      stripe: true,
      intercom: true,
      analytics: true,
    },
  });

  const handleToggle = <K extends keyof SettingsState>(
    category: K,
    key: keyof SettingsState[K]
  ) => {
    setSettings((prev) => {
      const categorySettings = prev[category];
      const currentValue = (categorySettings as Record<string, any>)[key as string];
      if (typeof currentValue === 'boolean') {
        return {
          ...prev,
          [category]: {
            ...categorySettings,
            [key]: !currentValue,
          } as SettingsState[K],
        };
      }
      return prev;
    });
  };

  const handleNumberChange = <K extends keyof SettingsState>(
    category: K,
    key: keyof SettingsState[K],
    value: number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      } as SettingsState[K],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Cog6ToothIcon className="w-8 h-8 text-[#00a76f]" />
          Admin Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          Configure system settings, security, and platform preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BellIcon className="w-6 h-6 text-[#00a76f]" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notifications", "email" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications.email
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.email ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via SMS
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notifications", "sms" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications.sms
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.sms ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive browser push notifications
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("notifications", "push" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications.push
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.push ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheckIcon className="w-6 h-6 text-[#00a76f]" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Require 2FA for all admin accounts
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("security", "twoFactor" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.security.twoFactor
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.security.twoFactor ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Session Timeout (minutes)
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Auto-logout after inactivity
                  </p>
                </div>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    handleNumberChange(
                      "security",
                      "sessionTimeout" as const,
                      parseInt(e.target.value) || 30
                    )
                  }
                  className="w-20 px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
                  min="5"
                  max="120"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    IP Whitelist
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Restrict access to specific IP addresses
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("security", "ipWhitelist" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.security.ipWhitelist
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.security.ipWhitelist ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <GlobeAltIcon className="w-6 h-6 text-[#00a76f]" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Platform Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Maintenance Mode
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Temporarily disable platform access
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("platform", "maintenanceMode" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.platform.maintenanceMode
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.platform.maintenanceMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    User Registration
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow new user registrations
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("platform", "registrationEnabled" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.platform.registrationEnabled
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.platform.registrationEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    API Access
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable API endpoints
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("platform", "apiEnabled" as const)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.platform.apiEnabled
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.platform.apiEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Integrations */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ChartBarIcon className="w-6 h-6 text-[#00a76f]" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Integrations
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Stripe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Payment processing
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("integrations", "stripe")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.integrations.stripe
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.integrations.stripe ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Intercom</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer support
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("integrations", "intercom")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.integrations.intercom
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.integrations.intercom ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Usage tracking
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("integrations", "analytics")}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.integrations.analytics
                      ? "bg-[#00a76f]"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.integrations.analytics ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition shadow-sm hover:shadow-md flex items-center justify-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}

