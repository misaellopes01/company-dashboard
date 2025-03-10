"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, FileEdit, MoreHorizontal, ReceiptIcon as ReceiptRefund, Trash } from "lucide-react"

const paymentsData = [
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
  {
    id: "PAY-006",
    description: "Invoice #INV-006",
    amount: 3200.0,
    date: "2023-06-20",
    status: "refunded",
    method: {
      type: "credit_card",
      last4: "9876",
      brand: "Visa",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa-logo.png",
    },
  },
  {
    id: "PAY-007",
    description: "Invoice #INV-007",
    amount: 1500.0,
    date: "2023-06-15",
    status: "completed",
    method: {
      type: "credit_card",
      last4: "1111",
      brand: "Mastercard",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mastercard-logo.png",
    },
  },
  {
    id: "PAY-008",
    description: "Invoice #INV-008",
    amount: 4200.0,
    date: "2023-06-10",
    status: "pending",
    method: {
      type: "bank_transfer",
      last4: "5432",
      brand: "Bank Transfer",
      icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bank-logo.png",
    },
  },
]

export function PaymentsList({ searchTerm = "", filterStatus = "all" }) {
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredPayments = paymentsData
    .filter(
      (payment) =>
        (payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || payment.status === filterStatus),
    )
    .sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (sortColumn === "amount") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Payment ID
              {sortColumn === "id" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("description")}>
              Description
              {sortColumn === "description" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
              Amount
              {sortColumn === "amount" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Date
              {sortColumn === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No payments found
              </TableCell>
            </TableRow>
          ) : (
            filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={payment.method.icon} alt={payment.method.brand} />
                      <AvatarFallback>{payment.method.brand.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>
                      {payment.method.brand} {payment.method.last4 ? `•••• ${payment.method.last4}` : ""}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Payment
                      </DropdownMenuItem>
                      {payment.status === "completed" && (
                        <DropdownMenuItem>
                          <ReceiptRefund className="mr-2 h-4 w-4" />
                          Refund Payment
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

