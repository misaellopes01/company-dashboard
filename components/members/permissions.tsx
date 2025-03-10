"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const permissionsData = [
  {
    id: 1,
    resource: "Dashboard",
    description: "Access to view dashboard and analytics",
    admin: true,
    manager: true,
    member: true,
    guest: true,
  },
  {
    id: 2,
    resource: "Projects",
    description: "Access to view and manage projects",
    admin: true,
    manager: true,
    member: true,
    guest: false,
  },
  {
    id: 3,
    resource: "Invoices",
    description: "Access to view and manage invoices",
    admin: true,
    manager: true,
    member: false,
    guest: false,
  },
  {
    id: 4,
    resource: "Payments",
    description: "Access to view and manage payments",
    admin: true,
    manager: true,
    member: false,
    guest: false,
  },
  {
    id: 5,
    resource: "Members",
    description: "Access to view and manage team members",
    admin: true,
    manager: false,
    member: false,
    guest: false,
  },
  {
    id: 6,
    resource: "Settings",
    description: "Access to view and change system settings",
    admin: true,
    manager: false,
    member: false,
    guest: false,
  },
  {
    id: 7,
    resource: "Reports",
    description: "Access to view and generate reports",
    admin: true,
    manager: true,
    member: true,
    guest: false,
  },
  {
    id: 8,
    resource: "API Access",
    description: "Access to use API endpoints",
    admin: true,
    manager: true,
    member: false,
    guest: false,
  },
]

export function Permissions() {
  const [permissions, setPermissions] = useState(permissionsData)
  const [selectedRole, setSelectedRole] = useState("all")

  const handlePermissionChange = (resourceId, role, value) => {
    setPermissions(
      permissions.map((permission) => {
        if (permission.id === resourceId) {
          return {
            ...permission,
            [role]: value,
          }
        }
        return permission
      }),
    )
  }

  const filteredPermissions =
    selectedRole === "all" ? permissions : permissions.filter((permission) => permission[selectedRole] !== undefined)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Role Permissions</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure access permissions for each role</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="guest">Guest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Resource</TableHead>
              <TableHead className="w-[300px]">Description</TableHead>
              {(selectedRole === "all" || selectedRole === "admin") && (
                <TableHead className="text-center">
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
                </TableHead>
              )}
              {(selectedRole === "all" || selectedRole === "manager") && (
                <TableHead className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Manager</Badge>
                </TableHead>
              )}
              {(selectedRole === "all" || selectedRole === "member") && (
                <TableHead className="text-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Member</Badge>
                </TableHead>
              )}
              {(selectedRole === "all" || selectedRole === "guest") && (
                <TableHead className="text-center">
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Guest</Badge>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.resource}</TableCell>
                <TableCell>{permission.description}</TableCell>
                {(selectedRole === "all" || selectedRole === "admin") && (
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={permission.admin}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, "admin", checked)}
                        disabled={permission.resource === "Dashboard"} // Always enabled for admin
                      />
                    </div>
                  </TableCell>
                )}
                {(selectedRole === "all" || selectedRole === "manager") && (
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={permission.manager}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, "manager", checked)}
                      />
                    </div>
                  </TableCell>
                )}
                {(selectedRole === "all" || selectedRole === "member") && (
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={permission.member}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, "member", checked)}
                      />
                    </div>
                  </TableCell>
                )}
                {(selectedRole === "all" || selectedRole === "guest") && (
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={permission.guest}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, "guest", checked)}
                      />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

