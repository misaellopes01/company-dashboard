import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with new branding",
    progress: 75,
    status: "In Progress",
    dueDate: "Nov 15, 2023",
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
    dueDate: "Dec 20, 2023",
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
      {
        name: "Ethan Williams",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 marketing campaign for new product launch",
    progress: 90,
    status: "Almost Complete",
    dueDate: "Nov 5, 2023",
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
]

export function RecentProjects() {
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
      case "Delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{project.dueDate}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {project.team.map((member, index) => (
                <Avatar key={index} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Clock className="mr-2 h-3 w-3" />
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

