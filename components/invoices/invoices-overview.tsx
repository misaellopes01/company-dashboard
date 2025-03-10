import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoiceStats } from "@/components/invoices/invoice-stats"
import { InvoiceTrends } from "@/components/invoices/invoice-trends"
import { RecentInvoices } from "@/components/invoices/recent-invoices"
import { UpcomingPayments } from "@/components/invoices/upcoming-payments"
import { ClientOverview } from "@/components/invoices/client-overview"

export function InvoicesOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <InvoiceStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Invoice Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceTrends />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Client Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientOverview />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentInvoices />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <UpcomingPayments />
        </CardContent>
      </Card>
    </div>
  )
}

