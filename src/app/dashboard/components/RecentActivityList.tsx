"use client";

import TranslateTree from "@/app/components/TranslateTree";

interface ActivityItem {
  id: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface RecentActivityListProps {
  items: ActivityItem[];
}

function formatType(type: string) {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default function RecentActivityList({ items }: RecentActivityListProps) {
  if (items.length === 0) {
    return (
      <TranslateTree>
        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
          No recent activity.
        </p>
      </TranslateTree>
    );
  }

  return (
    <TranslateTree>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-3 text-sm"
          >
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {formatType(item.type)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {timeAgo(item.createdAt)} · {item.status}
              </p>
            </div>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
              ${Number(item.amount).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </TranslateTree>
  );
}
