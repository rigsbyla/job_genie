import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getData() {
  const res = await fetch('http://localhost:8000/jobs', { cache: 'no-store' })
  return res.json()
}

export default async function JobsPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}