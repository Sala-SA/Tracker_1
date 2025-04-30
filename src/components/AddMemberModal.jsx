import React, { useState } from 'react'
import { useTeam } from '../context/TeamContext'

export default function AddMemberModal({ isOpen, onClose }) {
  const { addMember } = useTeam()
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    status: 'Active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addMember({
      ...newMember,
      avatar: '👤' // Default avatar
    })
    setNewMember({
      name: '',
      role: '',
      email: '',
      status: 'Active'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Team Member</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              value={newMember.role}
              onChange={(e) => setNewMember({...newMember, role: e.target.value})}
              className="w-full px-3 py-2 border rounded"
              required
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
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}