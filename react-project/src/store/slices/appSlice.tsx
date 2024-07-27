import { createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types';

const initialState: AppSlice = {
  page: 1,
  isMainLoading: false,
  isDetailsLoading: false,
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
  },
});

export const { setPage, setMainLoading, setDetailLoading } = appSlice.actions;

export default appSlice.reducer;
