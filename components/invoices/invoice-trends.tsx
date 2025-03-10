"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const data = [
  { month: "Jan", issued: 4000, paid: 2400, overdue: 400 },
  { month: "Feb", issued: 3000, paid: 1398, overdue: 200 },
  { month: "Mar", issued: 2000, paid: 9800, overdue: 300 },
  { month: "Apr", issued: 2780, paid: 3908, overdue: 500 },
  { month: "May", issued: 1890, paid: 4800, overdue: 200 },
  { month: "Jun", issued: 2390, paid: 3800, overdue: 100 },
  { month: "Jul", issued: 3490, paid: 4300, overdue: 200 },
  { month: "Aug", issued: 5000, paid: 2400, overdue: 300 },
  { month: "Sep", issued: 4500, paid: 2100, overdue: 400 },
  { month: "Oct", issued: 6000, paid: 3700, overdue: 500 },
  { month: "Nov", issued: 5200, paid: 2900, overdue: 300 },
  { month: "Dec", issued: 4800, paid: 2300, overdue: 200 },
]

export function InvoiceTrends() {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("1y")

  const colors = {
    issued: theme === "dark" ? "#60a5fa" : "#3b82f6",
    paid: theme === "dark" ? "#4ade80" : "#22c55e",
    overdue: theme === "dark" ? "#f87171" : "#ef4444",
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
          <BarChart
            data={data}
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
            <Bar dataKey="issued" name="Issued" fill={colors.issued} />
            <Bar dataKey="paid" name="Paid" fill={colors.paid} />
            <Bar dataKey="overdue" name="Overdue" fill={colors.overdue} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

