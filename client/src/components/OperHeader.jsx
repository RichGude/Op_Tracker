import React, { useContext, useEffect, useState } from 'react';
import { OperContext } from '../context/OperContext';
import { AuthoContext } from '../context/AuthContext';
import ProgressPoints from './ProgressPoints';
import BulletList from './BulletList';

const OperHeader = (props) => {

    // Load Contexts
    const { operations, setOperations } = useContext(OperContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthoContext);
    const [ headerDate, setHeaderDate ] = useState('');

    // Determine update date of the Section from Category variable
    // Table entries last updated will appear last in the operations array (since they're stored last), so filter
    //    the operations array to only category values, and select the 'updated' value from the last operation
    
    useEffect(() => {
        if (operations.length) {
            setHeaderDate(operations.filter(operation => operation.category === props.category).at(-1).updated);
        };
    }, [operations])

    // Determine Label of the Section from Category variable
    let headerLabel = '';
    switch (props.category) {
        case 1:     headerLabel = 'Ongoing Technical Operations:'; break;
        case 2:     headerLabel = 'Technical Operations Requests:'; break;
        case 3:     headerLabel = 'Completed Technical Operations:'; break;
    };

    let headerID = '';
    switch (props.category) {
        case 1:     headerID = 'Ongoing'; break;
        case 2:     headerID = 'Requests:'; break;
        case 3:     headerID = 'Completed'; break;
    };

    // Update Function: Open modal and fill with current operation data and push changes
    const handleUpdate = (e, id) => {
        props.setOperID(id);
        props.setModalAdd(false);
        props.setShowModal(!props.showModal);
    };

    // Add Function: Open modal and push changes
    const handleAdd = (e) => {
        props.setModalAdd(true);
        props.setShowModal(!props.showModal);
    };

    // Filter the operations by their category
    const filteredOps = operations.filter((elem) => elem.category === props.category);

    return (<>
        <div id={headerID} ></div>
            <div className="sectionHead d-flex justify-content-between align-items-center">
                <div id='ongoing_title'><h2>{headerLabel}</h2><h4>{filteredOps.length} Reports</h4></div>
                <div className="btn-toolbar mb-2 mb-md-0">
                <button type="button" className="btn btn-outline-secondary calen" id='calen_ongoing'>
                    <span className="feather-calendar"></span> {headerDate}
                </button>
                </div>
            </div>
            <div className="operCards row row-cols-3">
            {filteredOps.map((elem) => {
                return (
                <div key={elem.id} className="card">
                    <div className={`card-header d-flex justify-content-between  ${elem.team_id}`}>
                        <span><b>{elem.requirement}</b></span>
                        {isLoggedIn ? <button onClick={(e) => handleUpdate(e, elem.id)} className='btn btn-warning'>Update</button> : ''}
                        {isLoggedIn ? <button onClick={(e) => props.handleDelete(e, elem.id)} className='btn btn-danger'>Delete</button> : ''}
                    </div>
                    <div className="card-body">
                        <p className="card-text"><i>Capability:</i> {elem.capability}</p>
                        {elem.bullet1 ? <BulletList elem={elem} /> : ''}
                    </div>
                    <div className={`card-footer d-flex justify-content-between align-items-center`}>
                        <b>{elem.status}</b>
                        <span><ProgressPoints progress={elem.progress}/></span>
                    </div>
                </div>
            );})}
            {/* Add a final card for adding new records */}
            {isLoggedIn ? (
            <div onClick={(e) => handleAdd(e)} className="card-final">
                <svg className="add-symbol" viewBox='0 0 3 3'>
                    <path d="M1.4 1.0 h0.2 v0.4 h0.4 v0.2 h-0.4 v0.4 h-0.2 v-0.4 h-0.4 v-0.2 h0.4 z" />
                </svg>
            </div>
            ) : ''}
            </div>
    </>);
};

export default OperHeader;