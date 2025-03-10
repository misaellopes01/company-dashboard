"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"

const projectsData = [
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

export function ProjectsList({ searchTerm = "", filterStatus = "all" }) {
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredProjects = projectsData
    .filter(
      (project) =>
        (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || project.status.toLowerCase().replace(/\s+/g, "-") === filterStatus),
    )
    .sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Project Name
              {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
              Status
              {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
              Priority
              {sortColumn === "priority" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
              Due Date
              {sortColumn === "dueDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No projects found
              </TableCell>
            </TableRow>
          ) : (
            filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">{project.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="w-[80px]" />
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                </TableCell>
                <TableCell>{project.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.assignedTo.avatar} alt={project.assignedTo.name} />
                      <AvatarFallback>{project.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{project.assignedTo.name}</span>
                  </div>
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
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

