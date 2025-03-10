import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, CreditCard, DollarSign, RefreshCcw, XCircle } from "lucide-react"

export function PaymentStats() {
  const stats = [
    {
      title: "Total Payments",
      value: "$45,231.89",
      icon: DollarSign,
      change: "+20.1% from last month",
      trend: "up",
    },
    {
      title: "Successful Payments",
      value: "$42,891.12",
      icon: CreditCard,
      change: "+18.7% from last month",
      trend: "up",
    },
    {
      title: "Recurring Payments",
      value: "$12,456.00",
      icon: RefreshCcw,
      change: "+5.4% from last month",
      trend: "up",
    },
    {
      title: "Failed Payments",
      value: "$2,340.77",
      icon: XCircle,
      change: "-3.2% from last month",
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

