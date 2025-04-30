import React, { useState, useEffect } from 'react'
import { useTeam } from '../context/TeamContext'

export default function EditTaskModal({ isOpen, onClose, task, onSave }) {
  const { teamMembers } = useTeam()
  const [editedTask, setEditedTask] = useState(task)

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative bg-white rounded-lg w-full max-w-6xl m-4">
        <div className="sticky top-0 bg-white p-6 border-b z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Task</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <form onSubmit={(e) => {
            e.preventDefault()
            onSave(editedTask)
          }}>
            <div className="flex flex-col md:flex-row md:space-x-4 min-w-max">
              {/* Left Column */}
              <div className="flex-1 space-y-4 min-w-[300px]">
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
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Middle Column */}
              <div className="flex-1 space-y-4 min-w-[300px] mt-4 md:mt-0">
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
                  <label className="block text-sm font-medium mb-1">Estimated Start Date</label>
                  <input
                    type="date"
                    value={editedTask.estimatedStartDate}
                    onChange={(e) => setEditedTask({...editedTask, estimatedStartDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estimated End Date</label>
                  <input
                    type="date"
                    value={editedTask.estimatedEndDate}
                    onChange={(e) => setEditedTask({...editedTask, estimatedEndDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4 min-w-[300px] mt-4 md:mt-0">
                <div>
                  <label className="block text-sm font-medium mb-2">Assign Team Members</label>
                  <div className="space-y-2 h-[200px] overflow-y-auto border rounded-lg p-3">
                    {teamMembers?.map(member => (
                      <label key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editedTask.assignees.includes(member.id)}
                          onChange={() => {
                            const newAssignees = editedTask.assignees.includes(member.id)
                              ? editedTask.assignees.filter(id => id !== member.id)
                              : [...editedTask.assignees, member.id]
                            setEditedTask({...editedTask, assignees: newAssignees})
                          }}
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
              </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-6 pb-4 flex justify-end space-x-2">
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
    </div>
  )
}