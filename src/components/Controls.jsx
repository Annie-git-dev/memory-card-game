import { useState } from "react";
import GameBoard from "./GameBoard";

const Controls = () => {
    const [difficulty, setDifficulty] = useState("easy");
    const [gameReset, setGameReset] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);

    // Handle difficulty change
    const handleDifficultyChange = (newDifficulty) => {
        if (isGameStarted) {
            const userConfirmed = window.confirm("Changing the mode will reset your game progress. Do you want to continue?");
            if (!userConfirmed) return;
        }

        setDifficulty(newDifficulty);
        setGameReset(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => handleDifficultyChange("easy")}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
                >
                    Easy
                </button>
                <button
                    onClick={() => handleDifficultyChange("medium")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                    Medium
                </button>
                <button
                    onClick={() => handleDifficultyChange("hard")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Hard
                </button>
            </div>

            <GameBoard
                difficulty={difficulty}
                reset={gameReset}
                setIsGameStarted={setIsGameStarted}
            />
        </div>
    );
};

export default Controls;  