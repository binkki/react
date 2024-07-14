import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MainPage from './components/MainPage/MainPage';
import NotFound from './components/NotFound/NotFound';
import DetailsPage from './components/DetailsPage/DetailsPage';

export const Root = () => {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/1" replace />,
    errorElement: <NotFound />,
  },
  {
    path: '/:pageId',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/:pageId/:characterId',
        element: <DetailsPage />,
        errorElement: <NotFound />,
      },
    ],
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
