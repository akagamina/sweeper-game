// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

// RootState ve AppDispatch tiplerini tanımlayın
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;