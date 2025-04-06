import React from "react";

const Stats = ({ matches, cards, attempts, startTime, endTime, startNewGame }) => {
    const accuracy = attempts > 0 ? Math.round((matches.length / attempts) * 100) : 0;
    const duration = endTime ? Math.floor((endTime - startTime) / 1000) : 0;
    const minutes = Math.floor(duration / 60).toString().padStart(2, "0");
    const seconds = (duration % 60).toString().padStart(2, "0");
    const endGame = matches.length === cards.length / 2;

    return (
        <div className="mt-6 text-center">
            <p>Total Attempts: {attempts}</p>
            {endGame && <p>Time: {minutes}:{seconds}</p>}
            <p>
                Accuracy: <span className={`font-semibold ${accuracy >= 80 ? "text-green-600" : accuracy >= 50 ? "text-yellow-500" : "text-red-500"}`}>{accuracy}%</span>
            </p>
            {endGame && (
                <h2 className="text-2xl mt-4 font-bold text-green-500 animate-bounce">🎉 YOU WON!</h2>
            )}
            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={startNewGame}
            >
                {endGame ? "Play Again" : "Reset"}
            </button>
        </div>
    );
};

export default Stats;
