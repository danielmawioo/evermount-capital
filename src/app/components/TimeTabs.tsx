// components/TimeTabs.tsx
"use client";
import { useState } from "react";

const tabs = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function TimeTabs({
  onChange,
}: {
  onChange?: (val: string) => void;
}) {
  const [active, setActive] = useState("Monthly");

  const handleTab = (val: string) => {
    setActive(val);
    onChange?.(val);
  };

  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            active === tab
              ? "bg-[#00a76f] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
