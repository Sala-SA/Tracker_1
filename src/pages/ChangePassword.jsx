import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ChangePassword() {
  const { changePassword } = useAuth()
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      await changePassword(passwords.oldPassword, passwords.newPassword)
      setSuccess(true)
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded">
            Password successfully changed!
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwords.oldPassword}
              onChange={e =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={e =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwords.confirmPassword}
              onChange={e =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}
