"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const data = {
  labels: ["Stocks", "Crypto", "Bonds", "Real Estate"],
  datasets: [
    {
      label: "Growth",
      data: [10, 30, 15, 20],
      backgroundColor: "#00a76f",
    },
  ],
};

export default function BarChart() {
  return (
    <Bar
      data={data}
      options={{ responsive: true, plugins: { legend: { display: false } } }}
    />
  );
}
