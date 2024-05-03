import { BoardProps, Difficulty } from "@/types/BoardTypes";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { Toaster } from "react-hot-toast";
import { delay } from "@/utils";
import Keyboard from "./Keyboard";

const totalColumns: number = 10;
const playerPositionNumber: number = 5;

const generateMines = (difficulty: Difficulty) => {
  let newCells = new Array(100).fill(false) as boolean[];
  let mineCount =
    difficulty === "hard" ? 30 : difficulty === "medium" ? 20 : 10;
  while (mineCount > 0) {
    const randomIndex = Math.floor(Math.random() * 100);
    if (!newCells[randomIndex] && randomIndex !== playerPositionNumber) {
      newCells[randomIndex] = true;
      mineCount--;
    }
  }
  return newCells;
};

const Board = ({ difficulty, incrementScore, handleGameOver }: BoardProps) => {
  const [cells, setCells] = useState<any>(
    new Array(100).fill(false) as boolean[]
  );
  const [playerPosition, setPlayerPosition] = useState(playerPositionNumber);
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = useCallback(
    async (direction: number) => {
      if (gameOver) {
        return;
      }
      const newPosition = playerPosition + direction;
      if (newPosition < 0 || newPosition >= 100) {
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
        if (newPosition >= 90) {
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
    <>
      <div
        className="grid grid-cols-10 gap-1 mt-4 border-4 border-black p-1"
        style={{ width: "90vw" }}
      >
        {cells?.map((cell: any, index: number) => (
          <div
            key={index}
            className={`2xl:w-14 mx-auto 2xl:h-14 xl:w-8 xl:h-8 lg:w-8 lg:h-8 scaleUp`}
          >
            <Image
              src={`/images/${
                index === playerPosition
                  ? "main-bg.png"
                  : cell && gameOver
                  ? "wrong-choice.png"
                  : "main-char.png"
              }`}
              objectFit="cover"
              className={
                index === playerPosition
                  ? "rounded-full"
                  : cell && gameOver
                  ? "w-5 h-8"
                  : "rounded"
              }
              alt="character"
              width={50}
              height={50}
            />
          </div>
        ))}

        <Toaster />
      </div>
      <Keyboard
        onClick={(direction: string) => {
          switch (direction) {
            case "up":
              movePlayer(-totalColumns);
              break;
            case "down":
              movePlayer(totalColumns);
              break;
            case "left":
              movePlayer(-1);
              break;
            case "right":
              movePlayer(1);
              break;
            default:
              break;
          }
        }}
      />
    </>
  );
};

export default Board;
