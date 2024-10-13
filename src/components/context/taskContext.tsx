import React, { createContext, useState, ReactNode } from "react";

type TaskContextType = {
  status: boolean;
  setStatus: (status: boolean) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export function TaskContextProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <TaskContext.Provider
      value={{
        status,
        setStatus
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
