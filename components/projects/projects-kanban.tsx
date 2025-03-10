"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with new branding",
    progress: 75,
    status: "In Progress",
    priority: "High",
    dueDate: "Nov 15, 2023",
    assignedTo: {
      name: "Alice Johnson",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Develop a new mobile app for customers",
    progress: 45,
    status: "In Progress",
    priority: "Medium",
    dueDate: "Dec 20, 2023",
    assignedTo: {
      name: "Bob Smith",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for new product launch",
    progress: 90,
    status: "Almost Complete",
    priority: "High",
    dueDate: "Nov 5, 2023",
    assignedTo: {
      name: "Charlie Brown",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
    },
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate from legacy database to new cloud solution",
    progress: 30,
    status: "In Progress",
    priority: "Critical",
    dueDate: "Jan 15, 2024",
    assignedTo: {
      name: "Diana Martinez",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
  },
  {
    id: 5,
    name: "Product Launch",
    description: "Launch new financial product suite",
    progress: 60,
    status: "In Progress",
    priority: "High",
    dueDate: "Feb 1, 2024",
    assignedTo: {
      name: "Ethan Williams",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
  },
  {
    id: 6,
    name: "Security Audit",
    description: "Comprehensive security audit of all systems",
    progress: 100,
    status: "Completed",
    priority: "Critical",
    dueDate: "Oct 30, 2023",
    assignedTo: {
      name: "Fiona Garcia",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
  },
  {
    id: 7,
    name: "Customer Feedback System",
    description: "Implement new customer feedback collection system",
    progress: 15,
    status: "At Risk",
    priority: "Medium",
    dueDate: "Dec 10, 2023",
    assignedTo: {
      name: "George Lee",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
    },
  },
  {
    id: 8,
    name: "Employee Training Program",
    description: "Develop new employee onboarding and training program",
    progress: 0,
    status: "Not Started",
    priority: "Low",
    dueDate: "Mar 1, 2024",
    assignedTo: {
      name: "Hannah Kim",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
    },
  },
]

// Sortable item component
function SortableItem({ project }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3 cursor-grab active:cursor-grabbing"
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{project.name}</h4>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
          <div className="flex items-center justify-between text-sm mb-3">
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{project.dueDate}</span>
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>
          <div className="flex items-center justify-between">
            <Avatar className="h-8 w-8">
              <AvatarImage src={project.assignedTo.avatar} alt={project.assignedTo.name} />
              <AvatarFallback>{project.assignedTo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="h-8">
              <Clock className="mr-2 h-3 w-3" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProjectsKanban({ searchTerm = "", filterStatus = "all" }) {
  const [projects, setProjects] = useState(initialProjects)

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || project.status.toLowerCase().replace(/\s+/g, "-") === filterStatus),
  )

  // Group projects by status
  const notStarted = filteredProjects.filter((p) => p.status === "Not Started")
  const inProgress = filteredProjects.filter((p) => p.status === "In Progress")
  const atRisk = filteredProjects.filter((p) => p.status === "At Risk")
  const almostComplete = filteredProjects.filter((p) => p.status === "Almost Complete")
  const completed = filteredProjects.filter((p) => p.status === "Completed")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-muted/40 rounded-lg p-4">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Not Started
          <Badge variant="outline">{notStarted.length}</Badge>
        </h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={notStarted.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {notStarted.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-muted/40 rounded-lg p-4">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          In Progress
          <Badge variant="outline">{inProgress.length}</Badge>
        </h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={inProgress.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {inProgress.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-muted/40 rounded-lg p-4">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          At Risk
          <Badge variant="outline">{atRisk.length}</Badge>
        </h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={atRisk.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {atRisk.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-muted/40 rounded-lg p-4">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Almost Complete
          <Badge variant="outline">{almostComplete.length}</Badge>
        </h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={almostComplete.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {almostComplete.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <div className="bg-muted/40 rounded-lg p-4">
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Completed
          <Badge variant="outline">{completed.length}</Badge>
        </h3>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={completed.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {completed.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

