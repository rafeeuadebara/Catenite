// import { render, screen, fireEvent } from '@testing-library/react';
// import { TaskForm } from '../../components/TaskForm';
// import { BoardContext } from '../../context/BoardContext';


// describe('TaskForm Component', () => {
//   const addTaskSpy = jest.fn();

//   beforeEach(() => {
//     render(
//       <BoardContext.Provider value={{ tasks: [], setTasks: jest.fn(), addTask: addTaskSpy }}>
//         <TaskForm />
//       </BoardContext.Provider>
//     );
//     addTaskSpy.mockClear();
//   });

//   test('renders form fields correctly', () => {
//     expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Due Date')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
//   });

//   test('shows validation errors for invalid inputs', () => {
//     fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: '' } });
//     fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: '' } });
//     fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2020-01-01' } });
//     fireEvent.click(screen.getByText('add Task'));

//     expect(screen.getByText('you need to input the title')).toBeInTheDocument();
//     expect(screen.getByText('please include a description')).toBeInTheDocument();
//     expect(screen.getByText("your date can't be in the past")).toBeInTheDocument();
//     expect(addTaskSpy).not.toHaveBeenCalled();
//   });

//   test('submits valid data and resets form', () => {
//     fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
//     fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Desc' } });
//     fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2099-01-01' } });
//     fireEvent.click(screen.getByText('add Task'));

//     expect(addTaskSpy).toHaveBeenCalledWith({
//       title: 'Test Title',
//       description: 'Test Desc',
//       dueDate: '2099-01-01',
//     });
//     expect(screen.getByPlaceholderText('Title').value).toBe('');
//     expect(screen.getByPlaceholderText('Description').value).toBe('');
//     expect(screen.getByPlaceholderText('Due Date').value).toBe('');
//   });
// });