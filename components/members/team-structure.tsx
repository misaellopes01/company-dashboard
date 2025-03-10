"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const data = [
  { department: "Executive", members: 5 },
  { department: "Engineering", members: 45 },
  { department: "Product", members: 25 },
  { department: "Marketing", members: 30 },
  { department: "Sales", members: 35 },
  { department: "Customer Support", members: 40 },
  { department: "Finance", members: 15 },
  { department: "HR", members: 10 },
]

export function TeamStructure() {
  const { theme } = useTheme()
  const [viewType, setViewType] = useState("departments")

  const colors = {
    bar: theme === "dark" ? "#60a5fa" : "#3b82f6",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="departments">By Department</SelectItem>
            <SelectItem value="roles">By Role</SelectItem>
            <SelectItem value="locations">By Location</SelectItem>
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
            <YAxis type="category" dataKey="department" stroke={colors.text} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                color: theme === "dark" ? "#f8fafc" : "#0f172a",
              }}
              formatter={(value) => [`${value} members`, "Count"]}
            />
            <Legend />
            <Bar dataKey="members" name="Members" fill={colors.bar} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

