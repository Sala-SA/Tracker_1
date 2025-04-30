import React, { useState, useRef, useEffect, useContext } from 'react'
import UserMenu from './UserMenu'
import NotificationsMenu from './NotificationsMenu'
import { AiOutlineBell } from 'react-icons/ai'
import { SearchContext } from '../context/SearchContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const menuRef = useRef(null)
  const { search, setSearch } = useContext(SearchContext)

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="text-2xl font-bold">TaskMe</div>

      <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Add this to prevent event bubbling
              setNotificationsOpen(!notificationsOpen);
            }}
            className="relative"
          >
            <AiOutlineBell className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {notificationsOpen && (
            <NotificationsMenu
              open={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center focus:outline-none hover:bg-blue-700"
          >
            SA
          </button>
          {menuOpen && <UserMenu />}
        </div>
      </div>
    </header>
  )
}