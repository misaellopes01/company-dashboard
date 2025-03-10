import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"

export function QuickJoin() {
  const upcomingMeeting = {
    title: "Team Sync",
    time: "10:00 AM",
    link: "#",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Join</CardTitle>
        <CardDescription>Join your next meeting with one click</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium">{upcomingMeeting.title}</p>
            <p className="text-sm text-muted-foreground">Starting at {upcomingMeeting.time}</p>
          </div>
          <Button className="w-full">
            <Video className="mr-2 h-4 w-4" />
            Join Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

