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
import { Eye, FileEdit, MoreHorizontal, Printer, Send, Trash } from "lucide-react"

const invoicesData = [
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
  {
    id: "INV-006",
    client: {
      name: "Cyberdyne Systems",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cyberdyne-logo.png",
    },
    amount: 3200.0,
    date: "2023-06-20",
    dueDate: "2023-07-20",
    status: "overdue",
  },
  {
    id: "INV-007",
    client: {
      name: "Initech",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/initech-logo.png",
    },
    amount: 1500.0,
    date: "2023-06-15",
    dueDate: "2023-07-15",
    status: "paid",
  },
  {
    id: "INV-008",
    client: {
      name: "Massive Dynamic",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/massive-logo.png",
    },
    amount: 4200.0,
    date: "2023-06-10",
    dueDate: "2023-07-10",
    status: "draft",
  },
]

export function InvoicesList({ searchTerm = "", filterStatus = "all" }) {
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

  const filteredInvoices = invoicesData
    .filter(
      (invoice) =>
        (invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || invoice.status === filterStatus),
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Invoice
              {sortColumn === "id" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("client")}>
              Client
              {sortColumn === "client" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
              Amount
              {sortColumn === "amount" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Date
              {sortColumn === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
              Due Date
              {sortColumn === "dueDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={invoice.client.avatar} alt={invoice.client.name} />
                      <AvatarFallback>{invoice.client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{invoice.client.name}</span>
                  </div>
                </TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{formatDate(invoice.date)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
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
                        View Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Invoice
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

