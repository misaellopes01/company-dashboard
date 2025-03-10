"use client"

import { useTheme } from "next-themes"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = [
  { name: "Acme Inc", value: 12500 },
  { name: "Globex Corp", value: 8500 },
  { name: "Stark Industries", value: 15000 },
  { name: "Wayne Enterprises", value: 9000 },
  { name: "Umbrella Corp", value: 5000 },
]

const topClients = [
  {
    name: "Acme Inc",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acme-logo.png",
    total: 12500,
    invoices: 5,
  },
  {
    name: "Globex Corp",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globex-logo.png",
    total: 8500,
    invoices: 3,
  },
  {
    name: "Stark Industries",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stark-logo.png",
    total: 15000,
    invoices: 6,
  },
]

export function ClientOverview() {
  const { theme } = useTheme()

  const COLORS =
    theme === "dark"
      ? ["#4ade80", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c"]
      : ["#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"]

  return (
    <div className="space-y-6">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
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

      <div>
        <h3 className="text-sm font-medium mb-4">Top Clients</h3>
        <div className="space-y-4">
          {topClients.map((client) => (
            <div key={client.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.invoices} invoices</p>
                </div>
              </div>
              <p className="text-sm font-medium">${client.total.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

