import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

const upcomingPayments = [
  {
    id: "SCH-001",
    description: "Netflix Subscription",
    amount: 15.99,
    dueDate: "2023-08-10",
    daysLeft: 5,
    status: "scheduled",
    recurring: true,
  },
  {
    id: "SCH-002",
    description: "Adobe Creative Cloud",
    amount: 52.99,
    dueDate: "2023-08-15",
    daysLeft: 10,
    status: "scheduled",
    recurring: true,
  },
  {
    id: "SCH-003",
    description: "Office Rent",
    amount: 1500.0,
    dueDate: "2023-08-01",
    daysLeft: -4,
    status: "overdue",
    recurring: true,
  },
  {
    id: "SCH-004",
    description: "Internet Service",
    amount: 79.99,
    dueDate: "2023-08-05",
    daysLeft: 0,
    status: "due_today",
    recurring: true,
  },
]

export function UpcomingPayments() {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Scheduled</Badge>
      case "due_today":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Due Today</Badge>
        )
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</Badge>
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
                <p className="text-sm font-medium">{payment.description}</p>
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
            View All Scheduled Payments
          </Button>
        </>
      )}
    </div>
  )
}

