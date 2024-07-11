import { useState, useEffect } from 'react';
import { STORAGE_SEARCH } from '../utils/constants';

export function useLocalStorage() {
  const [searchValue, setSearchValue] = useState(localStorage.getItem(STORAGE_SEARCH) ?? '');

  useEffect(() => {
    localStorage.setItem(STORAGE_SEARCH, searchValue);
  }, [searchValue]);

  const getSearchValue = (): string | null => localStorage.getItem(STORAGE_SEARCH);

  return { setSearchValue, getSearchValue };
}
