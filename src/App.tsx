import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import UncontrolledFormPage from "./pages/UncontrolledFormPage/UncontrolledFormPage";
import ReactHookFormPage from "./pages/ReactHookFormPage/ReactHookFormPage";

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
    <RouterProvider router={router} />
  );
}
