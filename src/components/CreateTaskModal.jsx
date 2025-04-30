import React, { useState, useEffect } from 'react'
import { useTeam } from '../context/TeamContext'
import { useTasks } from '../context/TaskContext'

export default function CreateTaskModal({ isOpen, onClose }) {
  const { teamMembers } = useTeam()
  const { addTask } = useTasks()
  
  // Modify the initial state to remove estimatedEndDate and dueDate
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    estimatedStartDate: '',
    estimatedEndDate: '', // Added this line
    actualStartDate: '',
    actualEndDate: '',
    assignees: [],
    progress: 0
  })

  // Add console log to debug
  useEffect(() => {
    console.log('Team Members:', teamMembers)
  }, [teamMembers])

  // Update the reset state in handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(task)
    onClose()
    setTask({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium',
      estimatedStartDate: '',
      estimatedEndDate: '', // Added this line
      actualStartDate: '',
      actualEndDate: '',
      assignees: [],
      progress: 0
    })
  }

  const toggleAssignee = (memberId) => {
    console.log('Toggling member:', memberId)
    setTask(prev => ({
      ...prev,
      assignees: prev.assignees.includes(memberId)
        ? prev.assignees.filter(id => id !== memberId)
        : [...prev.assignees, memberId]
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative bg-white rounded-lg w-full max-w-6xl m-4">
        <div className="sticky top-0 bg-white p-6 border-b z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Create New Task</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4 min-w-max">
              {/* Left Column */}
              <div className="flex-1 space-y-4 min-w-[300px]">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => setTask({...task, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={task.description}
                    onChange={(e) => setTask({...task, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({...task, priority: e.target.value})}
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
                  <label className="block text-sm font-medium mb-1">Estimated Start Date</label>
                  <input
                    type="date"
                    value={task.estimatedStartDate}
                    onChange={(e) => setTask({...task, estimatedStartDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estimated End Date</label>
                  <input
                    type="date"
                    value={task.estimatedEndDate}
                    onChange={(e) => setTask({...task, estimatedEndDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-4 min-w-[300px] mt-4 md:mt-0">
                <div>
                  <label className="block text-sm font-medium mb-2">Assign Team Members</label>
                  <div className="space-y-2 h-[200px] overflow-y-auto border rounded-lg p-3">
                    {teamMembers && teamMembers.length > 0 ? (
                      teamMembers.map(member => (
                        <label key={member.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={task.assignees.includes(member.id)}
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
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-2">No team members available</p>
                    )}
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
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}