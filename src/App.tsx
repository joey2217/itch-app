import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import { RecoilRoot } from 'recoil'

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
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App
