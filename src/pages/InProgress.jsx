import React from 'react'
import TaskTable from '../components/TaskTable'

export default function InProgress() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">In Progress</h1>
      <TaskTable status="In Progress" />
    </div>
  )
}
