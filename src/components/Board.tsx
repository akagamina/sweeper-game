import { BoardProps, Difficulty } from "@/types/BoardTypes";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { Toaster } from "react-hot-toast";
import { delay } from "@/utils";

const totalColumns: number = 25;
const playerPositionNumber: number = 12;

const generateMines = (difficulty: Difficulty) => {
  let newCells = new Array(500).fill(false) as boolean[];
  let mineCount =
    difficulty === "hard" ? 150 : difficulty === "medium" ? 100 : 50;
  while (mineCount > 0) {
    const randomIndex = Math.floor(Math.random() * 500);
    if (!newCells[randomIndex] && randomIndex !== playerPositionNumber) {
      newCells[randomIndex] = true;
      mineCount--;
    }
  }
  return newCells;
};

const Board = ({ difficulty, incrementScore, handleGameOver }: BoardProps) => {
  const [cells, setCells] = useState<any>(
    new Array(500).fill(false) as boolean[]
  );
  const [playerPosition, setPlayerPosition] = useState(playerPositionNumber);
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = useCallback(
    async (direction: number) => {
      if (gameOver) {
        return;
      }
      const newPosition = playerPosition + direction;
      if (newPosition < 0 || newPosition >= 500) {
        return;
      }
      if (cells[newPosition]) {
        handleGameOver(false);
        setGameOver(true);
        await delay(5000);
        setGameOver(false);
        const newCells = generateMines(difficulty);
        setCells(newCells);
        setPlayerPosition(playerPositionNumber);
      } else {
        setPlayerPosition(newPosition);
        incrementScore();
        if (newPosition >= 475) {
          handleGameOver(true);
          setGameOver(true);
          await delay(5000);
          setGameOver(false);
          const newCells = generateMines(difficulty);
          setCells(newCells);
          setPlayerPosition(playerPositionNumber);
        }
      }
    },
    [
      cells,
      difficulty,
      gameOver,
      handleGameOver,
      incrementScore,
      playerPosition,
    ]
  );

  useEffect(() => {
    const newCells = generateMines(difficulty);
    setCells(newCells);
  }, [difficulty]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayer(-totalColumns);
          break;
        case "ArrowDown":
          movePlayer(totalColumns);
          break;

        case "ArrowLeft":
          movePlayer(-1);
          break;
        case "ArrowRight":
          movePlayer(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePlayer]);

  return (
    <div
      className="grid grid-cols-25 gap-1 mt-4 border-4 border-black p-1"
      style={{ width: "90vw" }}
    >
      {cells?.map((cell: any, index: number) => (
        <div
          key={index}
          className={`2xl:w-14 2xl:h-14 xl:w-8 xl:h-8 lg:w-8 lg:h-8 scaleUp`}
        >
          <Image
            src={`/images/${
              index === playerPosition
                ? "main-char.png"
                : cell && gameOver
                ? "wrong-choice.png"
                : "main-bg.png"
            }`}
            alt="character"
            width={50}
            height={50}
          />
        </div>
      ))}

      <Toaster />
    </div>
  );
};

export default Board;
