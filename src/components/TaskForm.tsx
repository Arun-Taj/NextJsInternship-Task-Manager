'use client'

import { useState } from 'react'
import { useTasks } from '@/context/TaskContext'

export default function TaskForm() {
  const { addTask } = useTasks()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.dueDate) return
    addTask(formData)
    setFormData({ title: '', description: '', dueDate: '', priority: 'Medium' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <select
          value={formData.priority}
          onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
          className="p-2 border rounded"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="p-2 border rounded overflow-hidden"
          
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  )
}