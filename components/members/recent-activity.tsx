import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    user: {
      name: "Alice Johnson",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    action: "created a new project",
    target: "Website Redesign",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Bob Smith",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    action: "commented on",
    target: "Marketing Campaign",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Charlie Brown",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
    },
    action: "completed task",
    target: "Database Migration",
    time: "yesterday",
  },
  {
    id: 4,
    user: {
      name: "Diana Martinez",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    action: "updated document",
    target: "Q3 Financial Report",
    time: "yesterday",
  },
  {
    id: 5,
    user: {
      name: "Ethan Williams",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    action: "joined team",
    target: "Sales Department",
    time: "2 days ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

