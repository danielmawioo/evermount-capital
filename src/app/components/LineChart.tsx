"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Title,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Title
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Portfolio Value",
      data: [12000, 15000, 14000, 18000, 20000, 22000],
      borderColor: "#00a76f",
      backgroundColor: "rgba(0, 167, 111, 0.1)",
      pointBackgroundColor: "#00a76f",
      pointBorderColor: "#fff",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
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
      padding: 12,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: { color: "#94a3b8", font: { size: 12 } },
      grid: {
        color: "#33415533",
        borderDash: [4, 4],
      },
    },
    y: {
      ticks: {
        color: "#94a3b8",
        callback: (value: number) => `$${value / 1000}k`,
        font: { size: 12 },
      },
      grid: {
        color: "#33415533",
        borderDash: [4, 4],
      },
    },
  },
};

export default function LineChart() {
  return (
    <div className="h-[300px] md:h-[360px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}
