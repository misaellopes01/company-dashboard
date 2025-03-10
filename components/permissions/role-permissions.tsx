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
import { Copy, Edit, Eye, MoreHorizontal, Trash, Users } from "lucide-react"

const rolesData = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 5,
    createdAt: "2022-01-15",
    updatedAt: "2023-06-20",
    isSystem: true,
  },
  {
    id: 2,
    name: "Manager",
    description: "Access to manage projects, invoices, and payments",
    userCount: 15,
    createdAt: "2022-01-15",
    updatedAt: "2023-05-10",
    isSystem: true,
  },
  {
    id: 3,
    name: "Member",
    description: "Standard access to view and edit assigned resources",
    userCount: 180,
    createdAt: "2022-01-15",
    updatedAt: "2023-04-05",
    isSystem: true,
  },
  {
    id: 4,
    name: "Guest",
    description: "Limited read-only access to specific resources",
    userCount: 48,
    createdAt: "2022-01-15",
    updatedAt: "2023-03-12",
    isSystem: true,
  },
  {
    id: 5,
    name: "Analyst",
    description: "Read access to all data for analysis purposes",
    userCount: 12,
    createdAt: "2023-02-10",
    updatedAt: "2023-07-15",
    isSystem: false,
  },
  {
    id: 6,
    name: "Finance",
    description: "Access to financial data and reports",
    userCount: 8,
    createdAt: "2023-03-05",
    updatedAt: "2023-06-30",
    isSystem: false,
  },
  {
    id: 7,
    name: "Support",
    description: "Access to customer data and support tools",
    userCount: 20,
    createdAt: "2023-04-15",
    updatedAt: "2023-07-01",
    isSystem: false,
  },
  {
    id: 8,
    name: "Auditor",
    description: "Read-only access to all system data for auditing",
    userCount: 3,
    createdAt: "2023-05-20",
    updatedAt: "2023-07-10",
    isSystem: false,
  },
]

export function RolePermissions({ searchTerm = "", filterType = "all" }) {
  const [roles, setRoles] = useState(rolesData)
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState(null)

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredRoles = roles
    .filter(
      (role) =>
        (role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === "all" ||
          (filterType === "role" && true) ||
          (filterType === "system" && role.isSystem) ||
          (filterType === "custom" && !role.isSystem)),
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

  const handleDeleteRole = (id) => {
    setRoleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== roleToDelete))
    setDeleteDialogOpen(false)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Role Name
              {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("description")}>
              Description
              {sortColumn === "description" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("userCount")}>
              Users
              {sortColumn === "userCount" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("updatedAt")}>
              Last Updated
              {sortColumn === "updatedAt" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRoles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No roles found
              </TableCell>
            </TableRow>
          ) : (
            filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{role.userCount}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(role.updatedAt)}</TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">System</Badge>
                  ) : (
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Custom
                    </Badge>
                  )}
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
                        View Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate Role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={role.isSystem}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this role and remove it from all assigned users. Users will be assigned to
              the default role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

