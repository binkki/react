import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
