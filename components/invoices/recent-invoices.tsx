import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const invoices = [
  {
    id: "INV-001",
    client: {
      name: "Acme Inc",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acme-logo.png",
    },
    amount: 1250.0,
    date: "2023-07-15",
    dueDate: "2023-08-15",
    status: "paid",
  },
  {
    id: "INV-002",
    client: {
      name: "Globex Corp",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globex-logo.png",
    },
    amount: 3500.0,
    date: "2023-07-10",
    dueDate: "2023-08-10",
    status: "pending",
  },
  {
    id: "INV-003",
    client: {
      name: "Stark Industries",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stark-logo.png",
    },
    amount: 5000.0,
    date: "2023-07-05",
    dueDate: "2023-08-05",
    status: "overdue",
  },
  {
    id: "INV-004",
    client: {
      name: "Wayne Enterprises",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wayne-logo.png",
    },
    amount: 2750.0,
    date: "2023-07-01",
    dueDate: "2023-08-01",
    status: "paid",
  },
  {
    id: "INV-005",
    client: {
      name: "Umbrella Corp",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/umbrella-logo.png",
    },
    amount: 1800.0,
    date: "2023-06-25",
    dueDate: "2023-07-25",
    status: "pending",
  },
]

export function RecentInvoices() {
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
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={invoice.client.avatar} alt={invoice.client.name} />
              <AvatarFallback>{invoice.client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{invoice.client.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{invoice.id}</p>
                <p className="text-xs text-muted-foreground">Due: {formatDate(invoice.dueDate)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">${invoice.amount.toFixed(2)}</p>
              <div>{getStatusBadge(invoice.status)}</div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Invoices
      </Button>
    </div>
  )
}

