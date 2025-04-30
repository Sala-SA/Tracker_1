import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskList() {
  const { tasks } = useTasks()

  // Debug useEffect to check task data
  useEffect(() => {
    console.log('Current tasks:', tasks)
  }, [tasks])

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(task.estimatedEndDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Your action buttons */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}