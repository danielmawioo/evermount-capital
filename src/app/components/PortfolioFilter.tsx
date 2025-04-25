"use client";
import { useState } from "react";

const options = ["All", "Equities", "Crypto", "Real Estate", "Commodities"];

export default function PortfolioFilter({
  onFilter,
}: {
  onFilter?: (val: string) => void;
}) {
  const [selected, setSelected] = useState("All");

  return (
    <select
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        onFilter?.(e.target.value);
      }}
      className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00a76f] transition"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
