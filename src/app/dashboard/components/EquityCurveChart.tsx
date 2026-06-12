"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  ChartOptions,
} from "chart.js";
import { useTheme } from "@/context/ThemeContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

interface EquityPoint {
  date: string;
  equity: number;
}

interface EquityCurveChartProps {
  data: EquityPoint[];
  currency?: string;
}

export default function EquityCurveChart({
  data,
  currency = "USD",
}: EquityCurveChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const labels = data.map((p) => p.date);
  const values = data.map((p) => p.equity);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Equity",
        data: values,
        borderColor: "#00a76f",
        backgroundColor: "rgba(0, 167, 111, 0.08)",
        pointRadius: data.length > 30 ? 0 : 3,
        pointBackgroundColor: "#00a76f",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? "#1e293b" : "#ffffff",
          titleColor: isDark ? "#f1f5f9" : "#1e293b",
          bodyColor: isDark ? "#f1f5f9" : "#1e293b",
          borderColor: isDark ? "#334155" : "#e2e8f0",
          borderWidth: 1,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y ?? 0;
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
              }).format(v);
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: isDark ? "#94a3b8" : "#64748b",
            maxTicksLimit: 8,
            font: { size: 11 },
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: isDark ? "#94a3b8" : "#64748b",
            font: { size: 11 },
            callback: (value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                notation: "compact",
              }).format(value as number),
          },
          grid: {
            color: isDark
              ? "rgba(148, 163, 184, 0.15)"
              : "rgba(100, 116, 139, 0.15)",
          },
        },
      },
    }),
    [currency, isDark]
  );

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No performance history yet. Invest to start tracking your equity curve.
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-72">
      <Line data={chartData} options={options} />
    </div>
  );
}
