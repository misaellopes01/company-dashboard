"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PermissionsOverview } from "@/components/permissions/permissions-overview"
import { RolePermissions } from "@/components/permissions/role-permissions"
import { UserPermissions } from "@/components/permissions/user-permissions"
import { PermissionAudit } from "@/components/permissions/permission-audit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateRoleDialog } from "@/components/permissions/create-role-dialog"

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showCreateRole, setShowCreateRole] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowCreateRole(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search permissions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="role">Role-based</SelectItem>
              <SelectItem value="user">User-specific</SelectItem>
              <SelectItem value="resource">Resource-based</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Role Permissions</TabsTrigger>
          <TabsTrigger value="users">User Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PermissionsOverview />
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <RolePermissions searchTerm={searchTerm} filterType={filterType} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User-Specific Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <UserPermissions searchTerm={searchTerm} filterType={filterType} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <PermissionAudit searchTerm={searchTerm} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateRoleDialog open={showCreateRole} onOpenChange={setShowCreateRole} />
    </div>
  )
}

