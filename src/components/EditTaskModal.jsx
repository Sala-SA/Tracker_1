import React, { useState, useEffect } from 'react'
import { useTeam } from '../context/TeamContext'

export default function EditTaskModal({ isOpen, onClose, task, onSave }) {
  const { teamMembers } = useTeam()
  const [editedTask, setEditedTask] = useState(task)

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  const toggleAssignee = (memberId) => {
    setEditedTask(prev => ({
      ...prev,
      assignees: prev.assignees.includes(memberId)
        ? prev.assignees.filter(id => id !== memberId)
        : [...prev.assignees, memberId]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedTask)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({...editedTask, status: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Team Members Assignment Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Assign Team Members</label>
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
              {teamMembers?.map(member => (
                <label key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editedTask.assignees?.includes(member.id)}
                    onChange={() => toggleAssignee(member.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{member.avatar}</span>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Estimated Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Start Date</label>
              <input
                type="date"
                value={editedTask.estimatedStartDate}
                onChange={(e) => setEditedTask({...editedTask, estimatedStartDate: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estimated End Date</label>
              <input
                type="date"
                value={editedTask.estimatedEndDate}
                onChange={(e) => setEditedTask({...editedTask, estimatedEndDate: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Actual Dates (Read-only) */}
          {(editedTask.actualStartDate || editedTask.actualEndDate) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Actual Start Date</label>
                <input
                  type="date"
                  value={editedTask.actualStartDate}
                  className="w-full px-3 py-2 bg-gray-50 border rounded"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Actual End Date</label>
                <input
                  type="date"
                  value={editedTask.actualEndDate}
                  className="w-full px-3 py-2 bg-gray-50 border rounded"
                  disabled
                />
              </div>
            </div>
          )}

          {/* Progress Tracking */}
          <div>
            <label className="block text-sm font-medium mb-1">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={editedTask.progress}
              onChange={(e) => setEditedTask({...editedTask, progress: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}