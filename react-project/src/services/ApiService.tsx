import { redirect } from 'react-router-dom';
import { Character, CharacterApiResponse } from '../types';
import { CHARACTER_URL } from '../utils/constants';

const get = (url: string): Promise<Response> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getCharacters = async (page: number, search: string): Promise<CharacterApiResponse> =>
  get(`${CHARACTER_URL}?page=${page}&search=${search}`)
    .then((value: Response) => value.json())
    .then((value: CharacterApiResponse) => {
      if (value.detail) {
        redirect('/not-found');
      }
      return value;
    });

export const getCharacterById = async (characterId: number): Promise<Character> =>
  get(`${CHARACTER_URL}/${characterId}`)
    .then((value: Response) => value.json())
    .then((value: Character) => {
      if (value.detail) {
        redirect('/not-found');
      }
      return value;
    });
