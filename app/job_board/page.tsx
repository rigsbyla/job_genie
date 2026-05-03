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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">

      {/* header */}
      <div className="px-8 pt-16 pb-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-violet-500/10 w-12 h-12 rounded-2xl flex items-center justify-center border border-violet-500/20">
            <Briefcase className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Job Board</h1>
            <p className="text-zinc-400 text-sm">Curated roles for CS students and new grads</p>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="px-8 pb-24 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <Suspense fallback={
            <div className="p-8 text-zinc-400 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-zinc-600 border-t-violet-500 rounded-full animate-spin" />
              Finding opportunities...
            </div>
          }>
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>
      </div>

    </div>
  )
}