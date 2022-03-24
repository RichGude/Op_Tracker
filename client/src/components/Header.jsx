import React, { useContext } from 'react';
import Login from './Login';
import { AuthoContext } from '../context/AuthContext';

const Header = () => {
    // Use AuthoContext for Admin User authentication
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthoContext);

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand techops me-0 px-3" href="#"><div className='tech-h1'><h1>TechOps Tracker</h1></div>
            <input type='text' id='search' className='form-control search' autoComplete='off' placeholder='Search for Operation' aria-label='Search' /></a>
       
            <div className="navbar-nav px-3 inline">
                <Login />
                <a className="nav-link inline share" href="#"><h3>SharePoint</h3></a>
            </div>
        </header>
        );
    };

export default Header;