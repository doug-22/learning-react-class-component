import { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <PrivateRoute component={<DashboardPage />} />
  }
]);

class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
