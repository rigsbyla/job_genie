'use client'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { Job } from "@/app/job_board/columns"

export function JobDrawer({ job }: { job: Job }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 text-sm px-4 py-2 rounded-full transition-colors cursor-pointer text-left">
          {job.title}
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-[800px] sm:w-[800px] max-w-[90vw] bg-zinc-950 border-zinc-800">
        <DrawerHeader className="px-8 pt-8 pb-4">
          <DrawerTitle className="text-zinc-50 text-2xl font-bold">{job.title}</DrawerTitle>
          <DrawerDescription className="text-zinc-400">{job.company} · <span className="font-mono">{job.salary}</span></DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-8 flex gap-8">

          {/* left column */}
          <div className="flex-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">About the role</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{job.description}</p>
          </div>

          {/* right column */}
          <div className="w-56 shrink-0 flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Discipline</p>
              <p className="text-sm font-medium text-zinc-300">{job.discipline}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Level</p>
              <p className="text-sm font-medium text-zinc-300">{job.level}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Type</p>
              <p className="text-sm font-medium text-zinc-300">{job.type}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Location</p>
              <p className="text-sm font-medium text-zinc-300">{job.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Remote</p>
              <p className="text-sm font-medium text-zinc-300">{job.remote}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {job.skills?.map(skill => (
                  <span
                    key={skill}
                    className="text-xs border border-violet-500/20 bg-violet-500/10 text-violet-300 rounded-full px-2.5 py-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <DrawerFooter className="px-8 pb-8">
          <DrawerClose asChild>
            <button className="border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer w-full">
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
