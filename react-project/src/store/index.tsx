import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { characterApi } from './api/characterApi';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
