import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage/DetailsPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import MainPage from '../pages/MainPage/MainPage';
import userEvent from '@testing-library/user-event';
import { getCharacterImageUrl } from '../utils/utils';
import { testCharacterList } from './testData';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';

describe('Details Component', () => {
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

  it('Ensure that clicking the close button hides the component', async () => {
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

    await waitFor(
      () => {
        return screen.findAllByTestId('character-details');
      },
      {
        timeout: 50000,
      }
    );

    const closeButton = screen.getByTestId('details-close');
    await act(async () => {
      await userEvent.click(closeButton);
    });

    const detailsPage = screen.queryByTestId('character-details');
    expect(detailsPage).not.toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
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

    await waitFor(
      () => {
        return screen.findAllByTestId('character-details');
      },
      {
        timeout: 50000,
      }
    );

    const characterImage = screen.getByRole('img');
    expect(characterImage).toHaveAttribute('src', getCharacterImageUrl(testCharacterList[0].url));

    const characterName = screen.getAllByText(testCharacterList[0].name);
    expect(characterName.length).toBe(1);

    const characterBirthYear = screen.getAllByText(
      `Birth year: ${testCharacterList[0].birth_year}`
    );
    expect(characterBirthYear.length).toBe(1);

    const characterGender = screen.getAllByText(`Gender: ${testCharacterList[0].gender}`);
    expect(characterGender.length).toBe(1);

    const chararacterHeight = screen.getAllByText(`Height: ${testCharacterList[0].height}`);
    expect(chararacterHeight.length).toBe(1);

    const characterMass = screen.getAllByText(`Mass: ${testCharacterList[0].mass}`);
    expect(characterMass.length).toBe(1);

    const characterEye = screen.getAllByText(`Eye color: ${testCharacterList[0].eye_color}`);
    expect(characterEye.length).toBe(1);

    const characterHair = screen.getAllByText(`Hair color: ${testCharacterList[0].hair_color}`);
    expect(characterHair.length).toBe(1);

    const characterSkin = screen.getAllByText(`Skin color: ${testCharacterList[0].skin_color}`);
    expect(characterSkin.length).toBe(1);
  });
});
