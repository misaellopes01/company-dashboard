"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const categoryData = [
  { name: "Shopping", value: 1250, percentage: 25 },
  { name: "Groceries", value: 850, percentage: 17 },
  { name: "Entertainment", value: 650, percentage: 13 },
  { name: "Transportation", value: 550, percentage: 11 },
  { name: "Dining", value: 750, percentage: 15 },
  { name: "Utilities", value: 450, percentage: 9 },
  { name: "Other", value: 500, percentage: 10 },
]

export function TransactionCategories({ searchTerm = "", filterType = "all" }) {
  const { theme } = useTheme()

  const COLORS =
    theme === "dark"
      ? ["#4ade80", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#94a3b8", "#64748b"]
      : ["#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#64748b", "#94a3b8"]

  const filteredCategories = categoryData.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {filteredCategories.map((entry, index) => (
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Spending by Category</h3>
        {filteredCategories.map((category, index) => (
          <Card key={category.name} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge variant="outline">${category.value}</Badge>
              </div>
              <div className="space-y-1">
                <Progress value={category.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{category.percentage}% of total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

