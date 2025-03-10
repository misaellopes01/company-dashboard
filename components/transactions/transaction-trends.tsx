"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const data = [
  { date: "01/01", income: 4000, expenses: 2400, balance: 1600 },
  { date: "01/08", income: 3000, expenses: 1398, balance: 1602 },
  { date: "01/15", income: 2000, expenses: 9800, balance: -7800 },
  { date: "01/22", income: 2780, expenses: 3908, balance: -1128 },
  { date: "01/29", income: 1890, expenses: 4800, balance: -2910 },
  { date: "02/05", income: 2390, expenses: 3800, balance: -1410 },
  { date: "02/12", income: 3490, expenses: 4300, balance: -810 },
  { date: "02/19", income: 5000, expenses: 2400, balance: 2600 },
  { date: "02/26", income: 4500, expenses: 2100, balance: 2400 },
  { date: "03/05", income: 6000, expenses: 3700, balance: 2300 },
  { date: "03/12", income: 5200, expenses: 2900, balance: 2300 },
  { date: "03/19", income: 4800, expenses: 2300, balance: 2500 },
]

export function TransactionTrends() {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("3m")

  const colors = {
    income: theme === "dark" ? "#4ade80" : "#22c55e",
    expenses: theme === "dark" ? "#f87171" : "#ef4444",
    balance: theme === "dark" ? "#60a5fa" : "#3b82f6",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  return (
    <div className="space-y-4">
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

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="date" stroke={colors.text} />
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
            <Line type="monotone" dataKey="income" name="Income" stroke={colors.income} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke={colors.expenses} />
            <Line type="monotone" dataKey="balance" name="Balance" stroke={colors.balance} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

