import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

const upcomingPayments = [
  {
    id: "INV-002",
    client: "Globex Corp",
    amount: 3500.0,
    dueDate: "2023-08-10",
    daysLeft: 5,
    status: "pending",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    amount: 5000.0,
    dueDate: "2023-08-05",
    daysLeft: 0,
    status: "overdue",
  },
  {
    id: "INV-005",
    client: "Umbrella Corp",
    amount: 1800.0,
    dueDate: "2023-07-25",
    daysLeft: -10,
    status: "overdue",
  },
  {
    id: "INV-007",
    client: "Cyberdyne Systems",
    amount: 2200.0,
    dueDate: "2023-08-15",
    daysLeft: 10,
    status: "pending",
  },
]

export function UpcomingPayments() {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {upcomingPayments.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No upcoming payments</p>
        </div>
      ) : (
        <>
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">{payment.client}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{payment.id}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(payment.dueDate)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${payment.amount.toFixed(2)}</p>
                <div className="flex items-center justify-end gap-2">
                  {getStatusBadge(payment.status)}
                  {payment.daysLeft > 0 ? (
                    <span className="text-xs text-muted-foreground">{payment.daysLeft} days left</span>
                  ) : payment.daysLeft === 0 ? (
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">Due today</span>
                  ) : (
                    <span className="text-xs text-red-600 dark:text-red-400">
                      {Math.abs(payment.daysLeft)} days overdue
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Payments
          </Button>
        </>
      )}
    </div>
  )
}

