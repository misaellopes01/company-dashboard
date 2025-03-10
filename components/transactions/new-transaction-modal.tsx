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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export function NewTransactionModal({ isOpen, onClose }) {
  const [transactionDetails, setTransactionDetails] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
    account: "",
    date: new Date(),
    notes: "",
    status: "completed",
  })
  const [dateOpen, setDateOpen] = useState(false)

  const handleChange = (field, value) => {
    setTransactionDetails({
      ...transactionDetails,
      [field]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Transaction created:", transactionDetails)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>Create a new transaction record. Fill in the details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={transactionDetails.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={transactionDetails.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !transactionDetails.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {transactionDetails.date ? format(transactionDetails.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={transactionDetails.date}
                    onSelect={(date) => {
                      handleChange("date", date)
                      setDateOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Transaction Type *</Label>
            <RadioGroup
              value={transactionDetails.type}
              onValueChange={(value) => handleChange("type", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense" className="cursor-pointer">
                  Expense
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income" className="cursor-pointer">
                  Income
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="cursor-pointer">
                  Transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={transactionDetails.category}
                onValueChange={(value) => handleChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account">Account *</Label>
              <Select
                value={transactionDetails.account}
                onValueChange={(value) => handleChange("account", value)}
                required
              >
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking Account</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="investment">Investment Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={transactionDetails.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this transaction..."
              value={transactionDetails.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

