import React from 'react';
import Title from './IndexTitle';
import IndexCard from './IndexCard';
import '../styles/IndexPageStyle.css';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        console.log(`Navigating to ${path}`);
        navigate(path);
    };

    const handleSourceCodeClick = () => {
        window.open('https://github.com/ege-ayan/tournament', '_blank');
    };

    return (
        <div className="app-container">
            <Title />
            <div className="card-container">
                <IndexCard 
                    title="Automatic" 
                    onClick={() => handleCardClick('/automatic')}
                    color="#4caf50" 
                />
                <IndexCard 
                    title="Manual" 
                    onClick={() => handleCardClick("/manual")}
                    color="#f44336" 
                />
            </div>
            <div className="button-container"></div>
                <button onClick={handleSourceCodeClick} className="button">Source Code</button>
            </div>
    );
};

export default IndexPage;
