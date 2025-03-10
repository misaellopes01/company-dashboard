import type { Metadata } from "next"
import { MeetingsOverview } from "@/components/meetings/meetings-overview"

export const metadata: Metadata = {
  title: "Meetings | Financial Dashboard",
  description: "Manage and schedule your meetings",
}

export default function MeetingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <MeetingsOverview />
    </div>
  )
}

