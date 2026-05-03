'use client'

import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <a href="/" className="flex items-center gap-2">
          <img src="/magic-lamp.svg" className="w-9 h-9" alt="" />   
          <span className="font-bold text-zinc-50">Job Genie</span>
        </a>
      </div>
      <nav className="flex gap-6 text-sm font-medium text-zinc-400">
        <a href="/quiz" className="hover:text-zinc-50 transition-colors">Take the Quiz</a>
        <a href="/job_board" className="hover:text-zinc-50 transition-colors">All Jobs</a>
      </nav>
    </header>
  )
}
