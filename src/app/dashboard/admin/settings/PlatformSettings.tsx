"use client";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import type { SettingsState } from "@/hooks/useAdminSettings";
import SettingsToggle from "./SettingsToggle";

type Props = {
  settings: SettingsState["platform"];
  onToggle: (key: keyof SettingsState["platform"]) => void;
};

export default function PlatformSettings({ settings, onToggle }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <GlobeAltIcon className="w-6 h-6 text-[#00a76f]" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Platform Settings
        </h2>
      </div>
      <div className="space-y-4">
        {(
          [
            [
              "maintenanceMode",
              "Maintenance Mode",
              "Temporarily disable platform access",
            ],
            [
              "registrationEnabled",
              "User Registration",
              "Allow new user registrations",
            ],
            ["apiEnabled", "API Access", "Enable API endpoints"],
          ] as const
        ).map(([key, title, hint]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
            </div>
            <SettingsToggle
              enabled={settings[key]}
              onToggle={() => onToggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
