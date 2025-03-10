import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const goals = [
  {
    id: 1,
    title: "Increase Revenue",
    target: "$10M",
    progress: 75,
    dueDate: "Dec 2023",
    status: "On Track",
  },
  {
    id: 2,
    title: "Reduce Expenses",
    target: "15%",
    progress: 60,
    dueDate: "Nov 2023",
    status: "At Risk",
  },
  {
    id: 3,
    title: "Customer Satisfaction",
    target: "95%",
    progress: 88,
    dueDate: "Dec 2023",
    status: "On Track",
  },
  {
    id: 4,
    title: "Employee Retention",
    target: "90%",
    progress: 92,
    dueDate: "Jan 2024",
    status: "On Track",
  },
  {
    id: 5,
    title: "Market Expansion",
    target: "3 Regions",
    progress: 40,
    dueDate: "Mar 2024",
    status: "Behind",
  },
]

export function OrganizationGoals() {
  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "At Risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Behind":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">{goal.title}</h4>
              <p className="text-xs text-muted-foreground">Target: {goal.target}</p>
            </div>
            <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
          </div>
          <Progress value={goal.progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{goal.progress}% complete</span>
            <span>Due: {goal.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

