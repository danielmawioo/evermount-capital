"use client";

import { useEffect, useState } from "react";
import type { GexPublicSnapshot } from "@/lib/gex-public";
import { GEX_FIXTURE } from "@/lib/gex-public";

function formatLevel(value: number | null): string {
  if (value === null) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function GexLevelsPanel() {
  const [snapshot, setSnapshot] = useState<GexPublicSnapshot>(GEX_FIXTURE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/research/gex")
      .then((response) => response.json())
      .then((data: GexPublicSnapshot) => {
        if (!cancelled) setSnapshot(data);
      })
      .catch(() => {
        if (!cancelled) setSnapshot(GEX_FIXTURE);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = [
    { label: "XAU spot", value: snapshot.spot },
    { label: "COMEX GC", value: snapshot.futures },
    { label: "Basis", value: snapshot.basis },
    { label: "Gamma flip", value: snapshot.gammaFlip },
    { label: "Max pain", value: snapshot.maxPain },
  ];

  return (
    <section
      id="gold-gex"
      className="scroll-mt-28 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-[#00a76f] text-xs font-semibold uppercase tracking-[0.2em] mb-1">
            Gold market structure
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            GEX levels
          </h2>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
          {snapshot.live ? "Live engine" : "Fixture snapshot"}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl bg-white dark:bg-gray-900 px-4 py-3 border border-gray-100 dark:border-gray-700"
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {row.label}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
              {formatLevel(row.value)}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {snapshot.note}
        {snapshot.regime && snapshot.regime !== "illustrative"
          ? ` Dealer regime: ${snapshot.regime}.`
          : ""}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
        Analytics only. Not an offer to trade, not a signal, and not investment
        advice.
        {loaded ? "" : " Loading…"}
      </p>
    </section>
  );
}
