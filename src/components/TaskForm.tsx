"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { HiChevronDown } from "react-icons/hi";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium" as "High" | "Medium" | "Low",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;
    addTask(formData);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out"
    >
      <div className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none"
            required
          />
        </div>

        {/* Date and Priority Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>

          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Priority Level
            </label>
            <div className="relative">
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value as any })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer pr-10"
              >
                <option value="High" className="text-red-500">
                  High Priority
                </option>
                <option value="Medium" className="text-yellow-500">
                  Medium Priority
                </option>
                <option value="Low" className="text-green-500">
                  Low Priority
                </option>
              </select>
              <HiChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Task Description 
          </label>
          <textarea
            placeholder="Describe your task..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none resize-y min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
