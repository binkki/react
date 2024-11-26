import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';

describe('Pagination Component', () => {
  const router = createMemoryRouter([
    { path: '/', element: <Navigate to="/1" replace /> },
    {
      path: '/:pageId',
      element: (
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      ),
    },
    { path: '/:pageId/:detailsId', element: <DetailsPage /> },
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

  it('Make sure the component updates URL query parameter when page changes', async () => {
    renderWithProvider();

    await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    const nextButton = screen.getAllByText(`>`);
    await act(async () => {
      await userEvent.click(nextButton[0]);
    });

    await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    const currentPageNumber = screen.getByTestId('pagination-page');
    expect(currentPageNumber.textContent).toBe('2');
  });
});
