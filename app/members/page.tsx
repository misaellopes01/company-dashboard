import { Suspense } from "react"
import { MemberStats } from "@/components/members/member-stats"
import { MemberDistribution } from "@/components/members/member-distribution"
import { ActiveMembers } from "@/components/members/active-members"
import { RecentActivity } from "@/components/members/recent-activity"
import { TeamStructure } from "@/components/members/team-structure"
import { MembersList } from "@/components/members/members-list"
import { MemberActivity } from "@/components/members/member-activity"
import { Permissions } from "@/components/members/permissions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddMemberButton } from "@/components/members/add-member-button"

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Manage your organization's team members and their access.</p>
        </div>
        <AddMemberButton />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members List</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Suspense fallback={<div className="h-[120px] rounded-lg bg-muted" />}>
              <MemberStats />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <ActiveMembers />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <MemberDistribution />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <RecentActivity />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <TeamStructure />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="members">
          <MembersList />
        </TabsContent>
        <TabsContent value="activity">
          <MemberActivity />
        </TabsContent>
        <TabsContent value="permissions">
          <Permissions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

