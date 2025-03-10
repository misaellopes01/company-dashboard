import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const payments = [
  {
    id: "PAY-001",
    description: "Invoice #INV-001",
    amount: 1250.0,
    date: "2023-07-15",
    status: "completed",
    method: {
      type: "credit_card",
      last4: "4242",
      brand: "Visa",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa-logo.png",
    },
  },
  {
    id: "PAY-002",
    description: "Invoice #INV-002",
    amount: 3500.0,
    date: "2023-07-10",
    status: "completed",
    method: {
      type: "credit_card",
      last4: "5555",
      brand: "Mastercard",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mastercard-logo.png",
    },
  },
  {
    id: "PAY-003",
    description: "Invoice #INV-003",
    amount: 5000.0,
    date: "2023-07-05",
    status: "failed",
    method: {
      type: "credit_card",
      last4: "1234",
      brand: "American Express",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amex-logo.png",
    },
  },
  {
    id: "PAY-004",
    description: "Invoice #INV-004",
    amount: 2750.0,
    date: "2023-07-01",
    status: "completed",
    method: {
      type: "bank_transfer",
      last4: "6789",
      brand: "Bank Transfer",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bank-logo.png",
    },
  },
  {
    id: "PAY-005",
    description: "Invoice #INV-005",
    amount: 1800.0,
    date: "2023-06-25",
    status: "pending",
    method: {
      type: "paypal",
      last4: "",
      brand: "PayPal",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paypal-logo.png",
    },
  },
]

export function RecentPayments() {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>
      case "refunded":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={payment.method.icon} alt={payment.method.brand} />
              <AvatarFallback>{payment.method.brand.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{payment.description}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{formatDate(payment.date)}</p>
                <p className="text-xs text-muted-foreground">
                  {payment.method.brand} {payment.method.last4 ? `•••• ${payment.method.last4}` : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">${payment.amount.toFixed(2)}</p>
              <div>{getStatusBadge(payment.status)}</div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Payments
      </Button>
    </div>
  )
}

