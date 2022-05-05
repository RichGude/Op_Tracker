// This component is an appearing modal that is used to either update known entries for the Operations data (Card data) or 
//    create new ones, based on the boolean state, addModal, which is true for the latter and false for the former

import React, {useRef, useState, useContext, useEffect, useCallback } from 'react';
import operFinder from '../apis/operFinder';
import { OperContext } from '../context/OperContext';

const ModalOper = ({ modalAdd, showModal, setShowModal, operID }) => {
    // Call upon the operations state object from within Modal
    const { operations, setOperations, addOperations } = useContext(OperContext);

    // Define a function for getting the current date in SQL format
    const todayDateFormat = () => {
        var today = new Date();
        // Use padStart to ensure 0's for single digit days and months
        var dd = String(today.getDate()).padStart(2, '0');
        // Months in Date() start at 00 for January
        var mmm = today.toLocaleString('en-US', {month: 'short'}).toUpperCase();
        var yy = today.getFullYear().toString();
    
        today = dd + mmm + yy.slice(2);

        return today
    };

    // Define internal state variables to use
    const [ requirement, setRequirement ] = useState("");
    const [ team, setTeam ] = useState("");
    const [ team_id, setTeam_ID ] = useState("AAA");
    const [ obj_opn, setObj_Opn ] = useState("");
    const [ capability, setCapability ] = useState("");
    const [ progress, setProgress ] = useState(1);
    const [ status, setStatus ] = useState("");
    // Had to change document(t) name because I was accidentally overwriting important JS document features...
    const [ documentt, setDocument ] = useState("");
    const [ category, setCategory ] = useState(1);
    const [ completed, setCompleted ] = useState("");
    const [ bullet1, setBullet1 ] = useState("");
    const [ bullet2, setBullet2 ] = useState("");
    const [ bullet3, setBullet3 ] = useState("");
    const [ bullet4, setBullet4 ] = useState("");
    const [ bullet5, setBullet5 ] = useState("");
    const [ poc, setPOC ] = useState("");
    const [ updated, setUpdated ] = useState(todayDateFormat());

    const firstRender = useRef(true);
    
    // Whenever the modal comes up (i.e., showModel becomes true): run the fetch request from the database if the modal is needed to update, or reset 
    useEffect(() => {
        if (!firstRender) return;
        if (showModal)  {
            // If the modal is used to add a new record, reset the feature values (in case the modal was previously used)
            if (modalAdd) {
                setRequirement("");
                setTeam("");
                setTeam_ID("AAA");
                setObj_Opn("");
                setCapability("");
                setProgress(1);
                setStatus("");
                setDocument("");
                setCategory(1);
                setCompleted("");
                setBullet1("");
                setBullet2("");
                setBullet3("");
                setBullet4("");
                setBullet5("");
                setPOC("");
                setUpdated(todayDateFormat());
            } else {
                // If the modal is used to update an existing record, fill in the feature values with what already exists.
                const fetchData = () => {            
                    // Find object in operations array
                    const operToUpdate = operations.filter(obj => obj.id === operID)[0];
                    setRequirement(operToUpdate.requirement);
                    setTeam(operToUpdate.team);
                    setTeam_ID(operToUpdate.team_id);
                    setObj_Opn(operToUpdate.obj_opn);
                    setCapability(operToUpdate.capability);
                    setProgress(operToUpdate.progress);
                    setStatus(operToUpdate.status);
                    setDocument(operToUpdate.document || "");
                    setCategory(operToUpdate.category);
                    setCompleted(operToUpdate.completed || "");
                    setBullet1(operToUpdate.bullet1 || "");
                    setBullet2(operToUpdate.bullet2 || "");
                    setBullet3(operToUpdate.bullet3 || "");
                    setBullet4(operToUpdate.bullet4 || "");
                    setBullet5(operToUpdate.bullet5 || "");
                    setPOC(operToUpdate.poc || "");
                    setUpdated(operToUpdate.updated);
                };
                fetchData();
            } 
        }
    }, [showModal]);

    // Need fade in and out for modal on every showModal change except initial render
    useEffect(() => {
        if ( firstRender.current ) {
            firstRender.current = false
        } else {
            modalRef.current.className = showModal ? 'backFadeIn' : 'back FadeOut';
        }
    }, [showModal])

    // Define function for modal submit
    const handleSubmit = async (e) => {
        // Don't reload page on submit
        e.preventDefault();

        // Add a new record to the database
        if (modalAdd) {
            // Use a try-catch block with an asyncronous function
            try {
                // Post new entries to the Pool baseURL
                // Need to change completion date if empty before uploading to SQL database.
                const submitObj = {
                    requirement,    team,   team_id,    obj_opn,    capability,     progress,   status,  documentt, category,
                    completed: ( (completed === "") ? null : completed),  bullet1,    bullet2,    bullet3,    bullet4,    bullet5,    poc, 
                    updated: todayDateFormat(),
                };
                console.log(submitObj);
                const response = await operFinder.post("api/v1/operations/", submitObj);
                addOperations(response.data.data);
                console.log(response);
            } catch (e) {
                console.log(e);
            };
        } else {
            // Update database
            // Need to change completion date if empty before uploading to SQL database.
            const updateOperation = await operFinder.put(`api/v1/operations/${operID}`, {
                requirement,    team,   team_id,    obj_opn,    capability,     progress,   status,  documentt, category,
                completed: ( (completed === "") ? null : completed),  bullet1,    bullet2,    bullet3,    bullet4,    bullet5,    poc,  updated: todayDateFormat(),
            });
            console.log(updateOperation);

            // Update operations context so cards show new results
            const updateOper = {id: operID, requirement,    team,   team_id,    obj_opn,    capability,     progress,   status,  documentt,
                category,       completed,  bullet1,    bullet2,    bullet3,    bullet4,    bullet5,    poc,    updated: todayDateFormat()};
            setOperations(operations.map(el => el.id === updateOper.id ? updateOper : el));
        }

        // Don't show modal after submit
        setShowModal(!showModal);
    };
    
    // Close Modal if clicking on the background (i.e., outside the modal)
    const modalRef = useRef();
    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    // Set use to dismiss Modal on 'esc' key press only when Modal is up
    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
            setShowModal(false);
        }
    }, [ showModal ])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])

    return (
        <div className='back' ref={modalRef} onClick={closeModal}>
            <div className='ModalWrapper'>
                <div className='ModalContent'>
                    {modalAdd ? <h1>Add New Operation</h1> : <h1>Update Operation</h1>}
                    
                    <form action="" className='container'>
                        <div className='row'>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_requirement">Requirement</label>
                            <input id='modal_requirement' value={requirement} onChange={e => setRequirement(e.target.value)} type="text" className='form-control required' />
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_team">Team</label>
                            <input id='modal_team' value={team} onChange={e => setTeam(e.target.value)} type="text" className='form-control required' />
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_team_id">Team ID</label>
                            <select id='modal_team_id' value={team_id} onChange={e => setTeam_ID(e.target.value)} className='custom-select required my-1 mr-sm-2'>
                                <option value='AAA'>AAA</option>
                                <option value='BBB'>BBB</option>
                                <option value='CCC'>CCC</option>
                                <option value='DDD'>DDD</option>
                                <option value='EEE'>EEE</option>
                                <option value='FFF'>FFF</option>
                                <option value='GGG'>GGG</option>
                                <option value='HHH'>HHH</option>
                            </select>
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_obj_opn">Objective</label>
                            <input id='modal_obj_opn' value={obj_opn} onChange={e => setObj_Opn(e.target.value)} type="text" className='form-control required' />
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_progress">Progress </label>
                            <select id='modal_progress' value={progress} onChange={e => setProgress(e.target.value)} className='custom-select required my-1 mr-sm-2'>
                                <option value='1'>Not Started</option>
                                <option value='2'>Underway</option>
                                <option value='3'>Deployed</option>
                            </select>
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_status">Status</label>
                            <input id='modal_status' value={status} onChange={e => setStatus(e.target.value)} type="text" className='form-control required' />
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_document">Document</label>
                            <input id='modal_document' value={documentt} onChange={e => setDocument(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_category">Category </label>
                            <select id='modal_category' value={category} onChange={e => setCategory(e.target.value)} className='custom-select required my-1 mr-sm-2'>
                                <option value='1'>Ongoing</option>
                                <option value='2'>Requests</option>
                                <option value='3'>Completed</option>
                            </select>
                            <div className='descr'><span className='warning-text'>Required Input</span></div>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_completed">Completion Date</label>
                            <input id='modal_completed' value={completed} onChange={e => setCompleted(e.target.value)} type="date" className='form-control' min='2020-01-01' max='2050-01-01'/>
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_bullet1">Bullet Descriptor</label>
                            <input id='modal_bullet1' value={bullet1} onChange={e => setBullet1(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_bullet2">Bullet Descriptor</label>
                            <input id='modal_bullet2' value={bullet2} onChange={e => setBullet2(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_bullet3">Bullet Descriptor</label>
                            <input id='modal_bullet3' value={bullet3} onChange={e => setBullet3(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_bullet4">Bullet Descriptor</label>
                            <input id='modal_bullet4' value={bullet4} onChange={e => setBullet4(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_bullet5">Bullet Descriptor</label>
                            <input id='modal_bullet5' value={bullet5} onChange={e => setBullet5(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className="col-4 mb-2">
                            <label className='descriptor' htmlFor="modal_poc">Point of Contact</label>
                            <input id='modal_poc' value={poc} onChange={e => setPOC(e.target.value)} type="text" className='form-control' />
                        </div>
                        </div>
                        <button type="submit" onClick={(e) => handleSubmit(e)} className='btn btn-dark align-content-center'>{modalAdd ? 'Add' : 'Update'}</button>
                    </form>
                </div>
                <button className='CloseModalButton' aria-label='Close Modal' onClick={() => setShowModal(!showModal)}><i className='fa fa-times' /></button>
            </div>
        </div>
    );
};

export default ModalOper;