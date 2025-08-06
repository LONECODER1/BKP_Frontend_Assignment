import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/admin",
      element: <Admin />
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
