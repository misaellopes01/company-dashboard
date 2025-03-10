"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, FileEdit, Printer, Send } from "lucide-react"

const invoicesData = [
  {
    id: "INV-001",
    client: {
      name: "Acme Inc",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acme-logo.png",
    },
    amount: 1250.0,
    date: new Date(2023, 6, 15), // July 15, 2023
    dueDate: new Date(2023, 7, 15), // August 15, 2023
    status: "paid",
  },
  {
    id: "INV-002",
    client: {
      name: "Globex Corp",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globex-logo.png",
    },
    amount: 3500.0,
    date: new Date(2023, 6, 10), // July 10, 2023
    dueDate: new Date(2023, 7, 10), // August 10, 2023
    status: "pending",
  },
  {
    id: "INV-003",
    client: {
      name: "Stark Industries",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stark-logo.png",
    },
    amount: 5000.0,
    date: new Date(2023, 6, 5), // July 5, 2023
    dueDate: new Date(2023, 7, 5), // August 5, 2023
    status: "overdue",
  },
  {
    id: "INV-004",
    client: {
      name: "Wayne Enterprises",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wayne-logo.png",
    },
    amount: 2750.0,
    date: new Date(2023, 6, 1), // July 1, 2023
    dueDate: new Date(2023, 7, 1), // August 1, 2023
    status: "paid",
  },
  {
    id: "INV-005",
    client: {
      name: "Umbrella Corp",
      avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/umbrella-logo.png",
    },
    amount: 1800.0,
    date: new Date(2023, 5, 25), // June 25, 2023
    dueDate: new Date(2023, 6, 25), // July 25, 2023
    status: "pending",
  },
]

export function InvoiceCalendar({ searchTerm = "", filterStatus = "all" }) {
  const [date, setDate] = useState(new Date())
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const filteredInvoices = invoicesData.filter(
    (invoice) =>
      (invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || invoice.status === filterStatus),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Overdue</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to check if a date has invoices
  const hasInvoices = (day) => {
    return filteredInvoices.some((invoice) => {
      const invoiceDate = new Date(invoice.date)
      const invoiceDueDate = new Date(invoice.dueDate)

      return (
        (day.getDate() === invoiceDate.getDate() &&
          day.getMonth() === invoiceDate.getMonth() &&
          day.getFullYear() === invoiceDate.getFullYear()) ||
        (day.getDate() === invoiceDueDate.getDate() &&
          day.getMonth() === invoiceDueDate.getMonth() &&
          day.getFullYear() === invoiceDueDate.getFullYear())
      )
    })
  }

  // Function to get invoices for a specific date
  const getInvoicesForDate = (day) => {
    return filteredInvoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.date)
      const invoiceDueDate = new Date(invoice.dueDate)

      return (
        (day.getDate() === invoiceDate.getDate() &&
          day.getMonth() === invoiceDate.getMonth() &&
          day.getFullYear() === invoiceDate.getFullYear()) ||
        (day.getDate() === invoiceDueDate.getDate() &&
          day.getMonth() === invoiceDueDate.getMonth() &&
          day.getFullYear() === invoiceDueDate.getFullYear())
      )
    })
  }

  // Custom day render function
  const renderDay = (day, selectedDay, isDisabled) => {
    if (!day) return null

    const hasInvoicesToday = hasInvoices(day)

    return (
      <div
        className={`relative p-0 w-full h-full flex items-center justify-center ${hasInvoicesToday ? "font-bold" : ""}`}
      >
        {day.getDate()}
        {hasInvoicesToday && <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></div>}
      </div>
    )
  }

  // Handle day click
  const handleDayClick = (day) => {
    const invoicesForDay = getInvoicesForDate(day)
    if (invoicesForDay.length > 0) {
      setSelectedInvoice(invoicesForDay[0])
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate)
                handleDayClick(newDate)
              }
            }}
            className="rounded-md border"
            components={{
              Day: renderDay,
            }}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-medium mb-4">Invoices for {formatDate(date)}</h3>
          <div className="space-y-4">
            {getInvoicesForDate(date).length === 0 ? (
              <p className="text-muted-foreground">No invoices for this date.</p>
            ) : (
              getInvoicesForDate(date).map((invoice) => (
                <Card
                  key={invoice.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={invoice.client.avatar} alt={invoice.client.name} />
                          <AvatarFallback>{invoice.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{invoice.client.name}</p>
                          <p className="text-sm text-muted-foreground">{invoice.id}</p>
                        </div>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Created: {formatDate(invoice.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {formatDate(invoice.dueDate)}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <p className="text-lg font-bold">${invoice.amount.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Invoice {selectedInvoice.id}</DialogTitle>
              <DialogDescription>Invoice details for {selectedInvoice.client.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedInvoice.client.avatar} alt={selectedInvoice.client.name} />
                    <AvatarFallback>{selectedInvoice.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedInvoice.client.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedInvoice.id}</p>
                  </div>
                </div>
                {getStatusBadge(selectedInvoice.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Issue Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedInvoice.date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-2xl font-bold">${selectedInvoice.amount.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <FileEdit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
              <Button onClick={() => setSelectedInvoice(null)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

