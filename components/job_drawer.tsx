import { Button } from "@/components/p-button"
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
        <Button variant="outline">{job.title}</Button>
      </DrawerTrigger>
      <DrawerContent className="w-[300px] sm:w-[800px] max-w-[90vw]">
        <DrawerHeader>
          <DrawerTitle>{job.title}</DrawerTitle>
          <DrawerDescription>{job.company} · {job.salary}</DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 flex gap-6">

          {/* left column */}
          <div className="flex-1">
            <h3 className="font-medium mb-2">About the role</h3>
            <p className="text-sm">{job.description}</p>
          </div>

          {/* right column */}
          <div className="w-56 shrink-0 flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Discipline</p>
              <p className="text-sm font-medium">{job.discipline}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Level</p>
              <p className="text-sm font-medium">{job.level}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="text-sm font-medium">{job.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="text-sm font-medium">{job.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Remote</p>
              <p className="text-sm font-medium">{job.remote}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {job.skills?.map(skill => (
                  <span key={skill} className="text-xs border rounded px-2 py-0.5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}