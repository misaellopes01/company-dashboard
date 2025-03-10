import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function MeetingCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Calendar</CardTitle>
        <CardDescription>Schedule and view your meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" className="rounded-md border" />
      </CardContent>
    </Card>
  )
}

