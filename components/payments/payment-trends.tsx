"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const data = [
  { date: "01/01", amount: 4000 },
  { date: "01/08", amount: 3000 },
  { date: "01/15", amount: 5000 },
  { date: "01/22", amount: 2780 },
  { date: "01/29", amount: 1890 },
  { date: "02/05", amount: 2390 },
  { date: "02/12", amount: 3490 },
  { date: "02/19", amount: 5000 },
  { date: "02/26", amount: 4500 },
  { date: "03/05", amount: 6000 },
  { date: "03/12", amount: 5200 },
  { date: "03/19", amount: 4800 },
]

export function PaymentTrends() {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("3m")

  const colors = {
    line: theme === "dark" ? "#60a5fa" : "#3b82f6",
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
              formatter={(value) => [`$${value}`, "Amount"]}
            />
            <Legend />
            <Line type="monotone" dataKey="amount" name="Payment Amount" stroke={colors.line} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

