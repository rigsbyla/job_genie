'use client'

import { useState } from 'react'
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

export function DisciplineFilter({ onFilter }: { onFilter: (value: string | null) => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(value: string | null) {
    setSelected(value)
    onFilter(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selected ? selected : 'Discipline'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Discipline</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {DISCIPLINES.map(discipline => (
            <DropdownMenuItem
              key={discipline}
              onClick={() => handleSelect(discipline)}
            >
              {discipline}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSelect(null)}>
            Clear filter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}