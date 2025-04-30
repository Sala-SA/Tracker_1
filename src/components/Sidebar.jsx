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
    <aside className="w-64 bg-white shadow h-screen p-4">
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
  )
}