"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatList } from "@/components/chat/chat-list"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatInfo } from "@/components/chat/chat-info"
import { Search, Plus, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateChatDialog } from "@/components/chat/create-chat-dialog"

export default function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showCreateChat, setShowCreateChat] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [currentMessage, setCurrentMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedChat])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!currentMessage.trim() || !selectedChat) return

    // In a real app, you would send this message to your backend
    console.log("Sending message:", currentMessage, "to chat:", selectedChat.id)

    // Clear the input
    setCurrentMessage("")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Messages</h1>
            <Button size="sm" onClick={() => setShowCreateChat(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chats</SelectItem>
                  <SelectItem value="direct">Direct Messages</SelectItem>
                  <SelectItem value="group">Group Chats</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <ChatList
            searchTerm={searchTerm}
            filterType={filterType}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.type === "direct" ? "Direct Message" : `${selectedChat.participants.length} Members`}
                  </p>
                </div>
                <Tabs defaultValue="chat">
                  <TabsList>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="info">Info</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col mt-0">
                  <div className="flex-1 overflow-auto p-4">
                    <ChatMessages chat={selectedChat} />
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="info" className="h-full overflow-auto p-4 mt-0">
                  <ChatInfo chat={selectedChat} />
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle className="text-center">No Chat Selected</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Select a chat from the sidebar or create a new one to start messaging.
                </p>
                <Button onClick={() => setShowCreateChat(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <CreateChatDialog open={showCreateChat} onOpenChange={setShowCreateChat} onChatCreated={setSelectedChat} />
    </div>
  )
}

