import React, { createContext, useState, type ReactNode, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


export type ColumnType =
  | "Backlog"
  | "Todo"
  | "In Progress"
  | "Review"
  | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: ColumnType;
}

export interface BoardContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  editTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  editing: boolean;
  startEditing: (task: Task) => void;
  editingTaskId: string | null;    
}

// 2. Default values for context
const defaultBoardContext: BoardContextType = {
  tasks: [],
  setTasks: () => {
    throw new Error('setTask must be used within a BoardProvider');
  },
  addTask: () => {
    throw new Error('addTask must be used within a BoardProvider');
  },
  editTask: () => {
    throw new Error('addTask must be used within a BoardProvider');
  },
  deleteTask: () => {
    throw new Error('addTask must be used within a BoardProvider');
  },
  editing: false,
  startEditing: () => {
    throw new Error('addTask must be used within a BoardProvider');
  },
  editingTaskId: "editing task"
};

// 3. the context
export const BoardContext = createContext<BoardContextType>(defaultBoardContext);

// 4. Provider component
export interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('kanban-task', []);
  const [editing, setEditing] = useState<boolean>(false)
  const [editingTaskId, setEditingTaskId] = useState<string|null>(null);


 

    const addTask = useCallback((taskData: Omit<Task, 'id' | 'status'>) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { ...taskData, id: crypto.randomUUID(), status: 'Backlog' }
    ]);
  }, [setTasks]);

  const startEditing = useCallback((task: Task) => {
    setEditing(true);
    setEditingTaskId(task.id);
  }, [setEditing, setEditingTaskId]);

  const editTask = useCallback((updated: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === updated.id ? updated : t)
    );
    setEditing(false);
    setEditingTaskId(null);
  }, [setTasks, setEditing, setEditingTaskId]);

  const deleteTask = useCallback((taskData: Task) => {
    setTasks(prevTasks =>
      prevTasks.filter(t => t.id !== taskData.id)
    );
  }, [setTasks]);



   const contextValue = useMemo<BoardContextType>(() => ({
    tasks,
    setTasks,
    addTask,
    editTask,
    deleteTask,
    editing,
    startEditing,
    editingTaskId,
  }), [tasks, editing, editingTaskId, addTask, editTask, deleteTask, startEditing]);
 

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};


export const useBoard = (): BoardContextType => useContext(BoardContext);