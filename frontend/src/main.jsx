import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import ErrorPage from './pages/errorPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import HomePage from './pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/upload",
    element: <UploadPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
