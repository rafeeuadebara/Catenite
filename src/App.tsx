import { useState } from 'react'
import './App.css'
import { TaskForm } from './components/TaskForm'
import { Board } from './components/Board'

function App() {
 

  return (
    <>
      <div>The Board</div>
      <TaskForm />
      <Board />
    </>
  )
}

export default App
