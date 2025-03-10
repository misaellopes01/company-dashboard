"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

// Sample users data
const usersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  },
  {
    id: 4,
    name: "Diana Martinez",
    email: "diana@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  },
  {
    id: 5,
    name: "Ethan Williams",
    email: "ethan@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  },
  {
    id: 6,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  },
  {
    id: 7,
    name: "George Lee",
    email: "george@example.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  },
  {
    id: 8,
    name: "Hannah Kim",
    email: "hannah@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  },
]

export function CreateChatDialog({ open, onOpenChange, onChatCreated }) {
  const [chatType, setChatType] = useState("direct")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [groupName, setGroupName] = useState("")

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUserToggle = (user) => {
    if (chatType === "direct" && selectedUsers.length > 0) {
      // For direct messages, only allow one user
      setSelectedUsers([user])
    } else {
      const isSelected = selectedUsers.some((selected) => selected.id === user.id)

      if (isSelected) {
        setSelectedUsers(selectedUsers.filter((selected) => selected.id !== user.id))
      } else {
        setSelectedUsers([...selectedUsers, user])
      }
    }
  }

  const handleCreateChat = () => {
    if (selectedUsers.length === 0) return

    const newChat = {
      id: Date.now(),
      name:
        chatType === "direct"
          ? selectedUsers[0].name
          : groupName || `Group with ${selectedUsers.map((u) => u.name).join(", ")}`,
      lastMessage: "",
      timestamp: new Date().toISOString(),
      unread: 0,
      type: chatType,
      status: chatType === "direct" ? "offline" : undefined,
      avatar: chatType === "direct" ? selectedUsers[0].avatar : null,
      participants: selectedUsers,
    }

    onChatCreated(newChat)
    onOpenChange(false)

    // Reset form
    setSelectedUsers([])
    setGroupName("")
    setSearchTerm("")
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>Start a new conversation with a person or create a group chat.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="direct" onValueChange={setChatType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="direct">Direct Message</TabsTrigger>
            <TabsTrigger value="group">Group Chat</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {chatType === "group" && (
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name (Optional)</Label>
                <Input
                  id="group-name"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>{chatType === "direct" ? "Select a person" : "Add people to the group"}</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search people..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {selectedUsers.length > 0 && (
              <div className="space-y-2">
                <Label>Selected ({selectedUsers.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 rounded-full"
                        onClick={() => handleUserToggle(user)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="max-h-[200px] overflow-y-auto border rounded-md">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No users found</div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 rounded-lg p-2 cursor-pointer hover:bg-muted"
                      onClick={() => handleUserToggle(user)}
                    >
                      <Checkbox
                        checked={selectedUsers.some((selected) => selected.id === user.id)}
                        onCheckedChange={() => handleUserToggle(user)}
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateChat} disabled={selectedUsers.length === 0}>
            {chatType === "direct" ? "Start Chat" : "Create Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

