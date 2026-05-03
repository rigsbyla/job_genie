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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{job.title}</DrawerTitle>
          <DrawerDescription>{job.company} · {job.salary}</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <p>{job.description}</p>
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