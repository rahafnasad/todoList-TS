import { useContext, useState } from "react";
import style from "./addTask.module.css";
import { TaskContext } from "../context/taskContext";
import { Todo as Task } from "../../types/index";
import { toast } from "react-toastify";

export default function AddTask() {
  const [description, setDescription] = useState<string>("");
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("AddTask must be used within a TaskContextProvider");
  }

  const { status, setStatus } = context;

  const addTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (description.trim() === "") {
      alert("Please enter a task description");
      return;
    }

    const storedData: Task[] = JSON.parse(localStorage.getItem("toDo") || "[]");

    // Get the first and last task IDs, if available
    const lastTask: Task | null =
      storedData.length > 0 ? storedData[storedData.length - 1] : null;
    const firstTask: Task | null = storedData.length > 0 ? storedData[0] : null;

    const lastId = lastTask ? lastTask.id : 0;
    const firstId = firstTask ? firstTask.id : 0;

    const newTask: Task = {
      id: Math.max(firstId, lastId) + 1,
      todo: description,
      completed: false,
      userId: 1,
    };

    storedData.unshift(newTask);

    localStorage.setItem("toDo", JSON.stringify(storedData));

    setStatus(!status);
    toast("Task added successfully", {
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
    setDescription("");
  };

  return (
    <div className={style.addTask}>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Description"
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
