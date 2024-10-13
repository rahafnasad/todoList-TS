type Task = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export function deleteTask(id: number): void {
  // Load the tasks from localStorage
  const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");

  // Filter out the task with the given id
  const updatedToDo = storedData.filter((task) => task.id !== id);

  // Save the updated tasks back to localStorage
  localStorage.setItem("toDo", JSON.stringify(updatedToDo));
}

export function setCompleted(id: number): void {
  // Load the tasks from localStorage
  const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");

  // Map over the tasks and toggle the 'completed' status of the task with the given id
  const updatedData = storedData.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );


  // Save the updated tasks back to localStorage
  localStorage.setItem("toDo", JSON.stringify(updatedData));
}
