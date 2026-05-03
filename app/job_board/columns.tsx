"use client"

import { Button } from "@/components/p-button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { JobDrawer } from "@/components/job_drawer"

export type Job = {
  id: number
  title: string
  company: string
  discipline: string
  type: string
  level: string
  remote: string
  location: string
  salary: string
  skills: string[]
  description: string, 
  created_at: string

}

export const columns: ColumnDef<Job>[] = [
  { 
    accessorKey: "title", 
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <JobDrawer job={row.original} />
  },
  { accessorKey: "company", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, },
  { accessorKey: "discipline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Discipline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   },
  { accessorKey: "type", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, },
  { accessorKey: "level", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, },
  { accessorKey: "remote", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Remote
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, },
  { accessorKey: "salary", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Salary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, },
    {
  accessorKey: "created_at",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Posted
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => timeAgo(row.getValue("created_at"))
}
]

// Helper function to format the "created_at" date as "X days ago"
function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}