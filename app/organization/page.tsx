"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizationOverview } from "@/components/organization/organization-overview"
import { DepartmentPerformance } from "@/components/organization/department-performance"
import { TeamMembers } from "@/components/organization/team-members"
import { OrganizationGoals } from "@/components/organization/organization-goals"
import { OrganizationAnnouncements } from "@/components/organization/organization-announcements"
import { OrganizationChart } from "@/components/organization/organization-chart"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"
import { AddMemberButton } from "@/components/members/add-member-button"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <AddMemberButton />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OrganizationOverview />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <DepartmentPerformance />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Organization Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <OrganizationGoals />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationAnnouncements />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Departments</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <DepartmentPerformance showDetails />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <AddMemberButton />
              </div>
            </CardHeader>
            <CardContent>
              <TeamMembers />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

