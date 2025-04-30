import React, { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskTable from '../components/TaskTable'
import CreateTaskModal from '../components/CreateTaskModal'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export default function Tasks() {
  const { tasks } = useTasks()
  const [view, setView] = useState('table') // 'table' or 'kanban'
  const [filterStatus, setFilterStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const COLORS = {
    'High': '#ef4444',
    'Medium': '#f59e0b',
    'Low': '#10b981'
  }

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length }
  ]

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Task
        </button>
      </div>

      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <h3 className="text-sm opacity-90">Total Tasks</h3>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
            <h3 className="text-sm opacity-90">Completed</h3>
            <p className="text-2xl font-bold">
              {tasks.filter(t => t.status === 'Completed').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
            <h3 className="text-sm opacity-90">In Progress</h3>
            <p className="text-2xl font-bold">
              {tasks.filter(t => t.status === 'In Progress').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
            <h3 className="text-sm opacity-90">High Priority</h3>
            <p className="text-2xl font-bold">
              {tasks.filter(t => t.priority === 'High').length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="flex space-x-4">
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded ${
                view === 'table' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded ${
                view === 'kanban' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Kanban View
            </button>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Priority Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-2">
              {priorityData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[item.name] }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium">{item.value} tasks</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Table/Kanban */}
        {view === 'table' ? (
          <TaskTable status={filterStatus === 'all' ? undefined : filterStatus} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['To Do', 'In Progress', 'Completed'].map(status => (
              <div key={status} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-4">{status}</h3>
                <div className="space-y-3">
                  {tasks
                    .filter(t => t.status === status)
                    .map(task => (
                      <div key={task.id} className="p-3 bg-gray-50 rounded border hover:shadow-md">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
