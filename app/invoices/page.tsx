"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoicesOverview } from "@/components/invoices/invoices-overview"
import { InvoicesList } from "@/components/invoices/invoices-list"
import { InvoiceCalendar } from "@/components/invoices/invoice-calendar"
import { CreateInvoice } from "@/components/invoices/create-invoice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowCreateInvoice(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices..."
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
              <SelectItem value="all">All Invoices</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
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
          <TabsTrigger value="list">All Invoices</TabsTrigger>
          {/* <TabsTrigger value="calendar">Calendar</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <InvoicesOverview />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices List</CardTitle>
            </CardHeader>
            <CardContent>
              <InvoicesList searchTerm={searchTerm} filterStatus={filterStatus} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <InvoiceCalendar searchTerm={searchTerm} filterStatus={filterStatus} />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>

      <CreateInvoice open={showCreateInvoice} onOpenChange={setShowCreateInvoice} />
    </div>
  )
}

