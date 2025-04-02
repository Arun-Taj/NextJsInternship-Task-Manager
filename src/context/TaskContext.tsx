"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  editTask: (id: string, updatedTask: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage when the provider mounts.
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage whenever tasks change.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task with a generated id and default 'completed' value.
  const addTask = (task: Omit<Task, "id" | "completed">) => {
    setTasks([
      ...tasks,
      { ...task, id: crypto.randomUUID(), completed: false },
    ]);
  };

  // Edit an existing task with partial updates (except 'id').
  const editTask = (id: string, updatedTask: Partial<Omit<Task, "id">>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Delete a task after a confirmation.
  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Toggle the 'completed' status of a task.
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
}
