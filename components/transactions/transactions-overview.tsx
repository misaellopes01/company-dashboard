import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionStats } from "@/components/transactions/transaction-stats"
import { TransactionTrends } from "@/components/transactions/transaction-trends"
import { RecentTransactions } from "@/components/transactions/recent-transactions"
import { PendingTransactions } from "@/components/transactions/pending-transactions"
import { TopMerchants } from "@/components/transactions/top-merchants"

export function TransactionsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-full">
        <TransactionStats />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Transaction Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTrends />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Top Merchants</CardTitle>
        </CardHeader>
        <CardContent>
          <TopMerchants />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Pending Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <PendingTransactions />
        </CardContent>
      </Card>
    </div>
  )
}

