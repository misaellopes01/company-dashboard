"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRangePicker } from "@/components/date-range-picker"

const auditData = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "updated",
    target: "Manager Role",
    targetType: "role",
    details: "Added write access to Invoices",
    date: "2023-07-15T14:30:00Z",
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "created",
    target: "Analyst Role",
    targetType: "role",
    details: "Created new role with read-only access",
    date: "2023-07-14T10:15:00Z",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "granted",
    target: "Bob Smith",
    targetType: "user",
    details: "Granted custom access to Payments",
    date: "2023-07-13T16:45:00Z",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Diana Martinez",
      email: "diana@example.com",
      role: "Manager",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    action: "updated",
    target: "Finance Role",
    targetType: "role",
    details: "Modified access to financial reports",
    date: "2023-07-12T09:30:00Z",
  },
  {
    id: 5,
    user: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "revoked",
    target: "Fiona Garcia",
    targetType: "user",
    details: "Revoked access to Member settings",
    date: "2023-07-11T11:20:00Z",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Fiona Garcia",
      email: "fiona@example.com",
      role: "Analyst",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
    action: "modified",
    target: "Support Role",
    targetType: "role",
    details: "Added access to customer data",
    date: "2023-07-10T15:10:00Z",
  },
  {
    id: 7,
    user: {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "deleted",
    target: "Temporary Role",
    targetType: "role",
    details: "Removed unused role",
    date: "2023-07-09T13:45:00Z",
  },
  {
    id: 8,
    user: {
      id: 4,
      name: "Diana Martinez",
      email: "diana@example.com",
      role: "Manager",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    action: "assigned",
    target: "Hannah Kim",
    targetType: "user",
    details: "Assigned to Support role",
    date: "2023-07-08T10:30:00Z",
  },
]

export function PermissionAudit({ searchTerm = "" }) {
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

  const filteredAudit = auditData
    .filter(
      (entry) =>
        entry.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortColumn === "date") {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate
      }

      const aValue = sortColumn === "user" ? a.user.name : a[sortColumn]
      const bValue = sortColumn === "user" ? b.user.name : b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  const getActionBadge = (action) => {
    switch (action) {
      case "created":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Created</Badge>
      case "updated":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Updated</Badge>
      case "deleted":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Deleted</Badge>
      case "granted":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Granted</Badge>
      case "revoked":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Revoked</Badge>
      case "assigned":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Assigned</Badge>
      case "modified":
        return <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">Modified</Badge>
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  const getTargetTypeBadge = (type) => {
    switch (type) {
      case "role":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Role</Badge>
      case "user":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">User</Badge>
      case "resource":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resource</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DateRangePicker className="w-auto" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("user")}>
                User
                {sortColumn === "user" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("action")}>
                Action
                {sortColumn === "action" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("target")}>
                Target
                {sortColumn === "target" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("targetType")}>
                Type
                {sortColumn === "targetType" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date & Time
                {sortColumn === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAudit.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No audit records found
                </TableCell>
              </TableRow>
            ) : (
              filteredAudit.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{entry.user.name}</div>
                        <div className="text-xs text-muted-foreground">{entry.user.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(entry.action)}</TableCell>
                  <TableCell>{entry.target}</TableCell>
                  <TableCell>{getTargetTypeBadge(entry.targetType)}</TableCell>
                  <TableCell>{entry.details}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(entry.date)}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTime(entry.date)}
                      </div>
                    </div>
                  </TableCell>
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

