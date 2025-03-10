import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal } from "lucide-react"

const members = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    department: "Executive",
    activity: 95,
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Manager",
    department: "Marketing",
    activity: 88,
    status: "active",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Member",
    department: "Engineering",
    activity: 92,
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: 4,
    name: "Diana Martinez",
    email: "diana@example.com",
    role: "Manager",
    department: "Product",
    activity: 78,
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: 5,
    name: "Ethan Williams",
    email: "ethan@example.com",
    role: "Member",
    department: "Sales",
    activity: 85,
    status: "active",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
]

export function ActiveMembers() {
  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
      case "Manager":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Manager</Badge>
      case "Member":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Member</Badge>
      case "Guest":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Guest</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{member.email}</p>
                <p className="text-xs text-muted-foreground">{member.department}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2">{getRoleBadge(member.role)}</div>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={member.activity} className="h-1.5 w-16" />
                <span className="text-xs text-muted-foreground">{member.activity}%</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Members
      </Button>
    </div>
  )
}

