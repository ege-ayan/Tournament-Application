import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Tournament from './components/Tournament';
import ManualInput from './components/ManualInput';
import AutomaticInput from './components/AutomaticInput';

const App = () => {
    return (
        <Router>
            <Routes>
            
                <Route path="/automatic" element={<AutomaticInput />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/manual" element={<ManualInput />} />
                <Route path="/" element={<IndexPage />} />
            </Routes>
        </Router>
    );
};

export default App;
