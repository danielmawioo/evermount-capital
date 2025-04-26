"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Data
const data = {
  labels: ["Equity", "Fixed Income", "Crypto", "Cash"],
  datasets: [
    {
      label: "Distribution",
      data: [40, 25, 20, 15],
      backgroundColor: [
        "rgba(0, 167, 111, 0.9)",
        "rgba(52, 211, 153, 0.9)",
        "rgba(6, 95, 70, 0.9)",
        "rgba(187, 247, 208, 0.9)",
      ],
      borderColor: "#111827", // Tailwind dark bg
      borderWidth: 2,
      hoverOffset: 12,
    },
  ],
};

// Options (Typed properly)
const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#9ca3af",
        font: {
          size: 14,
          weight: "500",
        },
        padding: 16,
        boxWidth: 18,
      },
    },
    tooltip: {
      backgroundColor: "#1f2937",
      titleColor: "#ffffff",
      bodyColor: "#d1d5db",
      borderColor: "#00a76f",
      borderWidth: 1,
      cornerRadius: 10,
      padding: 12,
      displayColors: false,
    },
  },
  layout: {
    padding: 10,
  },
};

export default function PieChart() {
  return (
    <div className="h-[280px] md:h-[320px] w-full">
      <Pie data={data} options={options} />
    </div>
  );
}
