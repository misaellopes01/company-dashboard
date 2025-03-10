import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Building, TrendingUp } from "lucide-react"

export function OrganizationOverview() {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      icon: Users,
      change: "+12% from last month",
      trend: "up",
    },
    {
      title: "Departments",
      value: "8",
      icon: Building,
      change: "No change",
      trend: "neutral",
    },
    {
      title: "Teams",
      value: "24",
      icon: Briefcase,
      change: "+2 from last month",
      trend: "up",
    },
    {
      title: "Productivity",
      value: "92%",
      icon: TrendingUp,
      change: "+5% from last month",
      trend: "up",
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
              className={`mt-2 flex items-center text-xs ${
                stat.trend === "up"
                  ? "text-green-500"
                  : stat.trend === "down"
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : stat.trend === "down" ? (
                <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
              ) : null}
              {stat.trend !== "neutral" && stat.change.split(" ")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

