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
import { ArrowDownRight, ArrowUpRight, Eye, FileEdit, MoreHorizontal, Trash } from "lucide-react"

const transactionsData = [
  {
    id: 1,
    description: "Amazon.com",
    category: "Shopping",
    amount: -129.99,
    date: "2023-07-15",
    type: "expense",
    status: "completed",
    account: "Credit Card",
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
    account: "Checking Account",
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
    account: "Credit Card",
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
    account: "Credit Card",
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
    account: "Checking Account",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freelance-logo.png",
  },
  {
    id: 6,
    description: "Gas Station",
    category: "Transportation",
    amount: -45.5,
    date: "2023-07-18",
    type: "expense",
    status: "completed",
    account: "Credit Card",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gas-logo.png",
  },
  {
    id: 7,
    description: "Uber Ride",
    category: "Transportation",
    amount: -24.5,
    date: "2023-07-16",
    type: "expense",
    status: "pending",
    account: "Credit Card",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uber-logo.png",
  },
  {
    id: 8,
    description: "Client Payment",
    category: "Income",
    amount: 1200,
    date: "2023-07-18",
    type: "income",
    status: "pending",
    account: "Checking Account",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/client-logo.png",
  },
  {
    id: 9,
    description: "Office Supplies",
    category: "Business",
    amount: -78.35,
    date: "2023-07-17",
    type: "expense",
    status: "pending",
    account: "Credit Card",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/office-logo.png",
  },
  {
    id: 10,
    description: "Gym Membership",
    category: "Health & Fitness",
    amount: -50.0,
    date: "2023-07-03",
    type: "expense",
    status: "completed",
    account: "Checking Account",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gym-logo.png",
  },
]

export function TransactionsList({ searchTerm = "", filterType = "all" }) {
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

  const filteredTransactions = transactionsData
    .filter(
      (transaction) =>
        (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === "all" || transaction.type === filterType),
    )
    .sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (sortColumn === "amount") {
        // For amount, we want to sort by absolute value
        return sortDirection === "asc" ? Math.abs(aValue) - Math.abs(bValue) : Math.abs(bValue) - Math.abs(aValue)
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
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("description")}>
              Description
              {sortColumn === "description" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category
              {sortColumn === "category" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
              Amount
              {sortColumn === "amount" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Date
              {sortColumn === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={transaction.icon} alt={transaction.description} />
                      <AvatarFallback>{transaction.description.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{transaction.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{transaction.category}</Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`flex items-center ${
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
                </TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>{transaction.account}</TableCell>
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
                        Edit Transaction
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Transaction
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

