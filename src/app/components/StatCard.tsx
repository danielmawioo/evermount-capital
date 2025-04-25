interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  growth?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  growth,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
        {icon && <div className="text-[#00a76f]">{icon}</div>}
      </div>
      {growth && (
        <p className="text-xs mt-2 text-green-600 font-medium">
          ▲ {growth} from last period
        </p>
      )}
    </div>
  );
}
