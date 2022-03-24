import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './routes/Home';
import OperDetailPage from './routes/OperDetailPage';

import { OperContextProvider } from './context/OperContext';
import { AuthoContextProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthoContextProvider>
        <OperContextProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/operations/:id" element={<OperDetailPage />} />
            </Routes>
        </Router>
        </OperContextProvider>
        </AuthoContextProvider>
    )
}

export default App;