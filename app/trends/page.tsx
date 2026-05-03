'use client'
// This page is not in use currently, but will be used in the future to display trends graphs for skills, remote work, and disciplines over time. It fetches data from the backend and formats it for use with the Recharts library.
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
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-8 pt-16 pb-24 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Backend jobs over time</h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <LineChart
          style={{ width: '100%', maxWidth: '800px', aspectRatio: 1.618 }}
          data={data}
        >
          <Line
            type="monotone"
            dataKey="backend"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6' }}
            activeDot={{ stroke: '#a78bfa', fill: '#8b5cf6' }}
          />
        </LineChart>
      </div>
    </main>
  )
}

export default function TrendsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center">Loading trends...</div>}>
      <TrendsChart />
    </Suspense>
  )
}