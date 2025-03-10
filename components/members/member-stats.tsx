import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, UserPlus, UserCheck, UserX } from "lucide-react"

export function MemberStats() {
  const stats = [
    {
      title: "Total Members",
      value: "248",
      icon: Users,
      change: "+12% from last month",
      trend: "up",
    },
    {
      title: "Active Members",
      value: "195",
      icon: UserCheck,
      change: "+8% from last month",
      trend: "up",
    },
    {
      title: "New Members",
      value: "24",
      icon: UserPlus,
      change: "+15% from last month",
      trend: "up",
    },
    {
      title: "Inactive Members",
      value: "29",
      icon: UserX,
      change: "-5% from last month",
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
            <div
              className={`mt-2 flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {stat.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowUpRight className="mr-1 h-3 w-3 transform rotate-180" />
              )}
              {stat.change.split(" ")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

