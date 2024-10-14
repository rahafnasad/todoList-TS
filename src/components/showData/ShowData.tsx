import style from "./showdata.module.css";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AddTask from "../addTask/AddTask";
import { useContext, useEffect, useState } from "react";
import { deleteTask, setCompleted } from "./TasksAction";
import { TaskContext } from "../context/taskContext";
import { Todo } from "../../types/index";
type props = {
  data: Todo[];
};
export default function ShowData({ data }: props) {
  const numOfTasksEveryPage: number = 7;
  const numOfPages: number = Math.ceil(data.length / numOfTasksEveryPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("GetData must be used within a TaskContextProvider");
  }

  const { status, setStatus } = context;
  const getBackgroundColor = (completed: boolean): string => {
    if (completed) return "Completed";
    else return "NotCompleted";
  };
  const getPagination = (): JSX.Element[] => {
    const listItems: JSX.Element[] = [];

    for (let i = 1; i <= numOfPages; i++) {
      listItems.push(
        <li
          key={i}
          className={`${i == currentPage && "active"}`}
          onClick={() => {
            setCurrentPage(i);
            setStatus(!status);
          }}
        >
          {i}
        </li>
      );
    }

    return listItems;
  };

  useEffect(() => {}, [status]);
  return (
    <div>
      <h1 className={style.header}>Todo List </h1>
      <AddTask />
      <ul className={style.items}>
        {data.length > 0 ? (
          data.map(
            (item, index) =>
              Math.ceil((index + 1) / numOfTasksEveryPage) === currentPage && (
                <li key={index} className={getBackgroundColor(item.completed)}>
                  <div className="d-flex gap-2 align-items-center">
                    <div
                      className={style.isCompleted}
                      onClick={() => {
                        setCompleted(item.id);
                        setStatus(!status);
                      }}
                    >
                      {item.completed ? <FaCheck className="mb-2" /> : ""}
                    </div>
                    <span>{item.todo}</span>
                  </div>
                  <MdDeleteForever
                    title="delete task"
                    className={style.delete}
                    onClick={() => {
                      deleteTask(item.id);
                      setStatus(!status);
                    }}
                  />
                </li>
              )
          )
        ) : (
          <h2>No Data Found</h2>
        )}
      </ul>
      <div className={style.pagination}>
        <ul>{getPagination()}</ul>
      </div>
    </div>
  );
}
