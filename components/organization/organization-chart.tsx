"use client"

import { useTheme } from "next-themes"
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, Position } from "reactflow"
import "reactflow/dist/style.css"

// Custom node component
const CustomNode = ({ data }) => {
  const { theme } = useTheme()
  const bgColor = theme === "dark" ? "#1e293b" : "#ffffff"
  const borderColor = theme === "dark" ? "#334155" : "#e2e8f0"
  const textColor = theme === "dark" ? "#f8fafc" : "#0f172a"
  const subtextColor = theme === "dark" ? "#94a3b8" : "#64748b"

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        padding: "10px",
        width: "180px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontWeight: "bold", color: textColor }}>{data.label}</div>
      <div style={{ fontSize: "12px", color: subtextColor }}>{data.role}</div>
      {data.department && (
        <div
          style={{
            fontSize: "10px",
            marginTop: "4px",
            padding: "2px 6px",
            borderRadius: "4px",
            background: theme === "dark" ? "#334155" : "#f1f5f9",
            color: subtextColor,
            display: "inline-block",
          }}
        >
          {data.department}
        </div>
      )}
    </div>
  )
}

export function OrganizationChart() {
  // Define the initial nodes
  const initialNodes = [
    {
      id: "1",
      type: "custom",
      data: {
        label: "John Smith",
        role: "CEO",
      },
      position: { x: 400, y: 0 },
      sourcePosition: Position.Bottom,
    },
    {
      id: "2",
      type: "custom",
      data: {
        label: "Alice Johnson",
        role: "Finance Director",
        department: "Finance",
      },
      position: { x: 100, y: 100 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    },
    {
      id: "3",
      type: "custom",
      data: {
        label: "Bob Smith",
        role: "Marketing Manager",
        department: "Marketing",
      },
      position: { x: 300, y: 100 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    },
    {
      id: "4",
      type: "custom",
      data: {
        label: "Diana Martinez",
        role: "CTO",
        department: "Technology",
      },
      position: { x: 500, y: 100 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    },
    {
      id: "5",
      type: "custom",
      data: {
        label: "Ethan Williams",
        role: "Sales Director",
        department: "Sales",
      },
      position: { x: 700, y: 100 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
    },
    {
      id: "6",
      type: "custom",
      data: {
        label: "Charlie Brown",
        role: "Operations Lead",
        department: "Operations",
      },
      position: { x: 400, y: 200 },
      targetPosition: Position.Top,
    },
    {
      id: "7",
      type: "custom",
      data: {
        label: "Fiona Garcia",
        role: "HR Manager",
        department: "HR",
      },
      position: { x: 600, y: 200 },
      targetPosition: Position.Top,
    },
  ]

  // Define the connections between nodes
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e1-4", source: "1", target: "4" },
    { id: "e1-5", source: "1", target: "5" },
    { id: "e4-6", source: "4", target: "6" },
    { id: "e5-7", source: "5", target: "7" },
  ]

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  const nodeTypes = {
    custom: CustomNode,
  }

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

