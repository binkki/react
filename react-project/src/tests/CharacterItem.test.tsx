import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testCharacterList } from './testData';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CharacterItem from '../components/MainPage/CharacterItem';
import { getCharacterImageUrl } from '../utils/utils';

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
});
