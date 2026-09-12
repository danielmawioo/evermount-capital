"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import type { SettingsState } from "@/hooks/useAdminSettings";
import SettingsToggle from "./SettingsToggle";

type Props = {
  settings: SettingsState["notifications"];
  onToggle: (key: keyof SettingsState["notifications"]) => void;
};

export default function NotificationSettings({ settings, onToggle }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <BellIcon className="w-6 h-6 text-[#00a76f]" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Notification Preferences
        </h2>
      </div>
      <div className="space-y-4">
        {(
          [
            ["email", "Email Notifications", "Receive updates via email"],
            ["sms", "SMS Notifications", "Receive updates via SMS"],
            [
              "push",
              "Push Notifications",
              "Receive browser push notifications",
            ],
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
