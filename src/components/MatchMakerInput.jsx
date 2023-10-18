import React, { useState } from 'react';
import '../styles/MatchMakerInputStyle.css';
import { useNavigate } from 'react-router-dom';

const ranks = ["Iron","Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "GrandMaster", "Challenger"];
const rankTiers = [1, 2, 3, 4];

const MatchmakerInput = () => {
    const [playerSize, setPlayerSize] = useState(16);
    const [players, setPlayers] = useState(Array.from({ length: playerSize }, () => ({ name: "", rank: "Bronze", rankTier: 1 })));
    const [isAbsoluteRandom, setIsAbsoluteRandom] = useState(false);


    const handleInputChange = (index, field, value) => {
        const newPlayers = [...players];
        newPlayers[index][field] = value;
        setPlayers(newPlayers);
    };

    const handlePlayerSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPlayerSize(newSize);
        setPlayers(Array.from({ length: newSize }, () => ({ name: "", rank: "Bronze", rankTier: 1 })));
    };
    
    const findMatch = () => {
        const isAnyNameEmpty = players.some(player => player.name.trim() === "");
        
        // Validation: Check for empty names
        if (isAnyNameEmpty) {
            alert("All player names must be filled!"); // Set warning message
            return;
        }
        
        // If validation passes, reset warning and navigate to new page
        console.log("Navigating with players:", players);
        navigate('/automatic-tournament', { state: { players, isAbsoluteRandom } });
 // Navigating and passing players as state
    };
    const navigate = useNavigate();
    return (
        <div className="matchmaker-container">
            <h1 className="matchmaker-title">2v2 Automatic Matchmaker</h1>
            <div className="settings-container">
                <select 
                    value={playerSize}
                    onChange={handlePlayerSizeChange}
                    className="player-size-dropdown"
                >
                    {[8, 16, 32].map(size => (
                        <option key={size} value={size}>{size} Players</option>
                    ))}
                </select>
                <div className="absolute-random-container">
                    <input 
                        type="checkbox" 
                        checked={isAbsoluteRandom} 
                        onChange={(e) => setIsAbsoluteRandom(e.target.checked)}
                        id="absoluteRandomCheckbox"
                    />
                    <label htmlFor="absoluteRandomCheckbox">Random</label>
                </div>
            </div>
            <div className="player-inputs-scrollable">
                {players.map((player, index) => (
                    <div key={index} className="player-input-container">
                        <input 
                            type="text" 
                            placeholder={`Player ${index + 1} Name`}
                            value={player.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                        <select 
                            value={player.rank}
                            onChange={(e) => handleInputChange(index, 'rank', e.target.value)}
                            disabled={isAbsoluteRandom}
                        >
                            {ranks.map(rank => (
                                <option key={rank} value={rank}>{rank}</option>
                            ))}
                        </select>
                        <select 
                            value={player.rankTier}
                            onChange={(e) => handleInputChange(index, 'rankTier', e.target.value)}
                            disabled={isAbsoluteRandom}
                        >
                            {rankTiers.map(tier => (
                                <option key={tier} value={tier}>Tier {tier}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            
            <div className="action-container">
            <button type="button" className="matchmaker-button" onClick={findMatch}>Find Match</button>
            </div>
        </div>
    );
};

export default MatchmakerInput;
