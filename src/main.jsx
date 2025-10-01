import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import DarkMode from './components/DarkMode.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkMode />
    <App />
  </StrictMode>,
)
