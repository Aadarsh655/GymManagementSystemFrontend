// import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

// const data = [
//   { time: 'Jan', value: 50 },
//   { time: 'Feb', value: 35 },
//   { time: 'Mar', value: 60 },
//   { time: 'Apr', value: 50 },
//   { time: 'May', value: 85 },
//   { time: 'Jun', value: 45 },
//   { time: 'Jul', value: 60 },
//   { time: 'Aug', value: 35 },
//   { time: 'Sep', value: 60 },
//   { time: 'Oct', value: 85 },
//   { time: 'Nov', value: 45 },
//   { time: 'Dec', value: 70 },
// ]

// export function LineChart() {
//   return (
//     <div className="h-[300px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <RechartsLine data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="time" />
//           <YAxis />
//           <defs>
//             <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor="#FEF2F0" />
//               <stop offset="50%" stopColor="#F17078" />
//               <stop offset="100%" stopColor="#d62839" />
//             </linearGradient>
//           </defs>
//           <Line 
//             type="monotone" 
//             dataKey="value" 
//             stroke="url(#lineGradient)" 
//             strokeWidth={3} 
//             dot={false}
//           />
//         </RechartsLine>
//       </ResponsiveContainer>
//     </div>
//   )
// }

import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export function LineChart({ data }) {
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
  );
}
