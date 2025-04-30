import React, { useState, useEffect } from 'react'

export default function TimeTracker({ taskId, onTimeUpdate }) {
  const [isTracking, setIsTracking] = useState(false)
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    let interval
    if (isTracking) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  const handleToggle = () => {
    if (!isTracking) {
      setIsTracking(true)
    } else {
      setIsTracking(false)
      onTimeUpdate(taskId, time)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleToggle}
        className={`px-3 py-1 rounded ${
          isTracking ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}
      >
        {isTracking ? 'Stop' : 'Start'} Time
      </button>
      <span className="font-mono">
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </span>
    </div>
  )
}