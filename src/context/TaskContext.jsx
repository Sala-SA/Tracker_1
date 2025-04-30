import React, { createContext, useState, useContext, useEffect } from 'react'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        title: 'Complete Project Setup',
        description: 'Set up initial project structure and dependencies',
        status: 'In Progress',
        priority: 'High',
        dueDate: '2025-05-15',
        assignees: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Design User Interface',
        description: 'Create wireframes and design mockups',
        status: 'To Do',
        priority: 'Medium',
        dueDate: '2025-05-20',
        assignees: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Implement Authentication',
        description: 'Add user login and registration',
        status: 'To Do',
        priority: 'High',
        dueDate: '2025-05-25',
        assignees: [],
        createdAt: new Date().toISOString()
      }
    ]
  })

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask) => {
    setTasks(prevTasks => [
      ...prevTasks,
      {
        ...newTask,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'To Do'
      }
    ])
  }

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          // Auto-update actual dates based on status
          let actualDates = {}
          
          if (updatedTask.status === 'In Progress' && task.status !== 'In Progress') {
            // Task just started
            actualDates.actualStartDate = new Date().toISOString().split('T')[0]
          }
          
          if (updatedTask.status === 'Completed' && task.status !== 'Completed') {
            // Task just completed
            actualDates.actualEndDate = new Date().toISOString().split('T')[0]
          }

          // Reset actual dates if moved back to To Do
          if (updatedTask.status === 'To Do') {
            actualDates = {
              actualStartDate: '',
              actualEndDate: ''
            }
          }

          return {
            ...task,
            ...updatedTask,
            ...actualDates
          }
        }
        return task
      })
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => useContext(TaskContext)