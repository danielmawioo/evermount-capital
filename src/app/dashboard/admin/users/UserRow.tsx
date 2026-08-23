import { TrashIcon } from "@heroicons/react/24/outline";
import type { ApiUser } from "@/hooks/useAdminUsers";
import StatusBadge from "./StatusBadge";

interface UserRowProps {
  user: ApiUser;
  onEdit: (user: ApiUser) => void;
  onAssign: (user: ApiUser) => void;
  onCredit: (user: ApiUser) => void;
  onSuspend: (userId: string, action: "suspend" | "activate") => void;
  onDelete: (userId: string) => void;
}

export default function UserRow({
  user,
  onEdit,
  onAssign,
  onCredit,
  onSuspend,
  onDelete,
}: UserRowProps) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900 dark:text-white">
          {user.fullName}
        </div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {user.role}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {user.kycStatus || "—"}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
        ${(user.totalDeposits || 0).toLocaleString()}
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          >
            Edit
          </button>
          {user.role === "INVESTOR" && (
            <>
              <button
                onClick={() => onAssign(user)}
                className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                Assign
              </button>
              <button
                onClick={() => onCredit(user)}
                className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
              >
                Credit
              </button>
            </>
          )}
          {user.status === "active" ? (
            <button
              onClick={() => onSuspend(user.id, "suspend")}
              className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
            >
              Suspend
            </button>
          ) : (
            <button
              onClick={() => onSuspend(user.id, "activate")}
              className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              Activate
            </button>
          )}
          <button
            onClick={() => onDelete(user.id)}
            className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
}
