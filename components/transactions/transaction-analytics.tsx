"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const monthlyData = [
  { month: "Jan", income: 4000, expenses: 2400, balance: 1600 },
  { month: "Feb", income: 3000, expenses: 1398, balance: 1602 },
  { month: "Mar", income: 2000, expenses: 9800, balance: -7800 },
  { month: "Apr", income: 2780, expenses: 3908, balance: -1128 },
  { month: "May", income: 1890, expenses: 4800, balance: -2910 },
  { month: "Jun", income: 2390, expenses: 3800, balance: -1410 },
  { month: "Jul", income: 3490, expenses: 4300, balance: -810 },
  { month: "Aug", income: 5000, expenses: 2400, balance: 2600 },
  { month: "Sep", income: 4500, expenses: 2100, balance: 2400 },
  { month: "Oct", income: 6000, expenses: 3700, balance: 2300 },
  { month: "Nov", income: 5200, expenses: 2900, balance: 2300 },
  { month: "Dec", income: 4800, expenses: 2300, balance: 2500 },
]

const categoryData = [
  { name: "Shopping", value: 1250 },
  { name: "Groceries", value: 850 },
  { name: "Entertainment", value: 650 },
  { name: "Transportation", value: 550 },
  { name: "Dining", value: 750 },
  { name: "Utilities", value: 450 },
  { name: "Other", value: 500 },
]

const weekdayData = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 900 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 1800 },
  { day: "Fri", amount: 2400 },
  { day: "Sat", amount: 1700 },
  { day: "Sun", amount: 800 },
]

export function TransactionAnalytics({ searchTerm = "", filterType = "all" }) {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("1y")

  const colors = {
    income: theme === "dark" ? "#4ade80" : "#22c55e",
    expenses: theme === "dark" ? "#f87171" : "#ef4444",
    balance: theme === "dark" ? "#60a5fa" : "#3b82f6",
    bar: theme === "dark" ? "#a78bfa" : "#8b5cf6",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  const COLORS =
    theme === "dark"
      ? ["#4ade80", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#94a3b8", "#64748b"]
      : ["#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#64748b", "#94a3b8"]

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="weekday">Weekday Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="month" stroke={colors.text} />
                    <YAxis stroke={colors.text} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                      }}
                      formatter={(value) => [`$${value}`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill={colors.income} />
                    <Bar dataKey="expenses" name="Expenses" fill={colors.expenses} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Balance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="month" stroke={colors.text} />
                    <YAxis stroke={colors.text} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                      }}
                      formatter={(value) => [`$${value}`, ""]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Balance"
                      stroke={colors.balance}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Amount"]}
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekday" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Day of Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weekdayData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis dataKey="day" stroke={colors.text} />
                    <YAxis stroke={colors.text} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                        color: theme === "dark" ? "#f8fafc" : "#0f172a",
                      }}
                      formatter={(value) => [`$${value}`, "Amount"]}
                    />
                    <Legend />
                    <Bar dataKey="amount" name="Spending" fill={colors.bar} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

