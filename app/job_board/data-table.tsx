"use client"
import * as React from "react"
import { useSearchParams } from 'next/navigation'
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"

import { Button } from "@/components/p-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/input-menu"

const DISCIPLINES = ['frontend', 'backend', 'data', 'algorithms', 'devops']
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']
const LEVELS = ['Entry', 'Mid', 'Senior', 'Lead', 'Manager']
const REMOTE_OPTIONS = ['Remote', 'On-site', 'Hybrid']

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams()
  const initialDiscipline = searchParams.get('discipline')

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialDiscipline ? [{ id: 'discipline', value: initialDiscipline }] : []
  )
  const [selectedDiscipline, setSelectedDiscipline] = React.useState<string | null>(initialDiscipline)
  const [selectedType, setSelectedType] = React.useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null)
  const [selectedRemote, setSelectedRemote] = React.useState<string | null>(null)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  })

  function handleDisciplineFilter(value: string | null) {
    setSelectedDiscipline(value)
    table.getColumn('discipline')?.setFilterValue(value ?? undefined)
  }

  function handleTypeFilter(value: string | null) {
    setSelectedType(value)
    table.getColumn('type')?.setFilterValue(value ?? undefined)
  }

  function handleLevelFilter(value: string | null) {
    setSelectedLevel(value)
    table.getColumn('level')?.setFilterValue(value ?? undefined)
  }

  function handleRemoteFilter(value: string | null) {
    setSelectedRemote(value)
    table.getColumn('remote')?.setFilterValue(value ?? undefined)
  }

  function handleClearFilters() {
    setSelectedDiscipline(null)
    setSelectedType(null)
    setSelectedLevel(null)
    setSelectedRemote(null)
    table.resetColumnFilters()
  }

  const filterButton = "border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 text-sm px-4 py-2 rounded-full transition-colors"
  const activeFilterButton = "border border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 text-sm px-4 py-2 rounded-full transition-colors"

  function FilterDropdown({
    label,
    options,
    selected,
    onSelect,
  }: {
    label: string
    options: string[]
    selected: string | null
    onSelect: (value: string | null) => void
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={selected ? activeFilterButton : filterButton}>
            {selected ? selected : label}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900 border-zinc-700 text-zinc-300">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-zinc-500">{label}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            {options.map(option => (
              <DropdownMenuItem
                key={option}
                onClick={() => onSelect(option)}
                className="hover:bg-zinc-800 hover:text-zinc-50 cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem
              onClick={() => onSelect(null)}
              className="hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Clear filter
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="p-6">

      {/* filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <FilterDropdown label="Discipline" options={DISCIPLINES} selected={selectedDiscipline} onSelect={handleDisciplineFilter} />
        <FilterDropdown label="Type" options={TYPES} selected={selectedType} onSelect={handleTypeFilter} />
        <FilterDropdown label="Level" options={LEVELS} selected={selectedLevel} onSelect={handleLevelFilter} />
        <FilterDropdown label="Remote" options={REMOTE_OPTIONS} selected={selectedRemote} onSelect={handleRemoteFilter} />
        {(selectedDiscipline || selectedType || selectedLevel || selectedRemote) && (
          <button
            className="border border-zinc-600 bg-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 text-sm px-4 py-2 rounded-full transition-colors"
            onClick={handleClearFilters}
          >
            Clear all ✕
          </button>
        )}
      </div>

      {/* table */}
      <div className="rounded-2xl border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-zinc-800 bg-zinc-950 hover:bg-zinc-950">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-zinc-400 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-zinc-300">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                  No matching opportunities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      
        {/* pagination */}
      <div className="flex items-center justify-end gap-2 pt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => table.setPageIndex(i)}
                  isActive={table.getState().pagination.pageIndex === i}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
     

    </div>
  )
}