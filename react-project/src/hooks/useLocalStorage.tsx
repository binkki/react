import { useState, useEffect } from 'react';
import { STORAGE_SEARCH } from '../utils/constants';

export function useLocalStorage() {
  const [localValue, setLocalValue] = useState(localStorage.getItem(STORAGE_SEARCH) ?? '');

  useEffect(() => {
    localStorage.setItem(STORAGE_SEARCH, localValue);
  }, [localValue]);

  const getLocalValue = (): string | null => localStorage.getItem(STORAGE_SEARCH);

  return { localValue, setLocalValue, getLocalValue };
}
