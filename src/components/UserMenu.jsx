import React from 'react'

export default function UserMenu() {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
      </ul>
    </div>
  )
}
