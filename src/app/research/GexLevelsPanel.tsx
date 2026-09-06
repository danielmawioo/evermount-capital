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

function formatUsd(value: number | null): string {
  if (value === null) return "—";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatPct(value: number | null): string {
  if (value === null) return "—";
  return `${Math.round(value * 100)}%`;
}

function Metric({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 px-4 py-3 border border-gray-100 dark:border-gray-700">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
        {children}
      </p>
    </div>
  );
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

  const levelRows = [
    { label: "XAU spot", value: formatLevel(snapshot.spot) },
    { label: "COMEX GC", value: formatLevel(snapshot.futures) },
    { label: "Basis", value: formatLevel(snapshot.basis) },
    { label: "Gamma flip", value: formatLevel(snapshot.gammaFlip) },
    { label: "Max pain", value: formatLevel(snapshot.maxPain) },
  ];

  const analyticsRows = [
    { label: "Regime", value: snapshot.regime ?? "—" },
    { label: "Session", value: snapshot.session ?? "—" },
    { label: "Expected move", value: formatLevel(snapshot.expectedMove) },
    { label: "Confidence", value: formatPct(snapshot.confidence) },
    { label: "Calibration", value: snapshot.calibration ?? "—" },
  ];

  const riskRows = [
    { label: "Mode", value: snapshot.mode ?? "—" },
    { label: "Halt", value: snapshot.halt === null ? "—" : snapshot.halt ? "Yes" : "No" },
    { label: "Risk budget", value: formatUsd(snapshot.riskBudgetUsd) },
    { label: "Max daily loss", value: formatUsd(snapshot.maxDailyLossUsd) },
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {levelRows.map((row) => (
          <Metric key={row.label} label={row.label}>
            {row.value}
          </Metric>
        ))}
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
        Analytics overlay
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {analyticsRows.map((row) => (
          <Metric key={row.label} label={row.label}>
            {row.value}
          </Metric>
        ))}
      </div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
        Paper risk envelope
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {riskRows.map((row) => (
          <Metric key={row.label} label={row.label}>
            {row.value}
          </Metric>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {snapshot.note}
        {snapshot.haltReason ? ` Halt reason: ${snapshot.haltReason}.` : ""}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
        Analytics and paper risk only. Not an offer to trade, not a signal, and
        not investment advice. Order intent stays on the private decision API.
        {loaded ? "" : " Loading…"}
      </p>
    </section>
  );
}
