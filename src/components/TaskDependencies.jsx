import React from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskDependencies({ taskId, dependencies, onAddDependency, onRemoveDependency }) {
  const { tasks } = useTasks()
  
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Dependencies</h3>
      <select
        onChange={(e) => onAddDependency(taskId, e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Add dependency...</option>
        {tasks
          .filter(t => t.id !== taskId && !dependencies.includes(t.id))
          .map(task => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))
        }
      </select>
      <div className="space-y-1">
        {dependencies.map(depId => {
          const task = tasks.find(t => t.id === depId)
          return (
            <div key={depId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{task?.title}</span>
              <button
                onClick={() => onRemoveDependency(taskId, depId)}
                className="text-red-600 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}