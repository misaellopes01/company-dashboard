import { Suspense } from "react"
import { ProjectsStats } from "@/components/projects/projects-stats"
import { ProjectsTimeline } from "@/components/projects/projects-timeline"
import { ProjectsDistribution } from "@/components/projects/projects-distribution"
import { RecentProjects } from "@/components/projects/recent-projects"
import { ProjectsTeam } from "@/components/projects/projects-team"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsCalendar } from "@/components/projects/projects-calendar"
import { ProjectsKanban } from "@/components/projects/projects-kanban"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewProjectButton } from "@/components/projects/new-project-button"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your organization's projects.</p>
        </div>
        <NewProjectButton />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Suspense fallback={<div className="h-[120px] rounded-lg bg-muted" />}>
              <ProjectsStats />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <ProjectsTimeline />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <ProjectsDistribution />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <RecentProjects />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <ProjectsTeam />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="list">
          <ProjectsList />
        </TabsContent>
        <TabsContent value="calendar">
          <ProjectsCalendar />
        </TabsContent>
        <TabsContent value="kanban">
          <ProjectsKanban />
        </TabsContent>
      </Tabs>
    </div>
  )
}

