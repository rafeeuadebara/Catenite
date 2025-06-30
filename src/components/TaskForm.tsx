import { useState, useEffect } from "react";
import { useBoard, type Task } from "../context/BoardContext";



interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
}

interface formError {
    title: boolean; 
    description: boolean; 
    dueDate: boolean
}


export function TaskForm() {

    const { tasks, editing, editingTaskId, addTask, editTask } = useBoard();

    const [formData, setFormData] = useState<TaskFormData>({title: "", description:"", dueDate: "", })
    const [error, setError] = useState<formError>({title: false, description: false, dueDate: false})


    const handleError = (): boolean => {

        const dataError: formError = {
                title: false,
                description: false,
                dueDate: false,
        };

        

        if(formData.title.trim() === "") {
            dataError.title = true;
        }

        if (formData.description.trim() === "") {
            dataError.description = true;
        }
            
        const selectedDate = new Date(formData.dueDate);
        const today = new Date();
        
        today.setHours(0,0,0,0);
        if (isNaN(selectedDate.getTime()) || selectedDate < today) {
            dataError.dueDate = true;
        }

       
        setError(dataError);

        return dataError.title || dataError.description || dataError.dueDate;
    }


    const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setFormData((prev) => ({
            ...prev,
           [e.target.name]: e.target.value
        }));

    }


    const taskToEdit = editingTaskId ? tasks.find(t => t.id === editingTaskId) || null : null;


    useEffect(() => {
        if (editing && taskToEdit) {
            setFormData({
            title: taskToEdit.title,
            description: taskToEdit.description,
            dueDate: taskToEdit.dueDate,
            });
        }
    }, [editing, taskToEdit]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const hasError = handleError();
        if (!hasError) {

            if (editing && taskToEdit) {
               editTask({ ...taskToEdit, ...formData });
               setFormData({ title: "", description: "", dueDate: "" });
            } else {
                addTask(formData);
                setFormData({ title: "", description: "", dueDate: "" });
            }
            
        }

    }

    return (


        <>
            
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Task Form</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-blue-50 p-6 rounded-2xl shadow-md w-full max-w-md"> 
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFormData}

                    /> 
                    {error.title && <span className="text-red-700">you need to input the title</span>}
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        placeholder="Due Date"
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFormData}
                    />
                    {error.dueDate && <span className="text-red-700">your date can't be in the past</span>}
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        className="px-4 py-2 border border-blue-300 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFormData}
                    ></textarea>
                    {error.description && <span className="text-red-700">please include a description</span>}
                    <button type="submit">{editing ? 'Edit Task' : 'Add Task'}</button>
                </form>
            </div>
        </>

        
    )

}




