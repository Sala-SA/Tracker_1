import React from 'react'
import TaskTable from '../components/TaskTable'

export default function Completed() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Completed</h1>
      <TaskTable status="Completed" />
    </div>
  )
}
