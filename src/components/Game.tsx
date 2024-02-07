"use client";

import React, { useCallback, useState } from "react";
import Board from "./Board";
import toast, { Toaster } from "react-hot-toast";
import { delay } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const delayTime: number = 3000;

const Game = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const score = useSelector((state: RootState) => state.game.score);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleIncrementScore = useCallback(() => {
    dispatch({ type: "game/incrementScore", payload: score });
  }, [dispatch, score]);

  const resetGame = useCallback(() => {
    setGameOver(false);
    dispatch({ type: "game/incrementScore", payload: 0 });
  }, [dispatch]);

  const handleGameOver = useCallback(
    async (hasWon: boolean) => {
      setGameOver(true);
      if (hasWon) {
        toast.success(
          `You won the game! New game will start in  ${
            delayTime / 1000
          } seconds`
        );
      } else {
        toast.error(
          `You lost the game! New game will start in  ${
            delayTime / 1000
          } seconds`
        );
      }
      await delay(delayTime);
      resetGame();
    },
    [resetGame]
  );

  return (
    <div className="flex flex-col items-center">
      <Board
        difficulty={difficulty}
        incrementScore={handleIncrementScore}
        handleGameOver={handleGameOver}
        gameOver={gameOver}
      />
      {!gameOver && <p className="text-lg mt-4">Point: {score}</p>}
      <Toaster />
    </div>
  );
};

export default Game;
