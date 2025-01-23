import { Card } from "../../components/UI/Card"
import { Users, HandCoins, UserPlus, UserX, MoreHorizontal } from 'lucide-react'
import { MetricCard } from '../../components/UI/MetricCard'
import { LineChart } from '../../components/UI/linechart'
import { DonutChart } from '../../components/UI/Donut-chart'
import { useState,useEffect } from "react"
import apiRequest from "@/api/axios"
import Expire from "../../layouts/Expire"
function Dashboard() {
  const[dashboardData, setDashboardData] = useState({
    userCount:0,
    recentMembers:0,
    pendingAmount:0,
  });
  const [lineChartData, setLineChartData] = useState([]);
  const [donutChartData, setDonutChartData] =useState([]);
  useEffect(() => {
    // Fetch user data from the API
    const fetchDashboardCount = async()=>{
      try{
        const response = await apiRequest('dashboardCount','GET');
        setDashboardData({
          userCount: response.data.user_count || 0,
          recentMembers: response.data.recent_members || 0,
          pendingAmount: response.data.pending_amount || 0,
        });
        const linechartformattedData = (response.data.monthly_growth || []).map((item)=>({
          time: new Date(0, item.month-1).toLocaleString("en",{month:"short"}),
          value:item.count,
        }));
        const totalMembers = (response.data.membership_breakdown || []).reduce((sum, item) => sum + item.count, 0);
        const donutchartformattedData = (response.data.membership_breakdown || []).map((item)=>({
          name: item.membership_name,
          value: item.count,
          percentage: ((item.count / totalMembers) * 100).toFixed(1),
        }));
        setDonutChartData(donutchartformattedData);
        setLineChartData(linechartformattedData);
      }
      catch(err){
        console.log("Failed to fetch dashboard data",err.message);
      }
    };
    
   
   fetchDashboardCount();
  }, []);

  return (
    <div className="py-3 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          iconBg="bg-blue-50"
          value={dashboardData.userCount}
          label="Total Members"
        />
        <MetricCard 
          icon={<HandCoins className="w-6 h-6 text-primary" />}
          iconBg="bg-secondary"
          value= {`NRs. ${(Number(dashboardData.pendingAmount) || 0).toLocaleString('en-IN')}`}
          label="Total Pending Amount"
        />
        <MetricCard 
          icon={<UserPlus className="w-6 h-6 text-coral-500" />}
          iconBg="bg-red-50"
          value={dashboardData.recentMembers}
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
          <LineChart data={lineChartData} />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <MoreHorizontal className="text-gray-400" />
          </div>
          <DonutChart data={donutChartData} colors={['#60A5FA', '#FCD34D', '#FB923C','#34D399 ']} centerText="Memberships"
            centerSubtext="Breakdown"/>
        </Card>
      </div>
      <Expire />
    </div>
  )
}

export default Dashboard;

