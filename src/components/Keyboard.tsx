import React from "react";

type onClickType = (direction: string) => void;

const DirectionalKeys = ({ onClick }: { onClick: onClickType }) => {
  const keys = [
    { label: "▲", id: "up" }, // Up
    { label: "◄", id: "left" }, // Left
    { label: "▼", id: "down" }, // Down
    { label: "►", id: "right" }, // Right
  ];

  return (
    <main className="min-w-screen  text-white flex items-center justify-center">
      <div className=" p-5 rounded-lg shadow-xl">
        <div className="p-2 rounded-lg overflow-hidden flex flex-col items-center space-y-4">
          {/* Up Button */}
          <button
            className="button-style rounded-lg"
            onClick={() => {
              onClick("up");
            }}
          >
            {keys[0].label}
          </button>
          {/* Left, Down, Right Buttons */}
          <div className="flex space-x-4">
            {keys.slice(1).map((key, index) => (
              <button
                onClick={() => {
                  onClick(key.id);
                }}
                key={index}
                className="button-style rounded-lg"
              >
                {key.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DirectionalKeys;
