import React, { useState } from 'react'
import { useTeam } from '../context/TeamContext'
import { useTasks } from '../context/TaskContext'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import AddMemberModal from '../components/AddMemberModal'

export default function TeamPage() {
  const { teamMembers } = useTeam()
  const { tasks } = useTasks()
  const [selectedMember, setSelectedMember] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getMemberStats = (memberId) => {
    const memberTasks = tasks.filter(t => t.assignees.includes(memberId))
    return {
      total: memberTasks.length,
      completed: memberTasks.filter(t => t.status === 'Completed').length,
      inProgress: memberTasks.filter(t => t.status === 'In Progress').length,
      todo: memberTasks.filter(t => t.status === 'To Do').length,
      performance: memberTasks.length 
        ? Math.round((memberTasks.filter(t => t.status === 'Completed').length / memberTasks.length) * 100)
        : 0
    }
  }

  const performanceData = teamMembers?.map(member => ({
    name: member.name,
    completed: tasks.filter(t => t.assignees.includes(member.id) && t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.assignees.includes(member.id) && t.status === 'In Progress').length,
    todo: tasks.filter(t => t.assignees.includes(member.id) && t.status === 'To Do').length
  }))

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <h3 className="text-sm opacity-90">Team Members</h3>
          <p className="text-2xl font-bold">{teamMembers?.length || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <h3 className="text-sm opacity-90">Active Members</h3>
          <p className="text-2xl font-bold">
            {teamMembers?.filter(m => m.status === 'Active').length || 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <h3 className="text-sm opacity-90">Avg Performance</h3>
          <p className="text-2xl font-bold">
            {Math.round(
              teamMembers?.reduce((acc, member) => 
                acc + getMemberStats(member.id).performance, 0
              ) / (teamMembers?.length || 1)
            )}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
          <h3 className="text-sm opacity-90">Total Tasks</h3>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
            <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
            <Bar dataKey="todo" stackId="a" fill="#6b7280" name="To Do" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers?.map(member => {
          const stats = getMemberStats(member.id)
          return (
            <div 
              key={member.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{member.avatar}</span>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
                  member.status === 'Active' ? 'bg-green-100 text-green-800' :
                  member.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {member.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Performance</span>
                  <span className="font-medium">{stats.performance}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${stats.performance}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-medium">{stats.total}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Active</p>
                    <p className="font-medium">{stats.inProgress}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Done</p>
                    <p className="font-medium">{stats.completed}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Member Modal */}
      <AddMemberModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}
