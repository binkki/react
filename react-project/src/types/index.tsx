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
  detail?: string;
};

export type CharacterApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
  detail: string;
};

export type AppSlice = {
  page: number;
  characters: CharacterApiResponse;
  bookmarkedCharacters: Character[];
  detailsCharacterId: number;
  searchValue: string;
};
