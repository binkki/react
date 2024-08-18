import { createSlice } from '@reduxjs/toolkit';
import { countriesList } from '../../utils/constants';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    countries: countriesList,
  },
  reducers: {},
});

export default appSlice.reducer;
