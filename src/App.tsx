import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainPage from './pages/MainPage/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage/UncontrolledFormPage';
import ReactHookFormPage from './pages/ReactHookFormPage/ReactHookFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledFormPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookFormPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
