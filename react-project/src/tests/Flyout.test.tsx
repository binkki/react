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

describe('Flyout Component', () => {
  global.URL.createObjectURL = vi.fn();
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

  it('Should render flyout component if character was bookmarked', async () => {
    renderWithProvider();
    const items = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );

    await act(async () => {
      await userEvent.click(items[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(items[0]);
    });
  });

  it('Should remove flyout if nothing was bookmarked', async () => {
    renderWithProvider();
    const items = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );
    await act(async () => {
      await userEvent.click(items[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(items[0]);
    });

    expect(flyout).not.toBeInTheDocument();
  });

  it('Should remove flyout if unselect all button was clicked', async () => {
    renderWithProvider();
    const items = await waitFor(
      () => {
        return screen.findAllByTestId('bookmark');
      },
      {
        timeout: 50000,
      }
    );
    await act(async () => {
      await userEvent.click(items[0]);
    });

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();

    const unselectButton = screen.getByTestId('flyout-unselect');

    await act(async () => {
      await userEvent.click(unselectButton);
    });

    expect(flyout).not.toBeInTheDocument();
  });
});
