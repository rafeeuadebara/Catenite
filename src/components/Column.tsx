import { useState } from "react";
import { useBoard, type Task } from "../context/BoardContext";
import type { JSX } from "react";
import { type ColumnType } from "../context/BoardContext";

type ColumnProps = {
  mainTitle: ColumnType;
};

export function Column({ mainTitle }: ColumnProps): JSX.Element {
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);


  const { tasks, setTasks, deleteTask, startEditing } = useBoard();



  const columnTasks = tasks.filter((t) => t.status === mainTitle);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string, fromIdx: number, theMainTitle: string) => {

    const payload = { taskId, fromIdx, theMainTitle };
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    console.log("the id ", taskId)
  };


    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, idx: number ) => {
      e.preventDefault();
      setDragOverIdx(idx);
    };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;

    let payload: {
      taskId: string,
      fromIdx: number,
      theMainTitle: string
   };


    try {
      payload = JSON.parse(raw);
    } catch {
      console.error('could not parse drag data', raw);
      return;
    }

    const { taskId, fromIdx, theMainTitle } = payload;

    if(theMainTitle !== mainTitle) {
        const updated = tasks.map(t =>
            t.id === taskId
              ? { ...t, status: mainTitle }
              : t
          );

        setTasks(updated);

      } else if (dragOverIdx !== null) {
      
      
      const newTasks = [...tasks];
     

      const columnPositions = tasks
        .map((t, i) => t.status === mainTitle ? i : -1)
        .filter(i => i !== -1);
      const absoluteFrom = columnPositions[fromIdx];
      const absoluteTo   = columnPositions[dragOverIdx];

      console.log("from ", fromIdx)

      console.log("first", columnPositions)
   
      const [moved] = newTasks.splice(absoluteFrom, 1);
      newTasks.splice(absoluteTo, 0, moved);

      setTasks(newTasks);
    }

  setDragOverIdx(null);

    
  };

  return (
    <section className="flex-shrink-0 w-64 bg-blue-50 rounded-2xl shadow-md p-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-3">{mainTitle}</h2>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="bg-white rounded-lg p-3 shadow-inner space-y-4">
        {columnTasks.length > 0 ? (
          columnTasks.map((task, idx) => (
            <div
              key={task.id}
              draggable
              onDragStart={e => handleDragStart(e, task.id, idx, mainTitle)}
              onDragEnter={e => handleDragEnter(e, idx)}
              className="border p-2 rounded relative"
            >
              <h3 className="text-lg font-medium text-blue-800">{task.title}</h3>

              <div className="absolute top-2 right-2 flex flex-col space-x-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Edit task"
                  >
                    ✏️
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Delete task"
                    onClick={() => deleteTask(task)}
                  >
                    🗑️
                  </button>
              </div>

              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              <span className="text-xs text-gray-400 mt-2 block">{task.dueDate}</span>
            </div>
          ))
        ) : (
          <div className="border p-2 rounded text-center text-gray-400">
            No tasks here
          </div>
        )}
      </div>
    </section>
  );
}




 


