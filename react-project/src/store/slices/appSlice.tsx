import { createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types';

const initialState: AppSlice = {
  page: 1,
  isMainLoading: false,
  isDetailsLoading: false,
  isReload: false,
  characters: {
    count: 0,
    next: null,
    previous: null,
    results: [],
    detail: '',
  },
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
  },
});

export const { setPage, setMainLoading, setDetailLoading, setReload, setCharacterApiResult } =
  appSlice.actions;

export default appSlice.reducer;
