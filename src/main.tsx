import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BoardProvider } from './context/BoardContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BoardProvider>
      <App />
   </BoardProvider>
  </StrictMode>,
)




// https://codesandbox.io/p/sandbox/react-k6lun