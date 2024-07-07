import { ReactNode } from 'react';

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type CharacterApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

export type Planet = {
  name: string;
};

export type PlanetApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export type AppState = {
  searchValue: string;
  characters: Character[];
  loading: boolean;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};
