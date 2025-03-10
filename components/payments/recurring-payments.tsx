"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Edit, MoreHorizontal, Pause, Play, Trash } from "lucide-react"

const recurringPaymentsData = [
  {
    id: "REC-001",
    description: "Netflix Subscription",
    amount: 15.99,
    frequency: "monthly",
    nextDate: "2023-08-10",
    status: "active",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "REC-002",
    description: "Adobe Creative Cloud",
    amount: 52.99,
    frequency: "monthly",
    nextDate: "2023-08-15",
    status: "active",
    paymentMethod: "Mastercard •••• 5555",
  },
  {
    id: "REC-003",
    description: "Office Rent",
    amount: 1500.0,
    frequency: "monthly",
    nextDate: "2023-08-01",
    status: "active",
    paymentMethod: "Bank Transfer •••• 6789",
  },
  {
    id: "REC-004",
    description: "Internet Service",
    amount: 79.99,
    frequency: "monthly",
    nextDate: "2023-08-05",
    status: "active",
    paymentMethod: "American Express •••• 1234",
  },
  {
    id: "REC-005",
    description: "Gym Membership",
    amount: 45.0,
    frequency: "monthly",
    nextDate: "2023-08-20",
    status: "paused",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "REC-006",
    description: "Cloud Storage",
    amount: 9.99,
    frequency: "monthly",
    nextDate: "2023-08-12",
    status: "active",
    paymentMethod: "PayPal",
  },
  {
    id: "REC-007",
    description: "Domain Renewal",
    amount: 14.99,
    frequency: "yearly",
    nextDate: "2024-01-15",
    status: "active",
    paymentMethod: "Mastercard •••• 5555",
  },
]

export function RecurringPayments() {
  const [payments, setPayments] = useState(recurringPaymentsData)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [paymentToCancel, setPaymentToCancel] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Paused</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleToggleStatus = (id) => {
    setPayments(
      payments.map((payment) => {
        if (payment.id === id) {
          return {
            ...payment,
            status: payment.status === "active" ? "paused" : "active",
          }
        }
        return payment
      }),
    )
  }

  const handleCancel = (id) => {
    setPaymentToCancel(id)
    setCancelDialogOpen(true)
  }

  const confirmCancel = () => {
    setPayments(
      payments.map((payment) => {
        if (payment.id === paymentToCancel) {
          return {
            ...payment,
            status: "cancelled",
          }
        }
        return payment
      }),
    )
    setCancelDialogOpen(false)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Next Payment</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No recurring payments found
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.description}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell className="capitalize">{payment.frequency}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(payment.nextDate)}</span>
                  </div>
                </TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {payment.status !== "cancelled" && (
                        <>
                          <DropdownMenuItem onClick={() => handleToggleStatus(payment.id)}>
                            {payment.status === "active" ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Resume
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleCancel(payment.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Cancel
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Recurring Payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel this recurring payment. You can set up a new recurring payment later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Payment</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
              Cancel Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

