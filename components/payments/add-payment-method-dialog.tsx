"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, CreditCardIcon } from "lucide-react"

export function AddPaymentMethodDialog({ open, onOpenChange }) {
  const [paymentType, setPaymentType] = useState("credit_card")
  const [isDefault, setIsDefault] = useState(false)

  // Credit card state
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  })

  // Bank account state
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Payment method added:", paymentType === "credit_card" ? cardDetails : bankDetails)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>Add a new payment method to your account.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="credit_card" onValueChange={setPaymentType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credit_card" className="flex items-center gap-2">
              <CreditCardIcon className="h-4 w-4" />
              Credit Card
            </TabsTrigger>
            <TabsTrigger value="bank_account" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Bank Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit_card">
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exp-month">Expiry Month</Label>
                  <Select
                    value={cardDetails.expMonth}
                    onValueChange={(value) => setCardDetails({ ...cardDetails, expMonth: value })}
                    required
                  >
                    <SelectTrigger id="exp-month">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                          {month.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exp-year">Expiry Year</Label>
                  <Select
                    value={cardDetails.expYear}
                    onValueChange={(value) => setCardDetails({ ...cardDetails, expYear: value })}
                    required
                  >
                    <SelectTrigger id="exp-year">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="default-card" checked={isDefault} onCheckedChange={setIsDefault} />
                <Label htmlFor="default-card">Set as default payment method</Label>
              </div>

              <DialogFooter className="pt-4">
                <Button type="submit">Add Credit Card</Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="bank_account">
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  placeholder="Bank of America"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-name">Account Holder Name</Label>
                <Input
                  id="account-name"
                  placeholder="John Doe"
                  value={bankDetails.accountName}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routing-number">Routing Number</Label>
                <Input
                  id="routing-number"
                  placeholder="123456789"
                  value={bankDetails.routingNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  placeholder="987654321"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="default-bank" checked={isDefault} onCheckedChange={setIsDefault} />
                <Label htmlFor="default-bank">Set as default payment method</Label>
              </div>

              <DialogFooter className="pt-4">
                <Button type="submit">Add Bank Account</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

