"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Equity", "Fixed Income", "Crypto", "Cash"],
  datasets: [
    {
      data: [40, 25, 20, 15],
      backgroundColor: ["#00a76f", "#34d399", "#065f46", "#bbf7d0"],
    },
  ],
};

export default function PieChart() {
  return <Pie data={data} />;
}
