import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Megaphone, ThumbsUp, MessageSquare } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Q3 Financial Results",
    content:
      "We're pleased to announce that our Q3 financial results exceeded expectations with a 15% increase in revenue compared to the same period last year.",
    date: "Oct 15, 2023",
    author: {
      name: "Alice Johnson",
      role: "Finance Director",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    },
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "New Office Opening",
    content:
      "We're excited to announce the opening of our new office in Singapore, expanding our presence in the Asia-Pacific region.",
    date: "Oct 10, 2023",
    author: {
      name: "Bob Smith",
      role: "Operations Lead",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
    },
    likes: 42,
    comments: 15,
  },
  {
    id: 3,
    title: "Annual Company Retreat",
    content:
      "Mark your calendars! Our annual company retreat is scheduled for December 5-8 in Colorado. More details to follow soon.",
    date: "Oct 5, 2023",
    author: {
      name: "Fiona Garcia",
      role: "HR Manager",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
    likes: 56,
    comments: 23,
  },
]

export function OrganizationAnnouncements() {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
                      <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <span className="font-medium">{announcement.author.name}</span>
                      <span className="text-muted-foreground"> · {announcement.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{announcement.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{announcement.comments}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

