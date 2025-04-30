import React, { useState } from 'react'
import { useTeam } from '../context/TeamContext'

export default function TaskComments({ taskId, comments, onAddComment }) {
  const { teamMembers } = useTeam()
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddComment({
      id: Date.now(),
      taskId,
      text: comment,
      userId: teamMembers[0]?.id, // Replace with actual logged-in user
      timestamp: new Date()
    })
    setComment('')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {comments?.map(comment => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between">
              <span className="font-medium">
                {teamMembers.find(m => m.id === comment.userId)?.name}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Add a comment..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Post
        </button>
      </form>
    </div>
  )
}