import { Suspense } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Briefcase } from 'lucide-react'

async function getData() {
  const res = await fetch('http://localhost:8000/jobs', { cache: 'no-store' })
  return res.json()
}

export default async function JobBoardPage() {
  const data = await getData()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">

      {/* header */}
      <div className="px-8 pt-16 pb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-500/10 w-12 h-12 rounded-2xl flex items-center justify-center border border-cyan-500/20">
            <Briefcase className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Job Board</h1>
            <p className="text-slate-400 text-sm">Curated roles for CS students and new grads</p>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="px-8 pb-24 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden">
          <Suspense fallback={<div className="p-8 text-slate-400">Loading...</div>}>
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>
      </div>

    </div>
  )
}