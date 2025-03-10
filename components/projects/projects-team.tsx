import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Project Manager",
    projects: 8,
    completion: 92,
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "UI/UX Designer",
    projects: 6,
    completion: 88,
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Frontend Developer",
    projects: 5,
    completion: 95,
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: 4,
    name: "Diana Martinez",
    role: "Backend Developer",
    projects: 7,
    completion: 90,
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: 5,
    name: "Ethan Williams",
    role: "QA Engineer",
    projects: 4,
    completion: 85,
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
]

export function ProjectsTeam() {
  return (
    <div className="space-y-6">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{member.name}</p>
              <span className="text-sm text-muted-foreground">{member.projects} projects</span>
            </div>
            <p className="text-xs text-muted-foreground">{member.role}</p>
            <div className="flex items-center gap-2">
              <Progress value={member.completion} className="h-1.5" />
              <span className="text-xs text-muted-foreground">{member.completion}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

