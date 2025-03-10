import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentStats } from "@/components/payments/payment-stats"
import { PaymentTrends } from "@/components/payments/payment-trends"
import { RecentPayments } from "@/components/payments/recent-payments"
import { PaymentMethodsChart } from "@/components/payments/payment-methods-chart"
import { UpcomingPayments } from "@/components/payments/upcoming-payments"

export function PaymentsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <PaymentStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Payment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentTrends />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentMethodsChart />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentPayments />
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

