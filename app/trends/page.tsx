// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// function formatForChart(data) {
//   const allMonths = [...new Set(
//     Object.values(data).flatMap((months: any) => Object.keys(months))
//   )].sort()

//   return allMonths.map(month => ({
//     name: month,
//     ...Object.fromEntries(
//       Object.entries(data).map(([key, months]: any) => [key, months[month] ?? 0])
//     )
//   }))
// }

// const COLORS = {
//   backend: '#8884d8',
//   frontend: '#82ca9d',
//   data: '#ff7300',
//   algorithms: '#0088fe',
//   devops: '#ff4d4f',
// }

// export default function TrendsPage() {
//   const searchParams = useSearchParams()
//   const discipline = searchParams.get('discipline') || 'backend'
//   const [data, setData] = useState([])

//   useEffect(() => {
//     fetch('http://localhost:8000/trends/discipline')
//       .then(res => res.json())
//       .then(raw => setData(formatForChart(raw)))
//   }, [])

//   return (
//     <main style={{ padding: '2rem' }}>
//       <h1>{discipline} jobs over time</h1>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={data}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey={discipline}
//             stroke={COLORS[discipline] || '#8884d8'}
//             strokeWidth={2}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </main>
//   )
// }