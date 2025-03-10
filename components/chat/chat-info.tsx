import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BellOff, FileIcon, ImageIcon, Link, UserPlus } from "lucide-react"

export function ChatInfo({ chat }) {
  if (!chat) return null

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        {chat.type === "direct" ? (
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-20 w-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <div className="flex -space-x-4">
              {chat.participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                </Avatar>
              ))}
              {chat.participants.length > 3 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted border-2 border-background text-xs font-medium">
                  +{chat.participants.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
        <h2 className="mt-4 text-xl font-bold">{chat.name}</h2>
        <p className="text-sm text-muted-foreground">
          {chat.type === "direct" ? "Direct Message" : `${chat.participants.length} Members`}
        </p>

        <div className="flex justify-center gap-2 mt-4">
          {chat.type === "group" && (
            <Button size="sm" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Add People
            </Button>
          )}
          <Button size="sm" variant="outline">
            <BellOff className="mr-2 h-4 w-4" />
            Mute
          </Button>
        </div>
      </div>

      {chat.type === "group" && (
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>People in this conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chat.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Shared Files</CardTitle>
          <CardDescription>Recently shared files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded bg-muted">
                <FileIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Q2 Financial Report.pdf</p>
                <p className="text-xs text-muted-foreground">2.4 MB • July 15, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Marketing Campaign.png</p>
                <p className="text-xs text-muted-foreground">1.8 MB • July 14, 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded bg-muted">
                <Link className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Project Proposal</p>
                <p className="text-xs text-muted-foreground">docs.google.com • July 12, 2023</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch id="notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="media-preview">Media Preview</Label>
              <Switch id="media-preview" defaultChecked />
            </div>
            {chat.type === "group" && (
              <div className="flex items-center justify-between">
                <Label htmlFor="mentions-only">Only notify on @mentions</Label>
                <Switch id="mentions-only" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

