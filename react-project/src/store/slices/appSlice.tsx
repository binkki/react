import { createSlice } from '@reduxjs/toolkit';
import { AppSlice, Character } from '../../types';
import { DEFAULT_CHARACTERS, DEFAULT_PAGE, STORAGE_SEARCH } from '../../utils/constants';

const initialState: AppSlice = {
  page: DEFAULT_PAGE,
  characters: DEFAULT_CHARACTERS,
  bookmarkedCharacters: [],
  detailsCharacterId: 1,
  searchValue: localStorage.getItem(STORAGE_SEARCH) ?? '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCharacterApiResult: (state, action) => {
      state.characters = action.payload;
    },
    addBookmark: (state, action) => {
      state.bookmarkedCharacters.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkedCharacters = state.bookmarkedCharacters.filter(
        (x: Character) => x.name !== action.payload
      );
    },
    removeAllBookmark: (state) => {
      state.bookmarkedCharacters = [];
    },
    setDetailsCharacterId: (state, action) => {
      state.detailsCharacterId = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setPage,
  setCharacterApiResult,
  addBookmark,
  removeBookmark,
  removeAllBookmark,
  setDetailsCharacterId,
  setSearchValue,
} = appSlice.actions;

export default appSlice.reducer;
