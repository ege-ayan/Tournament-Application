import React from 'react';
import '../styles/TeamCardStyle.css';

const TeamCard = ({ teamName, player1, player2 }) => {
    return (
        <div className="team-card">
            <h2 className="team-name">{teamName}</h2>
            <p className="player">{player1}</p>
            <p className="player">{player2}</p>
        </div>
    );
};

export default TeamCard;
