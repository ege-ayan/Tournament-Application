import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Matchmaker from './components/MatchMakerInput';
import AutomaticTournament from './components/AutomaticTournament';
import ManualInput from './components/ManualInput';

const App = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
            
                <Route path="/matchmaker" element={<Matchmaker />} />
                <Route path="/automatic-tournament" element={<AutomaticTournament />} />
                <Route path="/interactive" element={<ManualInput />} />
                <Route path="/" element={<IndexPage />} />
            </Routes>
        </Router>
    );
};

export default App;
