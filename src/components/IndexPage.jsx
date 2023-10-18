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



    return (
        <div className="app-container">
            <Title />
            <div className="card-container">
                <IndexCard 
                    title="2v2 Automatic" 
                    onClick={() => handleCardClick('/matchmaker')}
                    color="#4caf50" 
                />
                <IndexCard 
                    title="2v2 Manual" 
                    onClick={() => handleCardClick("/interactive")}
                    color="#f44336" 
                />
            </div>
        </div>
    );
};

export default IndexPage;
