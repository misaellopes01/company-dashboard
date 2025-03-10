"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample chat data
const chatsData = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Can you send me the latest financial report?",
    timestamp: "2023-07-15T14:30:00Z",
    unread: 2,
    type: "direct",
    status: "online",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    participants: [
      {
        id: 1,
        name: "Alice Johnson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Marketing Team",
    lastMessage: "Bob: Let's discuss the new campaign tomorrow",
    timestamp: "2023-07-15T12:45:00Z",
    unread: 5,
    type: "group",
    avatar: null,
    participants: [
      {
        id: 2,
        name: "Bob Smith",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
      },
      {
        id: 4,
        name: "Diana Martinez",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      },
      {
        id: 5,
        name: "Ethan Williams",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    lastMessage: "I've updated the database schema",
    timestamp: "2023-07-14T16:20:00Z",
    unread: 0,
    type: "direct",
    status: "offline",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
    participants: [
      {
        id: 3,
        name: "Charlie Brown",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "Diana Martinez",
    lastMessage: "The new design looks great!",
    timestamp: "2023-07-14T10:15:00Z",
    unread: 0,
    type: "direct",
    status: "online",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    participants: [
      {
        id: 4,
        name: "Diana Martinez",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Finance Department",
    lastMessage: "Alice: We need to review the Q2 budget",
    timestamp: "2023-07-13T15:30:00Z",
    unread: 0,
    type: "group",
    avatar: null,
    participants: [
      {
        id: 1,
        name: "Alice Johnson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      },
      {
        id: 6,
        name: "Fiona Garcia",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        id: 7,
        name: "George Lee",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
      },
    ],
  },
  {
    id: 6,
    name: "Project X Team",
    lastMessage: "Ethan: The deadline has been extended",
    timestamp: "2023-07-12T09:45:00Z",
    unread: 0,
    type: "group",
    avatar: null,
    participants: [
      {
        id: 3,
        name: "Charlie Brown",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      },
      {
        id: 5,
        name: "Ethan Williams",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
      {
        id: 8,
        name: "Hannah Kim",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
    ],
  },
]

export function ChatList({ searchTerm = "", filterType = "all", selectedChat, onSelectChat }) {
  const [chats, setChats] = useState(chatsData)

  const filteredChats = chats
    .filter(
      (chat) =>
        (chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterType === "all" ||
          (filterType === "direct" && chat.type === "direct") ||
          (filterType === "group" && chat.type === "group") ||
          (filterType === "unread" && chat.unread > 0)),
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getGroupAvatar = (participants) => {
    return participants.slice(0, 2).map((participant) => (
      <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
        <AvatarImage src={participant.avatar} alt={participant.name} />
        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
      </Avatar>
    ))
  }

  return (
    <div className="space-y-1 p-2">
      {filteredChats.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No chats found</div>
      ) : (
        filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              "flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-muted",
              selectedChat?.id === chat.id && "bg-muted",
            )}
            onClick={() => onSelectChat(chat)}
          >
            {chat.type === "direct" ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
                {chat.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </Avatar>
            ) : (
              <div className="relative h-10 w-10 flex items-center justify-center">
                <div className="flex -space-x-2">{getGroupAvatar(chat.participants)}</div>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{formatTime(chat.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && <Badge className="ml-auto">{chat.unread}</Badge>}
          </div>
        ))
      )}
    </div>
  )
}

