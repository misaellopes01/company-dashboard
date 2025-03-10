"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreditCard, Edit, MoreHorizontal, Star, Trash } from "lucide-react"

const paymentMethods = [
  {
    id: "pm_1",
    type: "credit_card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa-logo.png",
  },
  {
    id: "pm_2",
    type: "credit_card",
    brand: "Mastercard",
    last4: "5555",
    expMonth: 10,
    expYear: 2025,
    isDefault: false,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mastercard-logo.png",
  },
  {
    id: "pm_3",
    type: "credit_card",
    brand: "American Express",
    last4: "1234",
    expMonth: 8,
    expYear: 2023,
    isDefault: false,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amex-logo.png",
  },
  {
    id: "pm_4",
    type: "bank_account",
    brand: "Bank of America",
    last4: "6789",
    isDefault: false,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bank-logo.png",
  },
  {
    id: "pm_5",
    type: "paypal",
    brand: "PayPal",
    email: "user@example.com",
    isDefault: false,
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paypal-logo.png",
  },
]

export function PaymentMethods() {
  const [methods, setMethods] = useState(paymentMethods)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [methodToDelete, setMethodToDelete] = useState(null)

  const handleSetDefault = (id) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleDelete = (id) => {
    setMethodToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setMethods(methods.filter((method) => method.id !== methodToDelete))
    setDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <Card key={method.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-md bg-muted">
                  {method.icon ? (
                    <img
                      src={method.icon || "/placeholder.svg"}
                      alt={method.brand}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{method.brand}</h3>
                    {method.isDefault && (
                      <Badge variant="outline" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {method.type === "credit_card" && (
                      <>
                        •••• {method.last4} | Expires {method.expMonth}/{method.expYear}
                      </>
                    )}
                    {method.type === "bank_account" && <>•••• {method.last4}</>}
                    {method.type === "paypal" && <>{method.email}</>}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!method.isDefault && (
                    <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>
                      <Star className="mr-2 h-4 w-4" />
                      Set as Default
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDelete(method.id)}
                    disabled={method.isDefault}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this payment method. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

