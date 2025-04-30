import React, { useState } from 'react'
import { useTeam } from '../context/TeamContext'
import AddMemberModal from './AddMemberModal'

export default function TeamPanel() {
  const { teamMembers, updateMemberStatus } = useTeam()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [task, setTask] = useState({
    // ...other fields
    estimatedEndDate: '', // Instead of dueDate
  })

  if (!teamMembers) return <div>Loading...</div>

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Team Members</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Member
        </button>
      </div>

      <div className="space-y-3">
        {teamMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 border-b">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{member.avatar}</span>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <div className="flex space-x-2 text-sm text-gray-500">
                  <p>{member.role}</p>
                  <span>•</span>
                  <p>{member.estimatedEndDate || 'No end date set'}</p> {/* Changed from dueDate */}
                </div>
              </div>
            </div>
            <select
              value={member.status}
              onChange={(e) => updateMemberStatus(member.id, e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            >
              <option>Active</option>
              <option>On Leave</option>
              <option>Busy</option>
              <option>Offline</option>
            </select>
          </div>
        ))}
      </div>

      <AddMemberModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

// Update any TaskList or Task display components
<div className="text-sm text-gray-600">
  End Date: {task.estimatedEndDate ? new Date(task.estimatedEndDate).toLocaleDateString() : 'Not set'}
</div>
