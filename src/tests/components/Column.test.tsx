import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Column } from '../../components/Column';
import { BoardContext, type BoardContextType, type Task } from '../../context/BoardContext';


describe('Column', () => {
  test('renders an <h3> for each task in the column', () => {
   
    const exampleTask: Task = {
      id: '1',
      title: 'anything goes here',
      description: 'Description works too',
      dueDate: '2025-07-01',
      status: 'Backlog',
    };  

    const deleteTask = jest.fn();
    
    const contextValue: BoardContextType = {
      tasks: [exampleTask],
      setTasks: jest.fn(),
      addTask: jest.fn(),
      editTask: jest.fn(),
      deleteTask,
      startEditing: jest.fn(),
      editing: false,
      editingTaskId: null,
    };

    

   
    render(
      <BoardContext.Provider value={contextValue}>
        <Column mainTitle="Backlog" />
      </BoardContext.Provider>
    );


    expect(screen.getByText('Backlog')).toBeInTheDocument();

    
    const taskHeading = screen.getByRole('heading', { level: 3 });
    const paragraph = screen.getByText(exampleTask.description);
    const date = screen.getByText(exampleTask.dueDate);
    const deleteButton = screen.getByLabelText('Delete task');

    fireEvent.click(deleteButton);


    expect(taskHeading).toBeInTheDocument();
    expect(taskHeading).toHaveTextContent(exampleTask.title);

    expect(paragraph).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();


    expect(deleteTask).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledWith(exampleTask);
   
   



  });
});
