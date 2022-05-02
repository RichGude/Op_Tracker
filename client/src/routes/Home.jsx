import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import OperList from '../components/OperList';
import TrackerTable from '../components/TrackerTable';

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <Navbar />
                <OperList />
            </div>
        <div className="container-fluid">
            <TrackerTable />
        </div>
        </div>
    );
};

export default Home;