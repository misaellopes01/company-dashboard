import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, CreditCard, DollarSign } from "lucide-react"

export function TransactionStats() {
  const stats = [
    {
      title: "Total Transactions",
      value: "2,345",
      icon: CreditCard,
      change: "+12% from last month",
      trend: "up",
    },
    {
      title: "Total Income",
      value: "$45,231.89",
      icon: ArrowUpRight,
      change: "+8% from last month",
      trend: "up",
    },
    {
      title: "Total Expenses",
      value: "$21,456.78",
      icon: ArrowDownRight,
      change: "+5% from last month",
      trend: "up",
    },
    {
      title: "Net Balance",
      value: "$23,775.11",
      icon: DollarSign,
      change: "+15% from last month",
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
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {stat.change.split(" ")[0]}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

