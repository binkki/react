import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { testCharacterList } from './testData';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import { getCharacterImageUrl } from '../utils/utils';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';
import { Character } from '../types';

describe('Character Item Component', () => {
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

  it('Ensure that the card component renders the relevant card data', async () => {
    renderWithProvider();
    await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    const characterImages = await screen.findAllByRole('img');

    testCharacterList.map((x: Character, _: number) => {
      const characterName = screen.getAllByText(x.name);
      expect(characterName.length).toBe(1);
      expect(characterImages[_].getAttribute('src')).toBe(getCharacterImageUrl(x.url));
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderWithProvider();

    const items = await waitFor(
      () => {
        return screen.findAllByTestId('character-list');
      },
      {
        timeout: 50000,
      }
    );

    await act(async () => {
      await userEvent.click(items[0]);
    });

    const detailsItem = await waitFor(
      () => {
        return screen.findAllByTestId('character-details');
      },
      {
        timeout: 50000,
      }
    );
    expect(detailsItem.length).toBe(1);
  });
});
