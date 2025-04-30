import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (credentials) => {
    try {
      // Here you would normally make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const userData = {
        id: '1',
        name: 'Demo User',
        email: credentials.email,
        role: 'Admin',
        avatar: '👤'
      }
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (data) => {
    setUser(prev => ({
      ...prev,
      ...data
    }))
  }

  const changePassword = async (oldPassword, newPassword) => {
    try {
      // Here you would normally make an API call to your backend
      // For demo purposes, we'll simulate a successful password change
      return true
    } catch (error) {
      throw new Error('Password change failed')
    }
  }

  const value = {
    user,
    login,
    logout,
    updateProfile,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}