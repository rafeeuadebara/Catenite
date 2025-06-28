import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskForm } from '../../components/TaskForm';
import { BoardContext, type BoardContextType, type Task } from '../../context/BoardContext';

describe('TaskForm Component', () => {
  const addTaskSpy = jest.fn();

  beforeEach(() => {

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
        <TaskForm />
      </BoardContext.Provider>
    );
    addTaskSpy.mockClear();
  });

  test('renders form fields correctly', () => {
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Due Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', () => {
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2020-01-01' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(screen.getByText('you need to input the title')).toBeInTheDocument();
    expect(screen.getByText('please include a description')).toBeInTheDocument();
    expect(screen.getByText("your date can't be in the past")).toBeInTheDocument();
    
  });

 
});