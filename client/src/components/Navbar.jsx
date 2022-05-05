import React from 'react';

const Navbar = () => {
    return (
        <nav id="sidebarMenu" className="sidenav">
            <a className="nav-link active" aria-current="page" href="#Ongoing">
                <span className="feather-users"></span> Ongoing Ops
            </a>
            <a className="nav-link" href="#Requests">
                <span className="feather-layers"></span> Request Ops
            </a>
            <a className="nav-link" href="#Completed">
                <span className="feather-file"></span> Complete Ops
            </a>
            <a className="nav-link" href="#Stats">
                <span className="feather-bar-chart-2"></span> Tech Ops Stats
            </a>
        </nav>
    );
};

export default Navbar;