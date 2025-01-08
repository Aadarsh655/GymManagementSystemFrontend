import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
  { time: '10am', value: 50 },
  { time: '11am', value: 35 },
  { time: '12pm', value: 60 },
  { time: '01pm', value: 50 },
  { time: '02pm', value: 85 },
  { time: '03pm', value: 45 },
  { time: '04pm', value: 60 },
  { time: '05pm', value: 35 },
  { time: '06pm', value: 60 },
  { time: '07pm', value: 85 },
]

export function LineChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FEF2F0" />
              <stop offset="50%" stopColor="#F17078" />
              <stop offset="100%" stopColor="#d62839" />
            </linearGradient>
          </defs>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="url(#lineGradient)" 
            strokeWidth={3} 
            dot={false}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  )
}

