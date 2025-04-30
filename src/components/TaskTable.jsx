import React, { useState, useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import { useTasks } from '../context/TaskContext'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import EditTaskModal from './EditTaskModal'

export default function TaskTable({ status }) {
  const { search } = useContext(SearchContext)
  const { tasks, deleteTask, updateTask } = useTasks()
  const [editingTask, setEditingTask] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Filter tasks based on status and search
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = status ? task.status === status : true
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId)
    setEditingTask(taskToEdit)
    setIsEditModalOpen(true)
  }

  const handleEditComplete = (updatedTask) => {
    updateTask(updatedTask.id, updatedTask)
    setIsEditModalOpen(false)
    setEditingTask(null)
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <tr key={task.id}>
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{task.dueDate}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(task.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingTask(null)
          }}
          task={editingTask}
          onSave={handleEditComplete}
        />
      )}
    </>
  )
}
