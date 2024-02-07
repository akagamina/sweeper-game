
export type Difficulty = "easy" | "medium" | "hard";

export type IncrementScore = () => void;

export type HandleGameOver = (value: boolean) => void;

export type BoardProps = {
    difficulty: Difficulty;
    incrementScore: IncrementScore;
    handleGameOver: HandleGameOver;
    gameOver: boolean;
};