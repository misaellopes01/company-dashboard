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
import { Edit, Eye, MoreHorizontal, RotateCcw } from "lucide-react"

const usersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    department: "Executive",
    customPermissions: true,
    lastUpdated: "2023-07-15",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Manager",
    department: "Marketing",
    customPermissions: true,
    lastUpdated: "2023-06-20",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Member",
    department: "Engineering",
    customPermissions: false,
    lastUpdated: "2023-05-10",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: 4,
    name: "Diana Martinez",
    email: "diana@example.com",
    role: "Manager",
    department: "Product",
    customPermissions: true,
    lastUpdated: "2023-07-05",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: 5,
    name: "Ethan Williams",
    email: "ethan@example.com",
    role: "Member",
    department: "Sales",
    customPermissions: false,
    lastUpdated: "2023-04-15",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
  {
    id: 6,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    role: "Analyst",
    department: "Finance",
    customPermissions: true,
    lastUpdated: "2023-07-10",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  },
  {
    id: 7,
    name: "George Lee",
    email: "george@example.com",
    role: "Finance",
    department: "Finance",
    customPermissions: true,
    lastUpdated: "2023-06-25",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  },
  {
    id: 8,
    name: "Hannah Kim",
    email: "hannah@example.com",
    role: "Support",
    department: "Customer Support",
    customPermissions: true,
    lastUpdated: "2023-07-01",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  },
]

export function UserPermissions({ searchTerm = "", filterType = "all" }) {
  const [users, setUsers] = useState(usersData)
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredUsers = users
    .filter(
      (user) =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === "all" ||
          (filterType === "user" && true) ||
          (filterType === "custom" && user.customPermissions)),
    )
    .sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
      case "Manager":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Manager</Badge>
      case "Member":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Member</Badge>
      case "Guest":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Guest</Badge>
      case "Analyst":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Analyst</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              User
              {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
              Role
              {sortColumn === "role" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
              Department
              {sortColumn === "department" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Custom Permissions</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("lastUpdated")}>
              Last Updated
              {sortColumn === "lastUpdated" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  {user.customPermissions ? (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(user.lastUpdated)}</TableCell>
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
                        View Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Permissions
                      </DropdownMenuItem>
                      {user.customPermissions && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset to Role Default
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
    </div>
  )
}

