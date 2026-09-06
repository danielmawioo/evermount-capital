"use client";

import { useLocale } from "@/context/LocaleContext";

export interface CapabilityItem {
  title: string;
  description: string;
  badge?: string;
  id?: string;
}

interface CapabilityGridProps {
  items: CapabilityItem[];
  columns?: string;
}

export default function CapabilityGrid({
  items,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: CapabilityGridProps) {
  const { tx } = useLocale();
  return (
    <div className={`grid ${columns} gap-6`}>
      {items.map((item) => (
        <article
          key={item.id ?? item.title}
          id={item.id}
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 scroll-mt-28"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-xl font-semibold text-[#00a76f]">
              {tx(item.title)}
            </h3>
            {item.badge ? (
              <span className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-md bg-[#00a76f]/10 text-[#00a76f]">
                {tx(item.badge)}
              </span>
            ) : null}
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tx(item.description)}
          </p>
        </article>
      ))}
    </div>
  );
}
