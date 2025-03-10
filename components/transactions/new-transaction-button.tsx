"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { NewTransactionModal } from "./new-transaction-modal"

export function NewTransactionButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Plus className="mr-2 h-4 w-4" /> New Transaction
      </Button>
      {showModal && <NewTransactionModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  )
}

