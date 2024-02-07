
import { Difficulty } from '@/types/BoardTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  difficulty: Difficulty;
  score: number;
}

const initialState: GameState = {
  difficulty: 'medium',
  score: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    incrementScore: (state) => {
      state.score = state.score + 1;
    }
  },
});

export const { setDifficulty, incrementScore } = gameSlice.actions;

export default gameSlice.reducer;