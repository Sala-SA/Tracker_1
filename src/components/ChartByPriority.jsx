import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'

export default function ChartByPriority() {
  const data = [
    { priority: 'High',   total: 2400 },
    { priority: 'Medium', total: 1900 },
    { priority: 'Low',    total: 2200 },
  ]

  return (
    <div className="bg-white shadow rounded p-4 my-6">
      <h2 className="text-lg font-semibold mb-4">Chart by Priority</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
