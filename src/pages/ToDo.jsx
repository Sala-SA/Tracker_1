import React from 'react'
import TaskTable from '../components/TaskTable'

export default function ToDo() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">To Do</h1>
      <TaskTable status="To Do" />
    </div>
  )
}
