import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/tasks', label: 'Tasks' },
    { to: '/completed', label: 'Completed' },
    { to: '/in-progress', label: 'In Progress' },
    { to: '/to-do', label: 'To Do' },
    { to: '/team', label: 'Team' },
    { to: '/trash', label: 'Trash' },
  ]

  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 w-64 bg-white shadow h-screen p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-8">TaskMe</h2>
        <nav className="space-y-2">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="pl-64"> {/* Add left padding equal to sidebar width */}
        {/* Your main content */}
      </div>
    </div>
  )
}