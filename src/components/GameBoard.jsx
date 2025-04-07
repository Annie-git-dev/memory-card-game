import React, { useState, useEffect } from "react";
import Card from "./Card";
import Stats from "./Stats";

const GameBoard = ({ difficulty, reset, setIsGameStarted }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matches, setMatches] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const gridSize = {
        easy: 4,
        medium: 6,
        hard: 8,
    };

    const cardContentPool = [
        "🍎", "🍌", "🍍", "🥝", "🍋", "🍓", "🍑", "🥭", "🍅", "🍏", "🍐", "🍆",
        "🍇", "🥥", "🍒", "🍊", "🍉", "🌽", "🍔", "🍕", "🍩", "🍪", "🍰", "🍦",
        "🧁", "🐶", "🐱", "🐵", "🐸", "🧸", "🪁", "🎈"
    ];

    useEffect(() => {
        if (reset) {
            initializeGame();
        }
    }, [reset, difficulty]);

    const initializeGame = () => {
        setCards([]);
        setFlippedCards([]);
        setMatches([]);
        setAttempts(0);
        setIsGameStarted(false);
        setStartTime(null);
        setEndTime(null);

        setTimeout(() => {
            const size = gridSize[difficulty];
            const pairCount = (size * size) / 2;
    
            const selectedContent = shuffle([...cardContentPool]).slice(0, pairCount);
            const duplicated = shuffle([...selectedContent, ...selectedContent]);
    
            const board = duplicated.map((content, index) => ({
                id: index,
                content,
                flipped: false,
                matched: false
            }));
    
            setCards(board);
        }, 50)
    };

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id) => {
        if (!startTime) {
            setIsGameStarted(true);
            setStartTime(Date.now());
        }

        if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) return;

        const updatedCards = [...cards];
        updatedCards[id].flipped = true;
        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setAttempts(prev => prev + 1);
            const first = updatedCards[newFlipped[0]];
            const second = updatedCards[newFlipped[1]];

            if (first.content === second.content) {
                updatedCards[first.id].matched = true;
                updatedCards[second.id].matched = true;

                const newMatches = [...matches, first.content];
                setMatches(newMatches);
                setFlippedCards([]);

                // Game complete
                if (newMatches.length === (updatedCards.length / 2)) {
                    setEndTime(Date.now());
                }
            } else {
                setTimeout(() => {
                    updatedCards[first.id].flipped = false;
                    updatedCards[second.id].flipped = false;
                    setFlippedCards([]);
                    setCards([...updatedCards]);
                }, 500);
            }
        }

        setCards(updatedCards);
    };

    const gridStyle = {
        gridTemplateColumns: `repeat(${gridSize[difficulty]}, 1fr)`,
    };

    return (
        <>
            <div className="grid gap-4" style={gridStyle}>
                {cards?.map((card, index) => (
                    <Card
                        key={index}
                        id={index}
                        content={card.content}
                        flipped={card.flipped}
                        matched={card.matched}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {cards?.length > 0 && (
                <Stats
                    matches={matches}
                    cards={cards}
                    attempts={attempts}
                    startTime={startTime}
                    endTime={endTime}
                    startNewGame={initializeGame}
                />
            )}
        </>
    );
};

export default GameBoard;
