"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const departmentData = [
  {
    name: "Finance",
    budget: 1200000,
    spent: 980000,
    headcount: 32,
    performance: 94,
    status: "On Track",
  },
  {
    name: "Marketing",
    budget: 850000,
    spent: 720000,
    headcount: 28,
    performance: 88,
    status: "On Track",
  },
  {
    name: "Operations",
    budget: 1500000,
    spent: 1350000,
    headcount: 45,
    performance: 92,
    status: "On Track",
  },
  {
    name: "Technology",
    budget: 2000000,
    spent: 1600000,
    headcount: 56,
    performance: 96,
    status: "Ahead",
  },
  {
    name: "Sales",
    budget: 1800000,
    spent: 1650000,
    headcount: 42,
    performance: 90,
    status: "On Track",
  },
  {
    name: "HR",
    budget: 600000,
    spent: 580000,
    headcount: 18,
    performance: 85,
    status: "Behind",
  },
  {
    name: "Legal",
    budget: 450000,
    spent: 400000,
    headcount: 12,
    performance: 89,
    status: "On Track",
  },
  {
    name: "R&D",
    budget: 1700000,
    spent: 1400000,
    headcount: 38,
    performance: 93,
    status: "On Track",
  },
]

const chartData = departmentData.map((dept) => ({
  name: dept.name,
  budget: dept.budget / 1000000,
  spent: dept.spent / 1000000,
  performance: dept.performance,
}))

export function DepartmentPerformance({ showDetails = false }) {
  const { theme } = useTheme()

  const getStatusColor = (status) => {
    switch (status) {
      case "Ahead":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Behind":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  if (showDetails) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Headcount</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentData.map((dept) => (
            <TableRow key={dept.name}>
              <TableCell className="font-medium">{dept.name}</TableCell>
              <TableCell>${dept.budget.toLocaleString()}</TableCell>
              <TableCell>${dept.spent.toLocaleString()}</TableCell>
              <TableCell>{dept.headcount}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={dept.performance} className="w-[60px]" />
                  <span>{dept.performance}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Budget (Millions)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar dataKey="budget" fill={theme === "dark" ? "#1e40af" : "#3b82f6"} radius={[4, 4, 0, 0]} />
        <Bar dataKey="spent" fill={theme === "dark" ? "#adfa1d" : "#0ea5e9"} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

