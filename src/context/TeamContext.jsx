import React, { createContext, useState, useContext, useEffect } from 'react'

const TeamContext = createContext()

export function TeamProvider({ children }) {
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedMembers = localStorage.getItem('teamMembers')
    return savedMembers ? JSON.parse(savedMembers) : []
  })

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers))
  }, [teamMembers])

  const addMember = (newMember) => {
    const memberWithId = {
      ...newMember,
      id: Date.now(),
      status: 'Active'
    }
    setTeamMembers(prev => [...prev, memberWithId])
  }

  const updateMemberStatus = (memberId, newStatus) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    )
  }

  return (
    <TeamContext.Provider value={{ teamMembers, addMember, updateMemberStatus }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useTeam = () => {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider')
  }
  return context
}