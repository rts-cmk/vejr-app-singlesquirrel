import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DarkMode from './components/DarkMode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkMode evt={this} />
    <App />
  </StrictMode>,
)
