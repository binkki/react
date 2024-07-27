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
  detailsCharacter: {
    name: '',
    height: '',
    eye_color: '',
    hair_color: '',
    skin_color: '',
    mass: '',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [''],
    vehicles: [''],
    species: [''],
    starships: [''],
    created: '',
    edited: '',
    url: '',
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
