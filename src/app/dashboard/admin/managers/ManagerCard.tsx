"use client";

import {
  CheckCircleIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { Manager } from "@/hooks/useAdminManagers";

type Props = {
  manager: Manager;
  onManageClients: (manager: Manager) => void;
  onToggleStatus: (manager: Manager) => void;
};

export default function ManagerCard({
  manager,
  onManageClients,
  onToggleStatus,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
            {manager.fullName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {manager.fullName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Portfolio Manager
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Email:</span>
          <span className="text-gray-900 dark:text-white truncate">
            {manager.email}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {manager.clientCount} client
            {manager.clientCount === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Joined: {new Date(manager.joinDate).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onManageClients(manager)}
              className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#00a76f]/10 text-[#00a76f] hover:bg-[#00a76f]/20"
            >
              Clients
            </button>
            <button
              onClick={() => onToggleStatus(manager)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition ${
                manager.status === "active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              {manager.status === "active" ? (
                <CheckCircleIcon className="w-3 h-3" />
              ) : (
                <XCircleIcon className="w-3 h-3" />
              )}
              {manager.status.charAt(0).toUpperCase() + manager.status.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
