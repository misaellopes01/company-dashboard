"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const data = [
  { resource: "Dashboard", read: 248, write: 195, delete: 5 },
  { resource: "Projects", read: 220, write: 150, delete: 20 },
  { resource: "Invoices", read: 180, write: 80, delete: 15 },
  { resource: "Payments", read: 160, write: 70, delete: 10 },
  { resource: "Members", read: 120, write: 30, delete: 5 },
  { resource: "Settings", read: 50, write: 20, delete: 5 },
]

export function ResourceAccess() {
  const { theme } = useTheme()
  const [viewType, setViewType] = useState("bar")

  const colors = {
    read: theme === "dark" ? "#60a5fa" : "#3b82f6",
    write: theme === "dark" ? "#4ade80" : "#22c55e",
    delete: theme === "dark" ? "#f87171" : "#ef4444",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="stacked">Stacked Bar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis type="number" stroke={colors.text} />
            <YAxis type="category" dataKey="resource" stroke={colors.text} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                color: theme === "dark" ? "#f8fafc" : "#0f172a",
              }}
              formatter={(value) => [`${value} users`, "Count"]}
            />
            <Legend />
            <Bar
              dataKey="read"
              name="Read Access"
              fill={colors.read}
              radius={[0, 4, 4, 0]}
              stackId={viewType === "stacked" ? "stack" : undefined}
            />
            <Bar
              dataKey="write"
              name="Write Access"
              fill={colors.write}
              radius={[0, 4, 4, 0]}
              stackId={viewType === "stacked" ? "stack" : undefined}
            />
            <Bar
              dataKey="delete"
              name="Delete Access"
              fill={colors.delete}
              radius={[0, 4, 4, 0]}
              stackId={viewType === "stacked" ? "stack" : undefined}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

