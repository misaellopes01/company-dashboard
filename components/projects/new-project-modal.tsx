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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"

export function NewProjectModal({ isOpen, onClose }) {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    priority: "",
    status: "not-started",
    budget: "",
    team: [],
  })
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const handleChange = (field, value) => {
    setProjectDetails({
      ...projectDetails,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Project created:", projectDetails)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={projectDetails.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={projectDetails.status} onValueChange={(value) => handleChange("status", value)} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={projectDetails.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !projectDetails.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {projectDetails.startDate ? format(projectDetails.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={projectDetails.startDate}
                    onSelect={(date) => {
                      handleChange("startDate", date)
                      setStartDateOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !projectDetails.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {projectDetails.endDate ? format(projectDetails.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={projectDetails.endDate}
                    onSelect={(date) => {
                      handleChange("endDate", date)
                      setEndDateOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={projectDetails.priority}
                onValueChange={(value) => handleChange("priority", value)}
                required
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter budget amount"
                value={projectDetails.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="flex flex-wrap gap-2 border rounded-md p-2">
              {projectDetails.team.length === 0 ? (
                <span className="text-sm text-muted-foreground p-1">No team members added</span>
              ) : (
                projectDetails.team.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {member}
                    <button
                      type="button"
                      className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                      onClick={() => {
                        const newTeam = [...projectDetails.team]
                        newTeam.splice(index, 1)
                        handleChange("team", newTeam)
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  // In a real app, you'd show a member selection UI here
                  const demoMembers = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Martinez"]
                  const availableMembers = demoMembers.filter((m) => !projectDetails.team.includes(m))
                  if (availableMembers.length > 0) {
                    handleChange("team", [...projectDetails.team, availableMembers[0]])
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Member
              </Button>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

