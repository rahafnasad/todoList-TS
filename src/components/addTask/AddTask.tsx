import { useContext, useState } from 'react';
import style from './addTask.module.css';
import { TaskContext } from '../context/taskContext';

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export default function AddTask() {
  const [description, setDescription] = useState<string>(''); 
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("AddTask must be used within a TaskContextProvider");
  }

  const { status, setStatus } = context;

  const addTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); 
    if (description.trim() === '') {
      alert('Please enter a task description');
      return;
    }

    const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");

    // Get the first and last task IDs, if available
    const lastTask: Task | null = storedData.length > 0 ? storedData[storedData.length - 1] : null;
    const firstTask: Task | null = storedData.length > 0 ? storedData[0] : null;
    
    const lastId = lastTask ? lastTask.id : 0;
    const firstId = firstTask ? firstTask.id : 0;
    
    // Create a new task with a new ID
    const newTask: Task = {
      id: Math.max(firstId, lastId) + 1, // Increment the maximum of first and last ID
      todo: description, 
      completed: false, 
      userId: 1 
    };
    console.log(newTask)

    // Add the new task at the beginning of the array
    storedData.unshift(newTask);

    // Save the updated task list to localStorage
    localStorage.setItem("toDo", JSON.stringify(storedData));

    // Trigger status update to refresh the task list
    setStatus(!status);

    // Clear the input field
    setDescription('');
  };

  return (
    <div className={style.addTask}>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Description"
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
