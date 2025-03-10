import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectsStats } from "@/components/projects/projects-stats"
import { ProjectsTimeline } from "@/components/projects/projects-timeline"
import { ProjectsDistribution } from "@/components/projects/projects-distribution"
import { RecentProjects } from "@/components/projects/recent-projects"
import { ProjectsTeam } from "@/components/projects/projects-team"

export function ProjectsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <ProjectsStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Projects Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsTimeline />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Projects Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsDistribution />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentProjects />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Project Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsTeam />
        </CardContent>
      </Card>
    </div>
  )
}

