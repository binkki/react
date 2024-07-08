import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './components/MainPage/MainPage';
import NotFound from './components/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ),
  },
  {
    path: 'not-found',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="not-found" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
