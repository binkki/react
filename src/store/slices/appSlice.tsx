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
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPasswordCopy(state, action) {
      state.password_copy = action.payload;
    },
  },
});

export const { addUncontrolledResult, addReactHookFormResult, setPassword, setPasswordCopy } =
  appSlice.actions;
export default appSlice.reducer;
