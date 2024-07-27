import { createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types';
import { DEFAULT_CHARACTER_DETAILS, DEFAULT_CHARACTERS, DEFAULT_PAGE } from '../../utils/constants';

const initialState: AppSlice = {
  page: DEFAULT_PAGE,
  isMainLoading: false,
  isDetailsLoading: false,
  isReload: false,
  characters: DEFAULT_CHARACTERS,
  detailsCharacter: DEFAULT_CHARACTER_DETAILS,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setMainLoading: (state, action) => {
      state.isMainLoading = action.payload;
    },
    setDetailLoading: (state, action) => {
      state.isDetailsLoading = action.payload;
    },
    setReload: (state) => {
      state.isReload = !state.isReload;
    },
    setCharacterApiResult: (state, action) => {
      state.characters = action.payload;
    },
    setDetailsCharacter: (state, action) => {
      state.detailsCharacter = action.payload;
    },
  },
});

export const {
  setPage,
  setMainLoading,
  setDetailLoading,
  setReload,
  setCharacterApiResult,
  setDetailsCharacter,
} = appSlice.actions;

export default appSlice.reducer;
