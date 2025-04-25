"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Portfolio",
      data: [12000, 15000, 14000, 18000, 20000, 22000],
      borderColor: "#00a76f",
      backgroundColor: "#00a76f22",
      tension: 0.4,
      fill: true,
    },
  ],
};

export default function LineChart() {
  return (
    <Line
      data={data}
      options={{ responsive: true, plugins: { legend: { display: false } } }}
    />
  );
}
