"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with new branding",
    progress: 75,
    status: "In Progress",
    priority: "High",
    startDate: new Date(2023, 10, 1), // Nov 1, 2023
    dueDate: new Date(2023, 10, 15), // Nov 15, 2023
    assignedTo: {
      name: "Alice Johnson",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    team: [
      {
        name: "Alice Johnson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      },
      {
        name: "Bob Smith",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Develop a new mobile app for customers",
    progress: 45,
    status: "In Progress",
    priority: "Medium",
    startDate: new Date(2023, 10, 10), // Nov 10, 2023
    dueDate: new Date(2023, 11, 20), // Dec 20, 2023
    assignedTo: {
      name: "Bob Smith",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    team: [
      {
        name: "Charlie Brown",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      },
      {
        name: "Diana Martinez",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for new product launch",
    progress: 90,
    status: "Almost Complete",
    priority: "High",
    startDate: new Date(2023, 9, 15), // Oct 15, 2023
    dueDate: new Date(2023, 10, 5), // Nov 5, 2023
    assignedTo: {
      name: "Charlie Brown",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
    },
    team: [
      {
        name: "Fiona Garcia",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        name: "George Lee",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate from legacy database to new cloud solution",
    progress: 30,
    status: "In Progress",
    priority: "Critical",
    startDate: new Date(2023, 11, 1), // Dec 1, 2023
    dueDate: new Date(2024, 0, 15), // Jan 15, 2024
    assignedTo: {
      name: "Diana Martinez",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    team: [
      {
        name: "Diana Martinez",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      },
      {
        name: "Ethan Williams",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
    ],
  },
]

export function ProjectsCalendar({ searchTerm = "", filterStatus = "all" }) {
  const [date, setDate] = useState(new Date())
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = projectsData.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || project.status.toLowerCase().replace(/\s+/g, "-") === filterStatus),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Almost Complete":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "At Risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  // Function to check if a date has projects
  const hasProjects = (day) => {
    return filteredProjects.some((project) => {
      const projectStartDate = new Date(project.startDate)
      const projectDueDate = new Date(project.dueDate)

      return day >= projectStartDate && day <= projectDueDate
    })
  }

  // Function to get projects for a specific date
  const getProjectsForDate = (day) => {
    return filteredProjects.filter((project) => {
      const projectStartDate = new Date(project.startDate)
      const projectDueDate = new Date(project.dueDate)

      return day >= projectStartDate && day <= projectDueDate
    })
  }

  // Custom day render function
  const renderDay = (day, selectedDay, isDisabled) => {
    if (!day) return null

    const hasProjectsToday = hasProjects(day)

    return (
      <div
        className={`relative p-0 w-full h-full flex items-center justify-center ${hasProjectsToday ? "font-bold" : ""}`}
      >
        {day.getDate()}
        {hasProjectsToday && <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>}
      </div>
    )
  }

  // Handle day click
  const handleDayClick = (day) => {
    const projectsForDay = getProjectsForDate(day)
    if (projectsForDay.length > 0) {
      setSelectedProject(projectsForDay[0])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate)
                handleDayClick(newDate)
              }
            }}
            className="rounded-md border"
            components={{
              Day: renderDay,
            }}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-medium mb-4">
            Projects for {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </h3>
          <div className="space-y-4">
            {getProjectsForDate(date).length === 0 ? (
              <p className="text-muted-foreground">No projects scheduled for this date.</p>
            ) : (
              getProjectsForDate(date).map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {project.dueDate.toLocaleDateString()}</span>
                      </div>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
                <Badge className={getPriorityColor(selectedProject.priority)}>{selectedProject.priority}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">{selectedProject.startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-muted-foreground">{selectedProject.dueDate.toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Progress</p>
                <div className="flex items-center gap-2">
                  <Progress value={selectedProject.progress} className="flex-1 h-2" />
                  <span className="text-sm">{selectedProject.progress}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Project Lead</p>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={selectedProject.assignedTo.avatar} alt={selectedProject.assignedTo.name} />
                    <AvatarFallback>{selectedProject.assignedTo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedProject.assignedTo.name}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Team Members</p>
                <div className="flex items-center gap-2">
                  {selectedProject.team.map((member, index) => (
                    <Avatar key={index}>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setSelectedProject(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

