"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function PageHero({
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  const { tx } = useLocale();
  return (
    <section className="text-center max-w-4xl mx-auto px-6 pt-8 pb-12">
      {eyebrow ? (
        <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#00a76f] uppercase mb-4">
          {tx(eyebrow)}
        </p>
      ) : null}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
        {tx(title)}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        {tx(body)}
      </p>
      {(primaryHref || secondaryHref) && (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {primaryHref && primaryLabel ? (
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#00a76f] text-white font-semibold hover:bg-emerald-700 transition"
            >
              {tx(primaryLabel)}
            </Link>
          ) : null}
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[#00a76f] text-[#00a76f] font-semibold hover:bg-[#00a76f]/10 transition"
            >
              {tx(secondaryLabel)}
            </Link>
          ) : null}
        </div>
      )}
    </section>
  );
}
