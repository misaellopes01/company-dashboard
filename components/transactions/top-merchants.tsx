"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Amazon", amount: 450 },
  { name: "Walmart", amount: 320 },
  { name: "Uber", amount: 280 },
  { name: "Netflix", amount: 220 },
  { name: "Starbucks", amount: 190 },
]

export function TopMerchants() {
  const { theme } = useTheme()

  const colors = {
    bar: theme === "dark" ? "#60a5fa" : "#3b82f6",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis type="number" stroke={colors.text} tickFormatter={(value) => `$${value}`} />
          <YAxis type="category" dataKey="name" stroke={colors.text} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
              borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
              color: theme === "dark" ? "#f8fafc" : "#0f172a",
            }}
            formatter={(value) => [`$${value}`, "Amount"]}
          />
          <Bar dataKey="amount" fill={colors.bar} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

