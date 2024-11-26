import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { testCharacterList } from './testData';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import { EMPTY_DATA } from '../utils/constants';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeContext';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import MainPage from '../pages/MainPage/MainPage';
import { store } from '../store';

describe('Card List Component', () => {
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

  it('Verify that the component renders the specified number of cards', async () => {
    renderWithProvider();

    const items = await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    expect(items.length).toBe(testCharacterList.length);

    const errorMessage = screen.queryAllByText(EMPTY_DATA);
    expect(errorMessage.length).toBe(0);
  });
});
