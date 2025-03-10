"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScheduleMeetingButton } from "./schedule-meeting-button"
import { JoinMeetingButton } from "./join-meeting-button"

export function MeetingsOverview() {
  const upcomingMeetings = [
    { id: 1, title: "Team Sync", time: "10:00 AM", date: "Today" },
    { id: 2, title: "Client Presentation", time: "2:00 PM", date: "Tomorrow" },
    { id: 3, title: "Project Review", time: "11:30 AM", date: "May 15" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Meetings Overview</h2>
          <p className="text-muted-foreground">View and manage your upcoming and recent meetings</p>
        </div>
        <ScheduleMeetingButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next in 2 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Across all meetings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Hours</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36.5</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Upcoming Meetings Card */}
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
                  <JoinMeetingButton variant="outline" size="sm" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Join Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Join</CardTitle>
            <CardDescription>Join your next meeting with one click</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Team Sync</h3>
                  <Badge>Starting soon</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Today at 10:00 AM (5 minutes)</p>
                <JoinMeetingButton variant="default" size="default" />
              </div>
              <p className="text-sm text-muted-foreground text-center">No other meetings scheduled for today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Meetings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
            <CardDescription>Your past meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Budget Review</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 3:00 PM</p>
                </div>
                <Badge variant="outline">Completed</Badge>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Marketing Strategy</p>
                  <p className="text-sm text-muted-foreground">May 10 at 1:30 PM</p>
                </div>
                <Badge variant="outline">Completed</Badge>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Product Demo</p>
                  <p className="text-sm text-muted-foreground">May 8 at 11:00 AM</p>
                </div>
                <Badge variant="outline">Completed</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Meeting Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Stats</CardTitle>
            <CardDescription>Your meeting analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Duration</span>
                <span className="text-sm">45 minutes</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm">92%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "92%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">On-time Start</span>
                <span className="text-sm">85%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

