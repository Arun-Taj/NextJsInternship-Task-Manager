'use client'

import { TaskProvider } from '@/context/TaskContext'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
            {/* Header Section */}
            <div className="mb-8 text-center space-y-2 ">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2 shadow-md">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-100 tracking-tight">
                  Task Manager
                </h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                Organize your tasks efficiently and boost productivity
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              <TaskForm />
              <TaskList />
            </div>
          </div>
        </div>
      </main>
    </TaskProvider>
  )
}