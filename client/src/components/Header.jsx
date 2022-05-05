import React, { useContext } from 'react';
import Login from './Login';
import { SrchContext } from '../context/SrchContext';

const Header = () => {
    // Use Search Context for search bar functionality
    const { searchText, setSearchText } = useContext(SrchContext);

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand techops me-0 px-3">
                <div className='tech-h1'><h1>TechOps Tracker</h1></div>
                <label htmlFor="search-form">
                    <input
                        type="search"
                        id="search"
                        className="form-control search"
                        placeholder="Search for Operation"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        aria-label='Search'
                    />
                    <span className="sr-only">Search countries here</span>
                </label>
            </a>
       
            <div className="navbar-nav px-3 inline">
                <Login />
                <a className="nav-link inline share" href="#"><h3>SharePoint</h3></a>
            </div>
        </header>
        );
    };

export default Header;