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

const DISCIPLINES = ['Frontend', 'Backend', 'Data', 'Algorithms', 'DevOps']
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']
const LEVELS = ['Junior', 'Mid', 'Senior', 'Lead']
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
  const [selectedDiscipline, setSelectedDiscipline] = React.useState<string | null>(
    initialDiscipline
  )
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
    state: {
      sorting,
      columnFilters,
    },
  })

  function handleDisciplineFilter(value: string | null) {
    setSelectedDiscipline(value)
    if (value) {
      table.getColumn('discipline')?.setFilterValue(value)
    } else {
      table.getColumn('discipline')?.setFilterValue(undefined)
    }
  }

  function handleTypeFilter(value: string | null) {
    setSelectedType(value)
    if (value) {
      table.getColumn('type')?.setFilterValue(value)
    } else {
      table.getColumn('type')?.setFilterValue(undefined)
    }
  }

  function handleLevelFilter(value: string | null) {
    setSelectedLevel(value)
    if (value) {
      table.getColumn('level')?.setFilterValue(value)
    } else {
      table.getColumn('level')?.setFilterValue(undefined)
    }
  }

  function handleRemoteFilter(value: string | null) {
    setSelectedRemote(value)
    if (value) {
      table.getColumn('remote')?.setFilterValue(value)
    } else {
      table.getColumn('remote')?.setFilterValue(undefined)
    } 
  }

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedDiscipline ? selectedDiscipline : 'Discipline'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Discipline</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DISCIPLINES.map(discipline => (
                <DropdownMenuItem
                  key={discipline}
                  onClick={() => handleDisciplineFilter(discipline)}
                >
                  {discipline}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDisciplineFilter(null)}>
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedType ? selectedType : 'Type'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {TYPES.map(type => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => handleTypeFilter(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleTypeFilter(null)}>
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedLevel ? selectedLevel : 'Level'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LEVELS.map(level => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => handleLevelFilter(level)}
                >
                  {level}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleLevelFilter(null)}>
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedRemote ? selectedRemote : 'Remote'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Remote</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {REMOTE_OPTIONS.map(option => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleRemoteFilter(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleRemoteFilter(null)}>
                Clear filter
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}