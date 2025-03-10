"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", completed: 4, inProgress: 2, planned: 1 },
  { month: "Feb", completed: 3, inProgress: 3, planned: 2 },
  { month: "Mar", completed: 5, inProgress: 2, planned: 3 },
  { month: "Apr", completed: 2, inProgress: 4, planned: 1 },
  { month: "May", completed: 3, inProgress: 3, planned: 2 },
  { month: "Jun", completed: 4, inProgress: 2, planned: 3 },
  { month: "Jul", completed: 3, inProgress: 3, planned: 2 },
  { month: "Aug", completed: 5, inProgress: 1, planned: 1 },
  { month: "Sep", completed: 4, inProgress: 2, planned: 3 },
  { month: "Oct", completed: 3, inProgress: 4, planned: 2 },
  { month: "Nov", completed: 2, inProgress: 3, planned: 4 },
  { month: "Dec", completed: 4, inProgress: 2, planned: 1 },
]

export function ProjectsTimeline() {
  const { theme } = useTheme()

  const colors = {
    completed: theme === "dark" ? "#4ade80" : "#22c55e",
    inProgress: theme === "dark" ? "#60a5fa" : "#3b82f6",
    planned: theme === "dark" ? "#a78bfa" : "#8b5cf6",
    text: theme === "dark" ? "#94a3b8" : "#64748b",
    grid: theme === "dark" ? "#334155" : "#e2e8f0",
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
          />
          <Legend />
          <Bar dataKey="completed" name="Completed" fill={colors.completed} />
          <Bar dataKey="inProgress" name="In Progress" fill={colors.inProgress} />
          <Bar dataKey="planned" name="Planned" fill={colors.planned} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

