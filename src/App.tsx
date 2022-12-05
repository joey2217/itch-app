import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
