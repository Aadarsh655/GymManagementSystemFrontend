import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function DonutChart({ data, colors, centerText, centerSubtext }) {
  return (
    <div className="h-[300px] w-full mt-6 relative">
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.percentage}%)`, name]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-l font-bold">{centerText || ''}</div>
        <div className="text-gray-500 text-sm">{centerSubtext || ''}</div>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
            <span className="text-sm text-gray-600">
              {entry.name}: {entry.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
