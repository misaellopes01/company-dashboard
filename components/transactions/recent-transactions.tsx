import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Amazon.com",
    category: "Shopping",
    amount: -129.99,
    date: "2023-07-15",
    type: "expense",
    status: "completed",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon-logo.png",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 3500,
    date: "2023-07-01",
    type: "income",
    status: "completed",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/company-logo.png",
  },
  {
    id: 3,
    description: "Whole Foods Market",
    category: "Groceries",
    amount: -89.72,
    date: "2023-07-10",
    type: "expense",
    status: "completed",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wholefoods-logo.png",
  },
  {
    id: 4,
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "2023-07-05",
    type: "expense",
    status: "completed",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-logo.png",
  },
  {
    id: 5,
    description: "Freelance Payment",
    category: "Income",
    amount: 750,
    date: "2023-07-12",
    type: "income",
    status: "completed",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freelance-logo.png",
  },
]

export function RecentTransactions() {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
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
                <Badge variant="outline" className="text-xs">
                  {transaction.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium flex items-center ${
                transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
              {transaction.type === "income" ? (
                <ArrowUpRight className="h-4 w-4 ml-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 ml-1" />
              )}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Transactions
      </Button>
    </div>
  )
}

