import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const changes = [
  {
    id: 1,
    user: {
      name: "Alice Johnson",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "updated role permissions for",
    target: "Manager",
    time: "2 hours ago",
    type: "role",
  },
  {
    id: 2,
    user: {
      name: "Bob Smith",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    action: "granted custom access to",
    target: "Charlie Brown",
    time: "4 hours ago",
    type: "user",
  },
  {
    id: 3,
    user: {
      name: "Diana Martinez",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    action: "created new role",
    target: "Analyst",
    time: "yesterday",
    type: "role",
  },
  {
    id: 4,
    user: {
      name: "Ethan Williams",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    action: "modified resource access for",
    target: "Invoices",
    time: "yesterday",
    type: "resource",
  },
  {
    id: 5,
    user: {
      name: "Fiona Garcia",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
    action: "revoked permissions from",
    target: "George Lee",
    time: "2 days ago",
    type: "user",
  },
]

export function RecentPermissionChanges() {
  const getTypeBadge = (type) => {
    switch (type) {
      case "role":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Role</Badge>
      case "user":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">User</Badge>
      case "resource":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resource</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {changes.map((change) => (
        <div key={change.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={change.user.avatar} alt={change.user.name} />
            <AvatarFallback>{change.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <p className="text-sm">
              <span className="font-medium">{change.user.name}</span> {change.action}{" "}
              <span className="font-medium">{change.target}</span>
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {change.time}
              </p>
              {getTypeBadge(change.type)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

