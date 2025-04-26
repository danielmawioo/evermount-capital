"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title
);

// Data
const data = {
  labels: ["Stocks", "Crypto", "Bonds", "Real Estate"],
  datasets: [
    {
      label: "Growth",
      data: [10, 30, 15, 20],
      backgroundColor: [
        "rgba(0, 167, 111, 0.9)",
        "rgba(0, 167, 111, 0.7)",
        "rgba(0, 167, 111, 0.5)",
        "rgba(0, 167, 111, 0.3)",
      ],
      borderRadius: 6,
      barThickness: 35,
    },
  ],
};

// Options (Typed Correctly)
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1e293b",
      titleColor: "#fff",
      bodyColor: "#d1d5db",
      borderColor: "#00a76f",
      borderWidth: 1,
      cornerRadius: 6,
      padding: 10,
    },
  },
  scales: {
    x: {
      ticks: { color: "#94a3b8", font: { size: 12 } },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#94a3b8",
        font: { size: 12 },
        callback: function (value) {
          return `${value}%`;
        },
      },
      grid: {
        color: "#33415533",
        borderDash: [4, 4],
      },
    },
  },
};

export default function BarChart() {
  return (
    <div className="h-[300px] md:h-[360px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
}
