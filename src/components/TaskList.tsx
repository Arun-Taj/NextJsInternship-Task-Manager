"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import {
  
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";

export default function TaskList() {
  // Destructure the tasks and functions from context.
  // Note: updateTask should be defined in your context to update an existing task.
  const { tasks, editTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // State to track which task is currently being edited.
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // State to hold the edited values for the task.
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low" as "High" | "Medium" | "Low",
  });

  // Filter tasks based on the current filter.
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Called when the edit icon is clicked.
  const handleEditClick = (task: (typeof tasks)[number]) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
  };

  // Save changes to the task by calling the context's updateTask function.
  const handleSave = (id: string) => {
    if (editTask) {
      editTask(id, editedTask);
    }
    setEditingTaskId(null);
  };

  // Cancel editing mode.
  const handleCancel = () => {
    setEditingTaskId(null);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${
            filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg ${
              task.completed ? "bg-green-50" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 ">
                {/* Title and Priority */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 flex items-center justify-center border rounded ${
                      task.completed ? "bg-green-500 border-green-500" : ""
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
                      className="text-lg font-semibold border-b border-gray-300 focus:outline-none"
                    />
                  ) : (
                    <h3
                      className={`text-sm md:text-lg lg:text-xl font-semibold ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === "High"
                        ? "bg-red-200 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
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
                      className="text-gray-600 mb-2 w-full border p-1  rounded text-sm md:text-lg lg:text-xl resize-none"
                    />
                    <input
                      type="date"
                      // Assuming dueDate is stored in an ISO string format.
                      value={
                        new Date(editedTask.dueDate).toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          dueDate: e.target.value,
                        })
                      }
                      className="text-sm text-gray-500 border p-1 rounded"
                    />
                  </>
                ) : (
                  <>
                    <div className="text-gray-600 mb-2 max-h-[8rem] overflow-y-auto">
                      {task.description}
                    </div>
                    <p className="text-sm text-black font-semibold">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleSave(task.id)}
                      className="p-2 text-green-500 hover:text-green-700 cursor-pointer"
                    >
                      <FaSave className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      <FaRegEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5" />
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
