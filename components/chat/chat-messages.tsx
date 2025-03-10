"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, MoreHorizontal, Reply } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample messages data
const getMessagesForChat = (chatId) => {
  const messages = [
    {
      id: 1,
      chatId: 1,
      senderId: 1,
      senderName: "Alice Johnson",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      content: "Hi there! Can you send me the latest financial report?",
      timestamp: "2023-07-15T14:30:00Z",
      status: "read",
    },
    {
      id: 2,
      chatId: 1,
      senderId: 0, // Current user
      senderName: "You",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      content: "Sure, I'll send it over right away.",
      timestamp: "2023-07-15T14:32:00Z",
      status: "read",
    },
    {
      id: 3,
      chatId: 1,
      senderId: 1,
      senderName: "Alice Johnson",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      content: "Thanks! I need it for the meeting at 3 PM.",
      timestamp: "2023-07-15T14:35:00Z",
      status: "read",
    },
    {
      id: 4,
      chatId: 1,
      senderId: 0, // Current user
      senderName: "You",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      content: "No problem. I've just emailed it to you. Let me know if you need anything else!",
      timestamp: "2023-07-15T14:40:00Z",
      status: "delivered",
    },
    {
      id: 5,
      chatId: 2,
      senderId: 2,
      senderName: "Bob Smith",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
      content: "Hey team, we need to discuss the new marketing campaign.",
      timestamp: "2023-07-15T12:30:00Z",
      status: "read",
    },
    {
      id: 6,
      chatId: 2,
      senderId: 4,
      senderName: "Diana Martinez",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      content: "I've prepared some mockups for the campaign. Should I share them now?",
      timestamp: "2023-07-15T12:35:00Z",
      status: "read",
    },
    {
      id: 7,
      chatId: 2,
      senderId: 0, // Current user
      senderName: "You",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      content: "Yes, please share them. I'd like to review them before our meeting.",
      timestamp: "2023-07-15T12:40:00Z",
      status: "read",
    },
    {
      id: 8,
      chatId: 2,
      senderId: 2,
      senderName: "Bob Smith",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
      content: "Let's discuss the new campaign tomorrow. I'll set up a meeting.",
      timestamp: "2023-07-15T12:45:00Z",
      status: "read",
    },
    {
      id: 9,
      chatId: 3,
      senderId: 3,
      senderName: "Charlie Brown",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      content: "I've updated the database schema as we discussed.",
      timestamp: "2023-07-14T16:20:00Z",
      status: "read",
    },
    {
      id: 10,
      chatId: 3,
      senderId: 0, // Current user
      senderName: "You",
      senderAvatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
      content: "Great! Can you walk me through the changes?",
      timestamp: "2023-07-14T16:25:00Z",
      status: "read",
    },
  ]

  return messages.filter((message) => message.chatId === chatId)
}

export function ChatMessages({ chat }) {
  const [messages, setMessages] = useState([])
  const [hoveredMessage, setHoveredMessage] = useState(null)

  useEffect(() => {
    if (chat) {
      setMessages(getMessagesForChat(chat.id))
    }
  }, [chat])

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
  }

  const shouldShowDate = (index, messages) => {
    if (index === 0) return true

    const currentDate = new Date(messages[index].timestamp).toDateString()
    const previousDate = new Date(messages[index - 1].timestamp).toDateString()

    return currentDate !== previousDate
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (!chat || messages.length === 0) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No messages yet</div>
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={message.id}>
          {shouldShowDate(index, messages) && (
            <div className="flex justify-center my-4">
              <div className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-md">
                {formatDate(message.timestamp)}
              </div>
            </div>
          )}

          <div
            className={cn("flex gap-2 group", message.senderId === 0 ? "justify-end" : "justify-start")}
            onMouseEnter={() => setHoveredMessage(message.id)}
            onMouseLeave={() => setHoveredMessage(null)}
          >
            {message.senderId !== 0 && (
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                message.senderId === 0 ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {message.senderId !== 0 && chat.type === "group" && (
                <p className="text-xs font-medium mb-1">{message.senderName}</p>
              )}
              <p>{message.content}</p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                {message.senderId === 0 && (
                  <span className="text-xs opacity-70">{message.status === "read" ? "✓✓" : "✓"}</span>
                )}
              </div>
            </div>

            {hoveredMessage === message.id && (
              <div className="flex items-start gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Reply className="h-3 w-3" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Text
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

