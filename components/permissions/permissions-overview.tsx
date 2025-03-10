import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PermissionStats } from "@/components/permissions/permission-stats"
import { PermissionDistribution } from "@/components/permissions/permission-distribution"
import { ResourceAccess } from "@/components/permissions/resource-access"
import { RecentPermissionChanges } from "@/components/permissions/recent-permission-changes"
import { RoleMatrix } from "@/components/permissions/role-matrix"

export function PermissionsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <PermissionStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Role Access Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <RoleMatrix />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Permission Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <PermissionDistribution />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Resource Access</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceAccess />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentPermissionChanges />
        </CardContent>
      </Card>
    </div>
  )
}

