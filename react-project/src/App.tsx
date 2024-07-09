import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './components/MainPage/MainPage';
import NotFound from './components/NotFound/NotFound';
import { characterLoader } from './components/MainPage/MainPageLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="characters?page=1" replace />,
  },
  {
    path: 'characters',
    errorElement: <NotFound />,
    element: (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ),
    loader: characterLoader,
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
