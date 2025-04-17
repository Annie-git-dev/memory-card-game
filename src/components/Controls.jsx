import { useState } from "react";
import GameBoard from "./GameBoard";
import { difficulties } from "../constants";
import Difficulties from "./Difficulties";

const Controls = () => {
    const [difficulty, setDifficulty] = useState(difficulties[0]);
    const [gameReset, setGameReset] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="flex gap-4 mb-6">
                {difficulties.map(dif => {
                    return (
                        <Difficulties
                            key={dif.level}
                            dif={dif}
                            isGameStarted={isGameStarted}
                            setDifficulty={setDifficulty}
                            setGameReset={setGameReset}
                        />
                    )
                })}
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