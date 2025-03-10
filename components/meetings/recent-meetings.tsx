import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentMeetings() {
  const recentMeetings = [
    { id: 1, title: "Project Kickoff", date: "May 1", participants: ["JD", "AS", "TK"] },
    { id: 2, title: "Design Review", date: "May 3", participants: ["LM", "RN", "JD"] },
    { id: 3, title: "Sprint Planning", date: "May 5", participants: ["AS", "TK", "LM"] },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Meetings</CardTitle>
        <CardDescription>Your meeting history</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentMeetings.map((meeting) => (
            <li key={meeting.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{meeting.title}</p>
                <p className="text-sm text-muted-foreground">{meeting.date}</p>
              </div>
              <div className="flex -space-x-2">
                {meeting.participants.map((participant, index) => (
                  <Avatar key={index} className="h-8 w-8 border-2 border-background">
                    <AvatarFallback>{participant}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

