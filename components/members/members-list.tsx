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
import { Eye, FileEdit, MoreHorizontal, ShieldAlert, UserMinus } from "lucide-react"

const membersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    department: "Executive",
    joinDate: "2022-01-15",
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Manager",
    department: "Marketing",
    joinDate: "2022-02-20",
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Member",
    department: "Engineering",
    joinDate: "2022-03-10",
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: 4,
    name: "Diana Martinez",
    email: "diana@example.com",
    role: "Manager",
    department: "Product",
    joinDate: "2022-04-05",
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: 5,
    name: "Ethan Williams",
    email: "ethan@example.com",
    role: "Member",
    department: "Sales",
    joinDate: "2022-05-15",
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
  {
    id: 6,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    role: "Member",
    department: "Customer Support",
    joinDate: "2022-06-20",
    status: "inactive",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  },
  {
    id: 7,
    name: "George Lee",
    email: "george@example.com",
    role: "Manager",
    department: "Finance",
    joinDate: "2022-07-10",
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  },
  {
    id: 8,
    name: "Hannah Kim",
    email: "hannah@example.com",
    role: "Member",
    department: "HR",
    joinDate: "2022-08-05",
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  },
  {
    id: 9,
    name: "Ian Foster",
    email: "ian@example.com",
    role: "Guest",
    department: "Marketing",
    joinDate: "2022-09-15",
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
  },
  {
    id: 10,
    name: "Julia Chen",
    email: "julia@example.com",
    role: "Member",
    department: "Engineering",
    joinDate: "2022-10-20",
    status: "inactive",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  },
]

export function MembersList({ searchTerm = "", filterRole = "all" }) {
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState(null)

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredMembers = membersData
    .filter(
      (member) =>
        (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole === "all" || member.role.toLowerCase() === filterRole.toLowerCase()),
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const handleRemoveMember = (id) => {
    setMemberToRemove(id)
    setRemoveDialogOpen(true)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name
              {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
              Email
              {sortColumn === "email" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
              Role
              {sortColumn === "role" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
              Department
              {sortColumn === "department" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("joinDate")}>
              Join Date
              {sortColumn === "joinDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No members found
              </TableCell>
            </TableRow>
          ) : (
            filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{getRoleBadge(member.role)}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{formatDate(member.joinDate)}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Member
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Manage Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleRemoveMember(member.id)}>
                        <UserMinus className="mr-2 h-4 w-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this member from your organization. They will lose access to all resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">Remove Member</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

