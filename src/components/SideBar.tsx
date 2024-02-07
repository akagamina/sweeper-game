"use client";

import { RootState } from "@/store/store";
import { Difficulty } from "@/types/BoardTypes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

const Sidebar = () => {
  const dispatch = useDispatch();
  const difficultyState = useSelector(
    (state: RootState) => state.game.difficulty
  );

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <>
      {showSidebar ? (
        <div
          className="absolute flex items-center cursor-pointer right-8 top-3 text-black"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span className="relative z-50 text-3xl text-primary">&#x2715;</span>
        </div>
      ) : (
        <div
          className="absolute flex items-center cursor-pointer right-8 top-3"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span className="relative z-50 text-3xl text-primary">&#9744;</span>
        </div>
      )}

      <div
        className={`top-0 right-0 w-40 bg-white  pt-8 px-4 fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
        style={{ transition: "transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0)" }}
      >
        <div className="py-6 space-y-1 sm:px-3">
          {difficulties.map((difficulty: Difficulty, index: number) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                dispatch({ type: "game/setDifficulty", payload: difficulty });
                setShowSidebar(false);
              }}
            >
              <div
                className={`${
                  difficultyState === difficulty
                    ? "text-red-600 bg-red-100"
                    : "text-black"
                } px-3 py-2 text-sm font-medium rounded-md capitalize`}
              >
                {difficulty}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
