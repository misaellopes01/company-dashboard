"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Video, Mic, MicOff, VideoOff } from "lucide-react"

export function JoinMeetingModal({ open, onOpenChange }) {
  const [meetingId, setMeetingId] = useState("")
  const [name, setName] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)

  const handleJoin = () => {
    // Handle joining the meeting
    console.log("Joining meeting", { meetingId, name, audioEnabled, videoEnabled })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Meeting</DialogTitle>
          <DialogDescription>Enter the meeting details to join an existing meeting.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="meeting-id">Meeting ID or Link</Label>
            <Input
              id="meeting-id"
              placeholder="Enter meeting ID or paste link"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-medium">Meeting Options</h4>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="audio"
                checked={audioEnabled}
                onCheckedChange={(checked) => setAudioEnabled(checked === true)}
              />
              <Label htmlFor="audio" className="flex items-center">
                {audioEnabled ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}
                Join with audio
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="video"
                checked={videoEnabled}
                onCheckedChange={(checked) => setVideoEnabled(checked === true)}
              />
              <Label htmlFor="video" className="flex items-center">
                {videoEnabled ? <Video className="mr-2 h-4 w-4" /> : <VideoOff className="mr-2 h-4 w-4" />}
                Join with video
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleJoin} disabled={!meetingId.trim()}>
            Join Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

