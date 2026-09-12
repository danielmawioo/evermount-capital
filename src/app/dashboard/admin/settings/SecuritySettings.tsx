"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { SettingsState } from "@/hooks/useAdminSettings";
import SettingsToggle from "./SettingsToggle";

type Props = {
  settings: SettingsState["security"];
  onToggle: (key: "twoFactor" | "ipWhitelist") => void;
  onSessionTimeoutChange: (value: number) => void;
};

export default function SecuritySettings({
  settings,
  onToggle,
  onSessionTimeoutChange,
}: Props) {
  return (
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
          <SettingsToggle
            enabled={settings.twoFactor}
            onToggle={() => onToggle("twoFactor")}
          />
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
            value={settings.sessionTimeout}
            onChange={(e) =>
              onSessionTimeoutChange(parseInt(e.target.value, 10) || 30)
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
          <SettingsToggle
            enabled={settings.ipWhitelist}
            onToggle={() => onToggle("ipWhitelist")}
          />
        </div>
      </div>
    </div>
  );
}
