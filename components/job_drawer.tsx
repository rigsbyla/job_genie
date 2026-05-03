'use client'

import { useState, useEffect } from 'react'
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
        <button className="border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-50 text-sm px-4 py-2 rounded-full transition-colors cursor-pointer text-left">
          {job.title}
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-[800px] sm:w-[800px] max-w-[90vw]">
        <DrawerHeader>
          <DrawerTitle className="text-slate-50">{job.title}</DrawerTitle>
          <DrawerDescription className="text-slate-400">{job.company} · {job.salary}</DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 flex gap-6">

          {/* left column */}
          <div className="flex-1">
            <h3 className="font-medium mb-2 text-slate-300">About the role</h3>
            <p className="text-sm text-slate-400">{job.description}</p>
          </div>

          {/* right column */}
          <div className="w-56 shrink-0 flex flex-col gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Discipline</p>
              <p className="text-sm font-medium text-slate-300">{job.discipline}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Level</p>
              <p className="text-sm font-medium text-slate-300">{job.level}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Type</p>
              <p className="text-sm font-medium text-slate-300">{job.type}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Location</p>
              <p className="text-sm font-medium text-slate-300">{job.location}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Remote</p>
              <p className="text-sm font-medium text-slate-300">{job.remote}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {job.skills?.map(skill => (
                  <span
                    key={skill}
                    className="text-xs border border-slate-700 bg-slate-800 text-slate-300 rounded-full px-2 py-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <button className="border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-50 text-sm px-4 py-2 rounded-full transition-colors cursor-pointer w-full">
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}