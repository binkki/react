import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';
import NotFound from '../pages/NotFound/NotFound';

describe('Character Item Component', () => {
  const router = createMemoryRouter([
    { path: '/', element: <Navigate to="/not-found" replace /> },
    {
      path: 'not-found',
      element: <NotFound />,
    },
    { path: '*', element: <Navigate to="not-found" replace /> },
  ]);

  const renderWithProvider = () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    );
  };

  it('Renders not found page', async () => {
    renderWithProvider();
    const notFount = screen.getByTestId('not-found');
    expect(notFount).toBeInTheDocument();
  });
});
