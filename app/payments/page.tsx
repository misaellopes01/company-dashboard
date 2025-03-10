"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsOverview } from "@/components/payments/payments-overview"
import { PaymentsList } from "@/components/payments/payments-list"
import { PaymentMethods } from "@/components/payments/payment-methods"
import { RecurringPayments } from "@/components/payments/recurring-payments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { AddPaymentMethodDialog } from "@/components/payments/add-payment-method-dialog"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddPaymentMethod(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker className="w-auto" />
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PaymentsOverview />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentsList searchTerm={searchTerm} filterStatus={filterStatus} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentMethods />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recurring Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <RecurringPayments />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddPaymentMethodDialog open={showAddPaymentMethod} onOpenChange={setShowAddPaymentMethod} />
    </div>
  )
}

