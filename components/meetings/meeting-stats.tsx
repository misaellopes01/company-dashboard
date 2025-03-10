import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Clock, Users } from "lucide-react"

export function MeetingStats() {
  const stats = [
    { title: "Total Meetings", value: "24", icon: BarChart },
    { title: "Avg. Duration", value: "45m", icon: Clock },
    { title: "Participants", value: "86", icon: Users },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Stats</CardTitle>
        <CardDescription>Your meeting statistics this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

