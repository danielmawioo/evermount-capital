const activities = [
  {
    id: 1,
    description: "Deposited $5,000 into Growth Fund",
    time: "2 hours ago",
  },
  { id: 2, description: "Rebalanced portfolio", time: "Yesterday" },
  { id: 3, description: "Withdrew $1,200 to bank", time: "3 days ago" },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <ul className="space-y-3 text-sm text-gray-600">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="border-b pb-2 last:border-0 last:pb-0"
          >
            <p>{activity.description}</p>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
