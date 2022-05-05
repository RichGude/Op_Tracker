import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './routes/Home';

import { OperContextProvider } from './context/OperContext';
import { AuthoContextProvider } from './context/AuthContext';
import { SrchContextProvider } from './context/SrchContext';

const App = () => {
    return (
        <AuthoContextProvider>
        <OperContextProvider>
        <SrchContextProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
        </SrchContextProvider>
        </OperContextProvider>
        </AuthoContextProvider>
    )
}

export default App;