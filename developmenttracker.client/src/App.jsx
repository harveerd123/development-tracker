import React from 'react';
import Home from './pages/Home'; 
import NavigationBar from './components/NavigationBar';
import { Route, Routes } from 'react-router-dom'
import Developments from './pages/Developments';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/developments" element={<Developments />} />
            </Routes>
        </div>
    );
};

export default App;
