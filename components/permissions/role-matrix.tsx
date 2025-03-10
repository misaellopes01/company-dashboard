"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const roleMatrixData = [
  {
    id: 1,
    resource: "Dashboard",
    description: "Access to view dashboard and analytics",
    admin: { read: true, write: true, delete: true },
    manager: { read: true, write: true, delete: false },
    member: { read: true, write: false, delete: false },
    guest: { read: true, write: false, delete: false },
    analyst: { read: true, write: false, delete: false },
  },
  {
    id: 2,
    resource: "Projects",
    description: "Access to view and manage projects",
    admin: { read: true, write: true, delete: true },
    manager: { read: true, write: true, delete: false },
    member: { read: true, write: true, delete: false },
    guest: { read: false, write: false, delete: false },
    analyst: { read: true, write: false, delete: false },
  },
  {
    id: 3,
    resource: "Invoices",
    description: "Access to view and manage invoices",
    admin: { read: true, write: true, delete: true },
    manager: { read: true, write: true, delete: false },
    member: { read: false, write: false, delete: false },
    guest: { read: false, write: false, delete: false },
    analyst: { read: true, write: false, delete: false },
  },
  {
    id: 4,
    resource: "Payments",
    description: "Access to view and manage payments",
    admin: { read: true, write: true, delete: true },
    manager: { read: true, write: true, delete: false },
    member: { read: false, write: false, delete: false },
    guest: { read: false, write: false, delete: false },
    analyst: { read: true, write: false, delete: false },
  },
  {
    id: 5,
    resource: "Members",
    description: "Access to view and manage team members",
    admin: { read: true, write: true, delete: true },
    manager: { read: false, write: false, delete: false },
    member: { read: false, write: false, delete: false },
    guest: { read: false, write: false, delete: false },
    analyst: { read: true, write: false, delete: false },
  },
]

export function RoleMatrix() {
  const [matrix, setMatrix] = useState(roleMatrixData)
  const [viewMode, setViewMode] = useState("all")

  const handlePermissionChange = (resourceId, role, permission, value) => {
    setMatrix(
      matrix.map((resource) => {
        if (resource.id === resourceId) {
          return {
            ...resource,
            [role]: {
              ...resource[role],
              [permission]: value,
            },
          }
        }
        return resource
      }),
    )
  }

  const getPermissionIcon = (hasPermission) => {
    return hasPermission ? (
      <div className="h-3 w-3 rounded-full bg-green-500 mx-auto" />
    ) : (
      <div className="h-3 w-3 rounded-full bg-red-500 mx-auto" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Role Access Matrix</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>View access permissions for each role and resource</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Permissions</SelectItem>
            <SelectItem value="read">Read Only</SelectItem>
            <SelectItem value="write">Write Only</SelectItem>
            <SelectItem value="delete">Delete Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Resource</TableHead>
              <TableHead className="text-center">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
              </TableHead>
              <TableHead className="text-center">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Manager</Badge>
              </TableHead>
              <TableHead className="text-center">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Member</Badge>
              </TableHead>
              <TableHead className="text-center">
                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Guest</Badge>
              </TableHead>
              <TableHead className="text-center">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Analyst</Badge>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matrix.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">
                  <div>
                    {resource.resource}
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                </TableCell>

                {/* Admin column */}
                <TableCell className="text-center">
                  {viewMode === "all" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">R</span>
                        <Switch
                          checked={resource.admin.read}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "admin", "read", checked)}
                          disabled={resource.resource === "Dashboard"} // Always enabled for admin
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">W</span>
                        <Switch
                          checked={resource.admin.write}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "admin", "write", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">D</span>
                        <Switch
                          checked={resource.admin.delete}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "admin", "delete", checked)}
                        />
                      </div>
                    </div>
                  ) : (
                    getPermissionIcon(resource.admin[viewMode])
                  )}
                </TableCell>

                {/* Manager column */}
                <TableCell className="text-center">
                  {viewMode === "all" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">R</span>
                        <Switch
                          checked={resource.manager.read}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "manager", "read", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">W</span>
                        <Switch
                          checked={resource.manager.write}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource.id, "manager", "write", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">D</span>
                        <Switch
                          checked={resource.manager.delete}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource.id, "manager", "delete", checked)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    getPermissionIcon(resource.manager[viewMode])
                  )}
                </TableCell>

                {/* Member column */}
                <TableCell className="text-center">
                  {viewMode === "all" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">R</span>
                        <Switch
                          checked={resource.member.read}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "member", "read", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">W</span>
                        <Switch
                          checked={resource.member.write}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "member", "write", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">D</span>
                        <Switch
                          checked={resource.member.delete}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource.id, "member", "delete", checked)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    getPermissionIcon(resource.member[viewMode])
                  )}
                </TableCell>

                {/* Guest column */}
                <TableCell className="text-center">
                  {viewMode === "all" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">R</span>
                        <Switch
                          checked={resource.guest.read}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "guest", "read", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">W</span>
                        <Switch
                          checked={resource.guest.write}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "guest", "write", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">D</span>
                        <Switch
                          checked={resource.guest.delete}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "guest", "delete", checked)}
                        />
                      </div>
                    </div>
                  ) : (
                    getPermissionIcon(resource.guest[viewMode])
                  )}
                </TableCell>

                {/* Analyst column */}
                <TableCell className="text-center">
                  {viewMode === "all" ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">R</span>
                        <Switch
                          checked={resource.analyst.read}
                          onCheckedChange={(checked) => handlePermissionChange(resource.id, "analyst", "read", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">W</span>
                        <Switch
                          checked={resource.analyst.write}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource.id, "analyst", "write", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs">D</span>
                        <Switch
                          checked={resource.analyst.delete}
                          onCheckedChange={(checked) =>
                            handlePermissionChange(resource.id, "analyst", "delete", checked)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    getPermissionIcon(resource.analyst[viewMode])
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

