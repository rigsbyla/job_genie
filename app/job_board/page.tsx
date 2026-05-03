import { Suspense } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

async function getData() {
  const res = await fetch('http://localhost:8000/jobs', { cache: 'no-store' })
  return res.json()
}

export default async function JobBoardPage() {
  const data = await getData()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable columns={columns} data={data} />
    </Suspense>
  )
}