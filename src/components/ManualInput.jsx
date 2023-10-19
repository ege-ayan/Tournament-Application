import React, { useState } from 'react';
import '../styles/ManualInputStyle.css'; // Adjust this if needed
import { useNavigate } from 'react-router-dom';
const ManualInput = () => {

    const [playerSize, setPlayerSize] = useState(32); // Default to 32 players
    const [players, setPlayers] = useState(Array.from({ length: playerSize }, () => ({ name: "" })));
    const [isAbsoluteRandom, setIsAbsoluteRandom] = useState(false);
    const [auto, setAuto] = useState(false);
    const navigate = useNavigate();
    const findMatch = () => {
        const isAnyNameEmpty = players.some(player => player.name.trim() === "");
        
        // Validation: Check for empty names
        if (isAnyNameEmpty) {
            alert("All player names must be filled!"); // Set warning message
            return;
        }
        
        navigate('/tournament', { state: { players, isAbsoluteRandom, auto } });
    };
    const handleInputChange = (index, value) => {
        const newPlayers = [...players];
        newPlayers[index].name = value;
        setPlayers(newPlayers);
    };

    const handlePlayerSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPlayerSize(newSize);
        setPlayers(Array.from({ length: newSize }, () => ({ name: "" })));
    };

    return (
        <div className="manual-input-container">
            <h1 className="manual-input-title">2v2 Manual Input</h1>
            
            <select 
                value={playerSize}
                onChange={handlePlayerSizeChange}
                className="player-size-dropdown"
            >
                {[8, 16, 32].map(size => (
                    <option key={size} value={size}>{size} Players</option>
                ))}
            </select>
            
            <div className="grouped-inputs-scrollable">
    {Array.from({ length: playerSize/4 }).map((_, bigContainerIndex) => (
        <div key={bigContainerIndex} className="big-input-container">
            {Array.from({ length: 2 }).map((_, smallContainerIndex) => (
                <React.Fragment key={smallContainerIndex}>
                    <div className="small-input-container">
                        {Array.from({ length: 2 }).map((_, inputIndex) => (
                            <input 
                                type="text" 
                                key={inputIndex}
                                placeholder={`Player ${bigContainerIndex*4 + smallContainerIndex*2 + inputIndex + 1} Name`}
                                value={players[bigContainerIndex*4 + smallContainerIndex*2 + inputIndex].name}
                                onChange={(e) => handleInputChange(bigContainerIndex*4 + smallContainerIndex*2 + inputIndex, e.target.value)}
                            />
                        ))}
                    </div>
                    {/* Display the VS text only after the first small container, not after the second */}
                    {smallContainerIndex === 0 && <span className="vs-text">VS</span>}
                </React.Fragment>
            ))}
        </div>
    ))}
</div>

<div className="button-container">
            <button type="button" className="button"onClick={findMatch} >Start Tournament</button>
            </div>
        </div>
    );
};

export default ManualInput;
