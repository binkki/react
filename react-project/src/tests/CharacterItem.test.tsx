import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { testCharacterList } from './testData';
import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import CharacterItem from '../pages/MainPage/CharacterItem';
import { getCharacterImageUrl } from '../utils/utils';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';
import userEvent from '@testing-library/user-event';

describe('Character Item Component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    const router = createBrowserRouter([
      { path: '*', element: <CharacterItem character={testCharacterList[0]} /> },
    ]);
    render(<RouterProvider router={router} />);

    const characterImage = screen.getByRole('img');
    expect(characterImage).toHaveAttribute('src', getCharacterImageUrl(testCharacterList[0].url));

    const characterName = screen.getAllByText(testCharacterList[0].name);
    expect(characterName.length).toBe(1);
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
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
