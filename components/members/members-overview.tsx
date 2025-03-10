import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberStats } from "@/components/members/member-stats"
import { MemberDistribution } from "@/components/members/member-distribution"
import { ActiveMembers } from "@/components/members/active-members"
import { RecentActivity } from "@/components/members/recent-activity"
import { TeamStructure } from "@/components/members/team-structure"

export function MembersOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <MemberStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Team Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamStructure />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Member Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <MemberDistribution />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Active Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ActiveMembers />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  )
}

