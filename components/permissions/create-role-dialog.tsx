"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function CreateRoleDialog({ open, onOpenChange }) {
  const [roleDetails, setRoleDetails] = useState({
    name: "",
    description: "",
    copyFrom: "",
    permissions: {
      dashboard: { read: true, write: false, delete: false },
      projects: { read: true, write: false, delete: false },
      invoices: { read: true, write: false, delete: false },
      payments: { read: true, write: false, delete: false },
      members: { read: true, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
  })

  const handleChange = (field, value) => {
    setRoleDetails({
      ...roleDetails,
      [field]: value,
    })
  }

  const handlePermissionChange = (resource, permission, value) => {
    setRoleDetails({
      ...roleDetails,
      permissions: {
        ...roleDetails.permissions,
        [resource]: {
          ...roleDetails.permissions[resource],
          [permission]: value,
        },
      },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Role created:", roleDetails)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
            Create a new role with custom permissions. Roles define what users can access and modify in the system.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Role Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                placeholder="e.g., Project Manager"
                value={roleDetails.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Textarea
                id="role-description"
                placeholder="Describe the purpose and scope of this role..."
                value={roleDetails.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copy-from">Copy Permissions From (Optional)</Label>
              <Select value={roleDetails.copyFrom} onValueChange={(value) => handleChange("copyFrom", value)}>
                <SelectTrigger id="copy-from">
                  <SelectValue placeholder="Select an existing role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                This will copy all permissions from the selected role as a starting point.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Resource Permissions</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="select-all-read" />
                    <Label htmlFor="select-all-read" className="text-xs">
                      Read All
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="select-all-write" />
                    <Label htmlFor="select-all-write" className="text-xs">
                      Write All
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="select-all-delete" />
                    <Label htmlFor="select-all-delete" className="text-xs">
                      Delete All
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(roleDetails.permissions).map(([resource, permissions]) => (
                  <div key={resource} className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
                    <div className="font-medium capitalize">{resource}</div>
                    <div className="flex items-center justify-center gap-2">
                      <Label htmlFor={`${resource}-read`} className="text-xs">
                        Read
                      </Label>
                      <Switch
                        id={`${resource}-read`}
                        checked={permissions.read}
                        onCheckedChange={(checked) => handlePermissionChange(resource, "read", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Label htmlFor={`${resource}-write`} className="text-xs">
                        Write
                      </Label>
                      <Switch
                        id={`${resource}-write`}
                        checked={permissions.write}
                        onCheckedChange={(checked) => handlePermissionChange(resource, "write", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Label htmlFor={`${resource}-delete`} className="text-xs">
                        Delete
                      </Label>
                      <Switch
                        id={`${resource}-delete`}
                        checked={permissions.delete}
                        onCheckedChange={(checked) => handlePermissionChange(resource, "delete", checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

