import React, { useEffect, useState, useContext } from 'react';
import { OperContext } from '../context/OperContext';
import { AuthoContext } from '../context/AuthContext';
import operFinder from '../apis/operFinder';
import OperHeader from './OperHeader';
import Modal from "./Modal";

const OperList = (props) => {
    const { operations, setOperations } = useContext(OperContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthoContext);

    // Define a state for showing a pop-up modal when editing individual data
    const [ showModal, setShowModal ] = useState(false);
    // Define a state for setting whether the modal is for adding a new record (true) or updating an old (false)
    const [ modalAdd, setModalAdd ] = useState(true);
    // Define a state for saving the id of the operation information to appear in the update model
    const [ operID, setOperID ] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // The axios get request is added to the baseURL value
                const response = await operFinder.get("api/v1/operations/");
                setOperations(response.data.data);
            } catch (e) {
                console.log(e);
            };
        };
        fetchData();
    }, []);

    // Define function for deleting a record from database
    const handleDelete = async (e, id) => {
        try {
            const response = await operFinder.delete(`api/v1/operations/${id}`);
            console.log("Operation successfully deleted");
            setOperations(operations.filter(operation => {
                return operation.id !== id;
            }));
        } catch (e) {
            console.log(e);
        };
    };

    return (<>
        <div className='main'>
            <OperHeader category={1} handleDelete={handleDelete} showModal={showModal} setShowModal={setShowModal} setModalAdd={setModalAdd} setOperID={setOperID} />
            <OperHeader category={2} handleDelete={handleDelete} showModal={showModal} setShowModal={setShowModal} setModalAdd={setModalAdd} setOperID={setOperID} />
            <OperHeader category={3} handleDelete={handleDelete} showModal={showModal} setShowModal={setShowModal} setModalAdd={setModalAdd} setOperID={setOperID} />
        </div>
        <Modal modalAdd={modalAdd} showModal={showModal} setShowModal={setShowModal} operID={operID} />
    </>);
};

export default OperList;