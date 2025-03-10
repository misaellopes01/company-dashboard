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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus } from "lucide-react"

export function AddMemberDialog({ open, onOpenChange }) {
  const [memberDetails, setMemberDetails] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    avatar: "",
    sendInvite: true,
  })

  const handleChange = (field, value) => {
    setMemberDetails({
      ...memberDetails,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Member added:", memberDetails)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to your organization. They will receive an email invitation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                {memberDetails.avatar ? (
                  <AvatarImage src={memberDetails.avatar} alt="Avatar" />
                ) : (
                  <AvatarFallback className="bg-muted">
                    <UserPlus className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      handleChange("avatar", event.target?.result)
                    }
                    reader.readAsDataURL(e.target.files[0])
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={memberDetails.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={memberDetails.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={memberDetails.role} onValueChange={(value) => handleChange("role", value)} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={memberDetails.department}
                onValueChange={(value) => handleChange("department", value)}
                required
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="customer_support">Customer Support</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea id="notes" placeholder="Add any additional information about this team member..." />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="send-invite"
              checked={memberDetails.sendInvite}
              onCheckedChange={(checked) => handleChange("sendInvite", checked)}
            />
            <Label htmlFor="send-invite">Send email invitation</Label>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

