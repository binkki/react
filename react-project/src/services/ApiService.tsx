import { CharacterApiResponse } from '../types';
import { CHARACTER_URL } from '../utils/constants';

const get = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getCharacters = async (
  page: number,
  search: string
): Promise<CharacterApiResponse> =>
  get(`${CHARACTER_URL}?page=${page}&search=${search}`).then(
    (value: Response) => value.json()
  );
