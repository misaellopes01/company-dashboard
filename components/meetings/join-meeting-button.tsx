"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { JoinMeetingModal } from "./join-meeting-modal"

export function JoinMeetingButton({ variant = "default", size = "default" }) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setShowDialog(true)}>
        <Video className="mr-2 h-4 w-4" />
        Join Meeting
      </Button>
      <JoinMeetingModal open={showDialog} onOpenChange={setShowDialog} />
    </>
  )
}

