import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ShieldCheck, Users, Lock, FileText } from "lucide-react"

export function PermissionStats() {
  const stats = [
    {
      title: "Total Roles",
      value: "8",
      icon: ShieldCheck,
      change: "+1 from last month",
      trend: "up",
    },
    {
      title: "Users with Custom Permissions",
      value: "24",
      icon: Users,
      change: "+5 from last month",
      trend: "up",
    },
    {
      title: "Protected Resources",
      value: "42",
      icon: Lock,
      change: "+3 from last month",
      trend: "up",
    },
    {
      title: "Permission Policies",
      value: "15",
      icon: FileText,
      change: "+2 from last month",
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

