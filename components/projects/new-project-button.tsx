"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { NewProjectModal } from "./new-project-modal"

export function NewProjectButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Plus className="mr-2 h-4 w-4" /> New Project
      </Button>
      {showModal && <NewProjectModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  )
}

