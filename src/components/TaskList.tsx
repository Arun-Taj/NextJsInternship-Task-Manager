"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";

export default function TaskList() {
  const { tasks, editTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low" as "High" | "Medium" | "Low",
  });

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleEditClick = (task: (typeof tasks)[number]) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
  };

  const handleSave = (id: string) => {
    editTask?.(id, editedTask);
    setEditingTaskId(null);
  };

  const handleCancel = () => setEditingTaskId(null);

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Filter Buttons */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        {(["all", "completed", "pending"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              filter === f
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`group p-4 border rounded-xl transition-all ${
              task.completed
                ? "bg-gray-50 border-gray-200"
                : "bg-white border-gray-200 hover:border-blue-200 hover:shadow-lg"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
              {/* Main Content */}
              <div className="flex-1 space-y-3">
                {/* Title and Priority */}
                <div className="flex flex-wrap items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    {task.completed && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </button>

                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                      className="flex-1 text-lg font-semibold border-b-2 border-blue-500 focus:outline-none py-1"
                    />
                  ) : (
                    <h3
                      className={`flex-1 text-base md:text-lg font-semibold ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </h3>
                  )}

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {editingTaskId === task.id ? (
                      <select
                        value={editedTask.priority}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            priority: e.target.value as
                              | "High"
                              | "Medium"
                              | "Low",
                          })
                        }
                        className="bg-transparent focus:outline-none cursor-pointer"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    ) : (
                      task.priority
                    )}
                  </span>
                </div>

                {/* Description and Due Date */}
                <div className="ml-9 sm:ml-8 space-y-2">
                  {editingTaskId === task.id ? (
                    <>
                      <textarea
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm h-32 resize-y"
                        placeholder="Add description..."
                      />
                      <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            dueDate: e.target.value,
                          })
                        }
                        className="p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </>
                  ) : (
                    <>
                      {task.description && (
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>📅</span>
                        <span>
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 sm:gap-3 justify-end sm:items-center">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleSave(task.id)}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                      title="Save changes"
                    >
                      <FaSave className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                      title="Cancel editing"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                      title="Edit task"
                    >
                      <FaRegEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
