import React from 'react'
import {
  AiOutlineFolderOpen,
  AiOutlineCheckCircle,
  AiOutlineLoading3Quarters,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { tasks } from '../data/tasksData'

export default function StatsCards() {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'Completed').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const todos = tasks.filter(t => t.status === 'To Do').length

  const stats = [
    { label: 'Total Tasks', value: total, icon: <AiOutlineFolderOpen size={24} className="text-blue-600" /> },
    { label: 'Completed', value: completed, icon: <AiOutlineCheckCircle size={24} className="text-green-600" /> },
    { label: 'In Progress', value: inProgress, icon: <AiOutlineLoading3Quarters size={24} className="text-yellow-600 animate-spin-slow" /> },
    { label: 'To-Dos', value: todos, icon: <AiOutlineUnorderedList size={24} className="text-indigo-600" /> },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((s, idx) => (
        <div key={idx} className="bg-white shadow rounded p-4 flex items-center space-x-4">
          <div className="p-2 bg-gray-100 rounded">{s.icon}</div>
          <div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-gray-500">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}