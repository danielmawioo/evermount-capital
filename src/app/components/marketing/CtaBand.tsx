"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

interface CtaBandProps {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function CtaBand({
  title,
  body,
  primaryHref = "/book-demo",
  primaryLabel = "Request Access",
  secondaryHref = "/platform",
  secondaryLabel = "Explore Platform",
}: CtaBandProps) {
  const { tx } = useLocale();
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center rounded-2xl bg-[#0d1b2a] dark:bg-gray-800 px-6 py-12 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{tx(title)}</h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {tx(body)}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#00a76f] hover:bg-emerald-700 font-semibold transition"
          >
            {tx(primaryLabel)}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#00a76f] text-[#00a76f] hover:bg-[#00a76f]/10 font-semibold transition"
          >
            {tx(secondaryLabel)}
          </Link>
        </div>
      </div>
    </section>
  );
}
