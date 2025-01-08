export function MetricCard({ icon, iconBg, value, label }) {
    return (
      <div className="p-3 rounded-xl bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${iconBg}`}>
            {icon}
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
          </div>
        </div>
      </div>
    )
  }
  
  