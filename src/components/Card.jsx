import React from "react";

const Card = ({ id, content, flipped, matched, onClick }) => {
    return (
        <div className="w-16 h-16 cursor-pointer [perspective:1000px]" onClick={() => onClick(id)}>
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] 
                    ${flipped ? "[transform:rotateY(180deg)]" : ""}
                    ${matched ? "opacity-50 animate-highlight" : ""}`}>
                {flipped ?
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-lg flex items-center justify-center text-4xl">
                        {content}
                    </div>
                    :
                    <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden bg-gray-300 rounded-lg flex items-center justify-center text-4xl">
                        🔒
                    </div>
                }
            </div>
        </div>
    );
};

export default Card;
