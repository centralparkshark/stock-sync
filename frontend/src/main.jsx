import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import HomePage from './pages/HomePage.jsx'
import InventoryPage, { BASE_URL } from './pages/InventoryPage.jsx'
import ItemPage, { itemLoader } from './pages/ItemPage.jsx'
import TasksPage from './pages/TasksPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
      },
      {
        path: "/upload",
        element: <UploadPage />
      },
      {
        path: "/inventory/:sku",
        element: <ItemPage />,
        loader: ({params}) => {
          return itemLoader(params)
        },
      },
      {
        path: "/inventory",
        element: <InventoryPage />
      },
      {
        path: "/tasks",
        element: <TasksPage />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
