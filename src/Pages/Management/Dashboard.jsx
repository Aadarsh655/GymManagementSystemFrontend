import { Card } from "../../components/UI/Card"
import { Users, HandCoins, UserPlus, UserX, MoreHorizontal } from 'lucide-react'
import { MetricCard } from '../../components/UI/MetricCard'
import { LineChart } from '../../components/UI/linechart'
import { DonutChart } from '../../components/UI/Donut-chart'

function Dashboard() {
  return (
    <div className="py-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          iconBg="bg-blue-50"
          value="178"
          label="Total Members"
        />
        <MetricCard 
          icon={<HandCoins className="w-6 h-6 text-primary" />}
          iconBg="bg-secondary"
          value="NRs 20,000"
          label="Monthly Pending Amount"
        />
        <MetricCard 
          icon={<UserPlus className="w-6 h-6 text-coral-500" />}
          iconBg="bg-red-50"
          value="56"
          label="Recent Members"
        />
        <MetricCard 
          icon={<UserX className="w-6 h-6 text-purple-500" />}
          iconBg="bg-purple-50"
          value="12"
          label="Inactive Members"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Reports</h2>
            <MoreHorizontal className="text-gray-400" />
          </div>
          <LineChart />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <MoreHorizontal className="text-gray-400" />
          </div>
          <DonutChart />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard;

