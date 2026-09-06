"use client";

import { useLocale } from "@/context/LocaleContext";

interface BulletSectionProps {
  id?: string;
  title: string;
  body?: string;
  items: string[];
}

export default function BulletSection({
  id,
  title,
  body,
  items,
}: BulletSectionProps) {
  const { tx } = useLocale();
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {tx(title)}
      </h2>
      {body ? (
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {tx(body)}
        </p>
      ) : null}
      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item}>{tx(item)}</li>
        ))}
      </ul>
    </section>
  );
}
