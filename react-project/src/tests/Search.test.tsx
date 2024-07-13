import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../components/Search/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { STORAGE_SEARCH } from '../utils/constants';

describe('Search Component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const router = createBrowserRouter([
      { path: '*', element: <Search reload={true} setReload={() => {}} /> },
    ]);
    render(<RouterProvider router={router} />);

    const testInputValue = 'check saving to ls by click';

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: testInputValue } });

    const searchButton = screen.getByRole('button');
    await userEvent.click(searchButton);

    const newLsValue = localStorage.getItem(STORAGE_SEARCH);
    expect(newLsValue).toBe(testInputValue);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    const testInputValue = 'check retrieve value upon mount';
    const testPlaceholderValue = `Search result for '${testInputValue}'`;
    localStorage.setItem(STORAGE_SEARCH, testInputValue);
    const router = createBrowserRouter([
      { path: '*', element: <Search reload={true} setReload={() => {}} /> },
    ]);
    render(<RouterProvider router={router} />);
    const searchInput = screen.getAllByPlaceholderText(testPlaceholderValue);
    expect(searchInput.length).toBe(1);
  });
});
