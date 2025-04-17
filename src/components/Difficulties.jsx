const Difficulties = ({ dif, isGameStarted, setDifficulty, setGameReset }) => {

    const handleDifficultyChange = (newDifficulty) => {
        if (isGameStarted) {
            const userConfirmed = window.confirm("Changing the mode will reset your game progress. Do you want to continue?");
            if (!userConfirmed) return;
        }

        setDifficulty(newDifficulty);
        setGameReset(true);
    };

    return (
        <button
            className={`px-4 py-2 ${dif.color} text-white rounded-lg`}
            onClick={() => handleDifficultyChange(dif.level)}>
            {dif.level.toUpperCase()}
        </button>
    );
};

export default Difficulties;
