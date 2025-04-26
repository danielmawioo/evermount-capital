interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  growth?: string; // e.g., "+5.1%" or "Stable" or "-2.3%"
}

export default function StatCard({
  title,
  value,
  icon,
  growth,
}: StatCardProps) {
  // Auto-detect if it's positive or negative for coloring
  const isPositive = growth?.includes("+");
  const isNegative = growth?.includes("-");

  const growthColor = isPositive
    ? "text-green-500"
    : isNegative
    ? "text-red-500"
    : "text-gray-400";

  return (
    <div className="bg-white dark:bg-[#161a23] border border-gray-100 dark:border-gray-800 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
        {icon && (
          <div className="bg-[#e6f7f2] dark:bg-[#1e2b24] p-2 rounded-full text-[#00a76f]">
            {icon}
          </div>
        )}
      </div>

      {growth && (
        <p
          className={`text-xs font-medium mt-1 ${growthColor} flex items-center`}
        >
          {isPositive && "▲"}
          {isNegative && "▼"}
          {!isPositive && !isNegative && "–"}&nbsp;{growth}&nbsp;
          <span className="text-gray-400 dark:text-gray-500 ml-1">
            from last period
          </span>
        </p>
      )}
    </div>
  );
}
