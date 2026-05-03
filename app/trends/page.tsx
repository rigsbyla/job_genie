'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { Line, LineChart } from 'recharts'

function formatForChart(data: Record<string, Record<string, number>>) {
  const allMonths = [...new Set(
    Object.values(data).flatMap(months => Object.keys(months))
  )].sort()

  return allMonths.map(month => ({
    name: month,
    backend: data.backend?.[month] ?? 0
  }))
}


function TrendsChart() {
  const [data, setData] = useState<any[]>([])

   useEffect(() => {
    fetch('http://localhost:8000/trends/discipline')
      .then(res => res.json())
      .then(raw => {
        const formatted = formatForChart(raw)
        console.log('formatted data:', formatted)
        setData(formatted)
      })
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Backend jobs over time</h1>
      <LineChart
        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
        responsive
        data={data}
      >
        <Line
          type="monotone"
          dataKey="backend"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: '#291515' }}
          activeDot={{ stroke: '#970c0c' }}
        />
      </LineChart>
    </main>
  )
}

export default function TrendsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrendsChart />
    </Suspense>
  )
}