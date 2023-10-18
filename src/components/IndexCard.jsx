import React from 'react';
import '../styles/IndexCardStyle.css';


const IndexCard = ({ title, onClick, color }) => {
    return (
        <div 
            className="card index-card" 
            onClick={onClick} 
            
        >
            <h2>{title}</h2>
        </div>
    );
};

export default IndexCard;
