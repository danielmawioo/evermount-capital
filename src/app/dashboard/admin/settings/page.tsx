"use client";

import TranslateTree from "@/app/components/TranslateTree";
import { CheckCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import PlatformSettings from "./PlatformSettings";
import IntegrationsPanel from "./IntegrationsPanel";

export default function AdminSettingsPage() {
  const {
    loading,
    saving,
    settings,
    handleSave,
    handleToggle,
    handleNumberChange,
  } = useAdminSettings();

  return (
    <TranslateTree>
      <div className="space-y-6">
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
          <div className="lg:col-span-2 space-y-6">
            <NotificationSettings
              settings={settings.notifications}
              onToggle={(key) => handleToggle("notifications", key)}
            />
            <SecuritySettings
              settings={settings.security}
              onToggle={(key) => handleToggle("security", key)}
              onSessionTimeoutChange={(value) =>
                handleNumberChange("security", "sessionTimeout", value)
              }
            />
            <PlatformSettings
              settings={settings.platform}
              onToggle={(key) => handleToggle("platform", key)}
            />
          </div>

          <div className="space-y-6">
            <IntegrationsPanel
              settings={settings.integrations}
              onToggle={(key) => handleToggle("integrations", key)}
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || saving}
              className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircleIcon className="w-5 h-5" />
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </TranslateTree>
  );
}
