import React, { useState } from 'react'

export default function FileUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      // Implement file upload logic here
      const fileData = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      }
      onUpload(fileData)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="sr-only">Choose file</span>
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </label>
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  )
}