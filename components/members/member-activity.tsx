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

const activityData = [
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
    action: "created",
    target: "Project X",
    targetType: "project",
    date: "2023-07-15T14:30:00Z",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Manager",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    action: "updated",
    target: "Marketing Campaign",
    targetType: "project",
    date: "2023-07-14T10:15:00Z",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Member",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
    },
    action: "commented on",
    target: "Database Migration",
    targetType: "task",
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
    action: "completed",
    target: "Q3 Financial Report",
    targetType: "document",
    date: "2023-07-12T09:30:00Z",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Ethan Williams",
      email: "ethan@example.com",
      role: "Member",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    action: "joined",
    target: "Sales Department",
    targetType: "department",
    date: "2023-07-11T11:20:00Z",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Fiona Garcia",
      email: "fiona@example.com",
      role: "Member",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
    action: "uploaded",
    target: "Customer Feedback Results",
    targetType: "document",
    date: "2023-07-10T15:10:00Z",
  },
  {
    id: 7,
    user: {
      id: 7,
      name: "George Lee",
      email: "george@example.com",
      role: "Manager",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
    },
    action: "approved",
    target: "Budget Request",
    targetType: "request",
    date: "2023-07-09T13:45:00Z",
  },
  {
    id: 8,
    user: {
      id: 8,
      name: "Hannah Kim",
      email: "hannah@example.com",
      role: "Member",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
    },
    action: "scheduled",
    target: "Team Meeting",
    targetType: "event",
    date: "2023-07-08T10:30:00Z",
  },
]

export function MemberActivity({ searchTerm = "", filterRole = "all" }) {
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

  const filteredActivities = activityData
    .filter(
      (activity) =>
        (activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.target.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole === "all" || activity.user.role.toLowerCase() === filterRole.toLowerCase()),
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

  const getTargetTypeBadge = (type) => {
    switch (type) {
      case "project":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Project</Badge>
      case "task":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Task</Badge>
      case "document":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Document</Badge>
      case "department":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Department</Badge>
        )
      case "request":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Request</Badge>
      case "event":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Event</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
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
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Date & Time
              {sortColumn === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredActivities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No activity found
              </TableCell>
            </TableRow>
          ) : (
            filteredActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activity.user.name}</div>
                      <div className="text-xs text-muted-foreground">{activity.user.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{activity.action}</TableCell>
                <TableCell>{activity.target}</TableCell>
                <TableCell>{getTargetTypeBadge(activity.targetType)}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(activity.date)}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatTime(activity.date)}
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
  )
}

