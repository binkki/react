import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import DetailsPage from '../components/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../components/MainPage/MainPage';
import userEvent from '@testing-library/user-event';

describe('Details Component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
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
    render(<RouterProvider router={router} />);

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

    let currentPageNumber = screen.getByTestId('pagination-page');
    expect(currentPageNumber.textContent).toBe('2');
  });
});
