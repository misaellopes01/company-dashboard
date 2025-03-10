import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export function ProjectsStats() {
  const stats = [
    {
      title: "Total Projects",
      value: "42",
      icon: Briefcase,
      change: "+4 from last month",
      trend: "up",
    },
    {
      title: "In Progress",
      value: "18",
      icon: Clock,
      change: "+2 from last month",
      trend: "up",
    },
    {
      title: "Completed",
      value: "24",
      icon: CheckCircle,
      change: "+3 from last month",
      trend: "up",
    },
    {
      title: "At Risk",
      value: "3",
      icon: AlertTriangle,
      change: "-1 from last month",
      trend: "down",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

