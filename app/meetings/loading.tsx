import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <div className="space-y-2">
                    {Array(3)
                      .fill(null)
                      .map((_, j) => (
                        <div key={j} className="flex justify-between items-center">
                          <div>
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24 mt-1" />
                          </div>
                          <Skeleton className="h-8 w-16" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

