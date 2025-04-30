import React from 'react'
import TaskTable from '../components/TaskTable'

export default function Trash() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trash</h1>
      <TaskTable status="Trash" />
    </div>
  )
}
