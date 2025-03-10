"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddMemberDialog } from "./add-member-dialog"

export function AddMemberButton() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Member
      </Button>
      {showDialog && <AddMemberDialog open={showDialog} onOpenChange={(open) => setShowDialog(open)} />}
    </>
  )
}

