import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CHARACTER_URL } from '../../utils/constants';
import { Character, CharacterApiResponse } from '../../types';

export const characterApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: CHARACTER_URL }),
  endpoints: (build) => ({
    getCharacterList: build.query<CharacterApiResponse, { search: string; page: number }>({
      query: ({ search, page }) => `?page=${page}&search=${search}`,
    }),
    getCharacter: build.query<Character, { id: number }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const { useGetCharacterListQuery, useGetCharacterQuery } = characterApi;
