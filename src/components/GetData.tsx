import { useContext, useEffect, useState } from "react";
import ShowData from "./showData/ShowData";
import { TaskContext } from "./context/taskContext";
import {Todo} from "../types/index"
export default function GetData() {
  const [data, setData] = useState<Todo[]>([]);

  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("GetData must be used within a TaskContextProvider");
  }

  const { status } = context;

  const getData = async () => {
    if (!localStorage.getItem("toDo")) {
      try {
        const response = await fetch("https://dummyjson.com/todos");
        const { todos } = await response.json();
        setData(todos);
        localStorage.setItem("toDo", JSON.stringify(todos));
      } catch (error) {
        console.log(error);
      }
    } else {
      const storedData: Todo[] = JSON.parse(
        localStorage.getItem("toDo") || "[]"
      );
      setData(storedData);
    }
  };

  useEffect(() => {
    getData();
  }, [status]); 

  return (
    <div>
      <ShowData data={data} />
    </div>
  );
}
