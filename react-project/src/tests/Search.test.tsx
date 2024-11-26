import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { STORAGE_SEARCH } from '../utils/constants';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';

describe('Search Component', () => {
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

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProvider();
    await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    const testInputValue = 'check saving to ls by click';

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: testInputValue } });

    const searchButton = screen.getByTestId('search-button');
    await userEvent.click(searchButton);

    const newLsValue = localStorage.getItem(STORAGE_SEARCH);
    expect(newLsValue).toBe(testInputValue);
  });
  /*
  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const testInputValue = 'check retrieve value upon mount';
    const testPlaceholderValue = `Search result for '${testInputValue}'`;
    localStorage.setItem(STORAGE_SEARCH, testInputValue);
    renderWithProvider();
    const searchInput = screen.getAllByPlaceholderText(testPlaceholderValue);
    expect(searchInput.length).toBe(1);
  });*/
});
