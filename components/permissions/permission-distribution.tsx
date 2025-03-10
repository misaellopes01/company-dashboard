"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Admin", value: 5 },
  { name: "Manager", value: 15 },
  { name: "Member", value: 180 },
  { name: "Guest", value: 48 },
  { name: "Custom", value: 24 },
]

export function PermissionDistribution() {
  const { theme } = useTheme()

  const COLORS =
    theme === "dark"
      ? ["#4ade80", "#60a5fa", "#a78bfa", "#94a3b8", "#f87171"]
      : ["#22c55e", "#3b82f6", "#8b5cf6", "#64748b", "#ef4444"]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} users`, "Count"]}
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
  )
}

