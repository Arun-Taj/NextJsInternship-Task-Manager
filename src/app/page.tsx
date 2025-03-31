'use client'

import { TaskProvider } from '@/context/TaskContext'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <TaskProvider>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Task Manager</h1>
        <TaskForm />
        <TaskList />
      </main>
    </TaskProvider>
  )
}