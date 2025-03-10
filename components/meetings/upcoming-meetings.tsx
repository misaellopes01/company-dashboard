"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

const upcomingMeetings = [
  { id: 1, title: "Team Sync", time: "10:00 AM", date: "Today" },
  { id: 2, title: "Client Presentation", time: "2:00 PM", date: "Tomorrow" },
  { id: 3, title: "Project Review", time: "11:30 AM", date: "May 15" },
]

export function UpcomingMeetings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Meetings</CardTitle>
        <CardDescription>Your next meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {upcomingMeetings.map((meeting) => (
            <li key={meeting.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-sm text-muted-foreground">
                  {meeting.date} at {meeting.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Join
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

