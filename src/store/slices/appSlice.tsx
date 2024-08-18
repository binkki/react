import { createSlice } from '@reduxjs/toolkit';
import { defaultAppSliceValue } from '../../utils/constants';
import { AppSliceType } from '../../types';

const initialState: AppSliceType = defaultAppSliceValue;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addUncontrolledResult(state, action) {
      state.uncontrolledFormResults.push(action.payload);
    },
    addReactHookFormResult(state, action) {
      state.reacthookformResults.push(action.payload);
    },
  },
});

export const { addUncontrolledResult, addReactHookFormResult } = appSlice.actions;
export default appSlice.reducer;
