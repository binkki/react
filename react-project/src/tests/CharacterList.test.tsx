import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterList from '../pages/MainPage/CharacterList';
import { testCharacterList } from './testData';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EMPTY_DATA } from '../utils/constants';

describe('Card List Component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const router = createBrowserRouter([
      { path: '*', element: <CharacterList characters={testCharacterList} /> },
    ]);
    const { container } = render(<RouterProvider router={router} />);

    const characterItems = container.querySelectorAll('.character-item');
    expect(characterItems.length).toBe(testCharacterList.length);

    const errorMessage = screen.queryAllByText(EMPTY_DATA);
    expect(errorMessage.length).toBe(0);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    const { container } = render(<CharacterList characters={[]} />);

    const characterItems = container.querySelectorAll('.character-item');
    expect(characterItems.length).toBe(0);

    const errorMessage = screen.getAllByText(EMPTY_DATA);
    expect(errorMessage.length).toBe(1);
  });
});
