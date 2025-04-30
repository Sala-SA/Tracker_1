import React from 'react'
import { useTasks } from '../context/TaskContext'
import StatsCards from './StatsCards'

export default function Dashboard() {
  const { tasks } = useTasks()

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    highPriority: tasks.filter(task => task.priority === 'High').length
  }

  // Calculate percentages for progress
  const completionRate = Math.round((stats.completed / stats.total) * 100) || 0

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-blue-800 font-medium">Total Tasks</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-green-800 font-medium">Completed</h3>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-yellow-800 font-medium">In Progress</h3>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
        </div>
        
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-red-800 font-medium">High Priority</h3>
          <p className="text-2xl font-bold">{stats.highPriority}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{completionRate}% Complete</p>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Recent Tasks</h3>
        <div className="space-y-2">
          {tasks.slice(0, 5).map(task => (
            <div key={task.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.status}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}