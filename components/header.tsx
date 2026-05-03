'use client'

import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        
        <a href="/" className="flex items-center gap-2">
        <div className="bg-indigo-500 p-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-50">Job Genie</span>
        </a>
      </div>
      <nav className="flex gap-6 text-sm font-medium text-slate-300">
        <a href="/quiz" className="hover:text-white transition-colors">Take the Quiz</a>
        <a href="/job_board" className="hover:text-white transition-colors">All Jobs</a>

      </nav>
    </header>
  )
}