import { createSlice } from '@reduxjs/toolkit';
import { AppSlice } from '../../types';

const initialState: AppSlice = {
  page: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = appSlice.actions;

export default appSlice.reducer;
