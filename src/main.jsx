import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
import './index.css'
import Simulation from './pages/simulation.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: 'simulation',
    element: <Simulation/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
