"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Plus, CalendarIcon, CheckCircle2, AlertCircle, ArrowRight, CalendarDays } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with new branding",
    progress: 75,
    status: "In Progress",
    priority: "High",
    startDate: new Date(2025, 4, 1),
    dueDate: new Date(2025, 6, 15),
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
    startDate: new Date(2023, 10, 10),
    dueDate: new Date(2023, 11, 20),
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
    startDate: new Date(2023, 9, 15),
    dueDate: new Date(2023, 10, 5),
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
    startDate: new Date(2023, 11, 1),
    dueDate: new Date(2024, 0, 15),
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
  const [activeTab, setActiveTab] = useState("daily")

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Almost Complete":
        return <CheckCircle2 className="h-4 w-4 text-purple-500" />
      case "At Risk":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
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

  // Function to get projects for the current month
  const getProjectsForMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    return filteredProjects.filter((project) => {
      const projectStartDate = new Date(project.startDate)
      const projectDueDate = new Date(project.dueDate)

      return (
        (projectStartDate >= firstDay && projectStartDate <= lastDay) ||
        (projectDueDate >= firstDay && projectDueDate <= lastDay) ||
        (projectStartDate <= firstDay && projectDueDate >= lastDay)
      )
    })
  }

  // Function to get upcoming projects
  const getUpcomingProjects = () => {
    const today = new Date()
    return filteredProjects
      .filter((project) => {
        const projectStartDate = new Date(project.startDate)
        return projectStartDate > today
      })
      .sort((a, b) => a.startDate - b.startDate)
      .slice(0, 3)
  }

  // Render daily projects content
  const renderDailyContent = () => {
    const projectsForDay = getProjectsForDate(date)

    if (projectsForDay.length === 0) {
      return (
        <EmptyProjectsState
          title="No projects for this day"
          description="There are no projects scheduled for this date. View monthly projects or create a new one."
          icon={<CalendarDays className="h-12 w-12 text-muted-foreground/50" />}
          upcomingProjects={getUpcomingProjects()}
          onProjectClick={setSelectedProject}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )
    }

    return (
      <div className="space-y-4">
        {projectsForDay.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    )
  }

  // Render monthly projects content
  const renderMonthlyContent = () => {
    const projectsForMonth = getProjectsForMonth(date)

    if (projectsForMonth.length === 0) {
      return (
        <EmptyProjectsState
          title="No projects this month"
          description="There are no projects scheduled for this month. Try selecting a different month or create a new project."
          icon={<CalendarIcon className="h-12 w-12 text-muted-foreground/50" />}
          upcomingProjects={getUpcomingProjects()}
          onProjectClick={setSelectedProject}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )
    }

    return (
      <div className="space-y-4">
        {projectsForMonth.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPriorityColor={getPriorityColor}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view scheduled projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate)
                    setActiveTab("daily")
                    if (hasProjects(newDate)) {
                      const projectsForDay = getProjectsForDate(newDate)
                      if (projectsForDay.length > 0) {
                        setSelectedProject(projectsForDay[0])
                      }
                    }
                  }
                }}
                className="rounded-md"
                components={{
                  DayContent: (props) => {
                    // Get the date from props
                    const day = props.date
                    // Check if this day has projects
                    const dayHasProjects = hasProjects(day)

                    return (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {day.getDate()}
                        {dayHasProjects && <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>}
                      </div>
                    )
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-1/2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>
                    {activeTab === "daily"
                      ? `For ${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                      : `For ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
                  </CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-130px)] overflow-auto">
              {activeTab === "daily" ? renderDailyContent() : renderMonthlyContent()}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full" onClick={() => {}}>
                <Plus className="mr-2 h-4 w-4" /> Create New Project
              </Button>
            </CardFooter>
          </Card>
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
                    <AvatarImage
                      src={selectedProject.assignedTo.avatar || "/placeholder.svg"}
                      alt={selectedProject.assignedTo.name}
                    />
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
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
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

function EmptyProjectsState({
  title,
  description,
  icon,
  upcomingProjects,
  onProjectClick,
  getStatusColor,
  getStatusIcon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-3">{icon}</div>
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      <p className="mb-6 text-sm text-muted-foreground max-w-md">{description}</p>

      {upcomingProjects.length > 0 && (
        <div className="w-full">
          <h4 className="text-sm font-medium mb-3 text-left">Upcoming Projects</h4>
          <div className="space-y-3">
            {upcomingProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onProjectClick(project)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getStatusIcon(project.status)}</div>
                  <div>
                    <h5 className="font-medium text-sm">{project.name}</h5>
                    <p className="text-xs text-muted-foreground">Starts: {project.startDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, onClick, getStatusColor, getStatusIcon, getPriorityColor }) {
  return (
    <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-shrink-0">{getStatusIcon(project.status)}</div>
          <div className="flex-1">
            <h4 className="font-medium">{project.name}</h4>
          </div>
          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Due: {project.dueDate.toLocaleDateString()}</span>
          </div>
          <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {project.team.length > 3 && (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted border-2 border-background text-xs">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">Lead: {project.assignedTo.name}</div>
        </div>
      </CardContent>
    </Card>
  )
}
