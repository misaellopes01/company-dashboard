"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { CreateMeetingDialog } from "./create-meeting-dialog"

export function ScheduleMeetingButton() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Meeting
      </Button>
      <CreateMeetingDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  )
}

