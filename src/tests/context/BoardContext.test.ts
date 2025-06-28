import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useBoard, BoardProvider } from '../../context/BoardContext';

describe('BoardContext', () => {
  beforeEach(() => {
    localStorage.clear();
    
   
    Object.defineProperty(window, 'crypto', {
      value: {
        randomUUID: () => '123e4567-e89b-12d3-a456-426614174000',
        subtle: {},
        getRandomValues: () => {},
      },
      writable: true
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(BoardProvider, null, children)
  );

  test('initializes tasks as an empty array', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    expect(result.current.tasks).toEqual([]);
  });

  test('addTask adds a new task with ID and Backlog status', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });

    act(() => {
      result.current.addTask({
        title: 'New Task',
        description: 'Test Desc',
        dueDate: '2023-12-01',
      });
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'New Task',
      description: 'Test Desc',
      dueDate: '2023-12-01',
      status: 'Backlog',
    });
  });
});