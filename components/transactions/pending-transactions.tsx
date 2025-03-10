import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react"

const pendingTransactions = [
  {
    id: 1,
    description: "Uber Ride",
    category: "Transportation",
    amount: -24.5,
    date: "2023-07-16",
    type: "expense",
    status: "pending",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uber-logo.png",
  },
  {
    id: 2,
    description: "Client Payment",
    category: "Income",
    amount: 1200,
    date: "2023-07-18",
    type: "income",
    status: "pending",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/client-logo.png",
  },
  {
    id: 3,
    description: "Office Supplies",
    category: "Business",
    amount: -78.35,
    date: "2023-07-17",
    type: "expense",
    status: "pending",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/office-logo.png",
  },
]

export function PendingTransactions() {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      {pendingTransactions.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No pending transactions</p>
        </div>
      ) : (
        <>
          {pendingTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={transaction.icon} alt={transaction.description} />
                  <AvatarFallback>{transaction.description.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                    <Badge variant="secondary" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <span
                  className={`text-sm font-medium flex items-center ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1" />
                  )}
                </span>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All Pending
          </Button>
        </>
      )}
    </div>
  )
}

