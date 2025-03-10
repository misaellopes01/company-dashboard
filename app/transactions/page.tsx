import { Suspense } from "react"
import { TransactionStats } from "@/components/transactions/transaction-stats"
import { TransactionTrends } from "@/components/transactions/transaction-trends"
import { RecentTransactions } from "@/components/transactions/recent-transactions"
import { PendingTransactions } from "@/components/transactions/pending-transactions"
import { TopMerchants } from "@/components/transactions/top-merchants"
import { TransactionsList } from "@/components/transactions/transactions-list"
import { TransactionCategories } from "@/components/transactions/transaction-categories"
import { TransactionAnalytics } from "@/components/transactions/transaction-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewTransactionButton } from "@/components/transactions/new-transaction-button"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your financial transactions.</p>
        </div>
        <NewTransactionButton />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<div className="h-[120px] rounded-lg bg-muted" />}>
              <TransactionStats />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <TransactionTrends />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <TopMerchants />
            </Suspense>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-4" />}
              className="lg:col-span-4"
            >
              <RecentTransactions />
            </Suspense>
            <Suspense
              fallback={<div className="h-[400px] rounded-lg bg-muted lg:col-span-3" />}
              className="lg:col-span-3"
            >
              <PendingTransactions />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <TransactionsList />
        </TabsContent>
        <TabsContent value="categories">
          <TransactionCategories />
        </TabsContent>
        <TabsContent value="analytics">
          <TransactionAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

