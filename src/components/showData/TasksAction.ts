import { Todo as Task } from "../../types/index";
import { toast } from "react-toastify";

export function deleteTask(id: number): void {
  const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");
  const updatedToDo = storedData.filter((task) => task.id !== id);
  localStorage.setItem("toDo", JSON.stringify(updatedToDo));
  toast("Task deleted successfully", {
    style: {
      background: "white",
      color: "black",
      fontSize: "15px",
      fontFamily: "Cairo, sans-serif",
      fontWeight: "bold",
    },
    progressStyle: {
      background: "red",
    },
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

export function setCompleted(id: number): void {
  const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");
  const updatedData = storedData.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("toDo", JSON.stringify(updatedData));
  toast("Task status changed successfully", {
    style: {
      background: "white",
      color: "black",
      fontSize: "15px",
      fontFamily: "Cairo, sans-serif",
      fontWeight: "bold",
    },
    progressStyle: {
      background: "red",
    },
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
