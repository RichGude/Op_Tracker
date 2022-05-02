// This component is an appearing modal that is used to either update known entries for the Tracker data (Table and Chart data) or 
//    create new ones, based on the boolean state, addModal, which is true for the latter and false for the former

import React, {useRef, useState, useContext, useEffect, useCallback } from 'react';
import operFinder from '../apis/operFinder';
import { OperContext } from '../context/OperContext';

const ModalTrack = ({ trackModalAdd, showTrackModal, setShowTrackModal, trackID }) => {
    // Call upon the commodites state object (for Tracker data) from within Modal
    const { commodities, setCommodities, addCommodities } = useContext(OperContext);

    // Define internal state variables to use
    const [ AAA, setAAA ] = useState("Sample");
    const [ BBB, setBBB ] = useState(0);
    const [ CCC, setCCC ] = useState(0);
    const [ DDD, setDDD ] = useState(0);
    const [ EEE, setEEE ] = useState(0);
    const [ FFF, setFFF ] = useState(0);
    const [ GGG, setGGG ] = useState(0);
    const [ HHH, setHHH ] = useState(0);
    const [ III, setIII ] = useState(0);
    const [ JJJ, setJJJ ] = useState(0);
    const [ KKK, setKKK ] = useState(0);
    const [ LLL, setLLL ] = useState(0);
    const [ MMM, setMMM ] = useState(0);
    const [ NNN, setNNN ] = useState(0);
    const [ OOO, setOOO ] = useState(0);
    const [ PPP, setPPP ] = useState(0);
    const [ QQQ, setQQQ ] = useState(0);
    const [ RRR, setRRR ] = useState(0);
    const [ SSS, setSSS ] = useState(0);
    const [ TTT, setTTT ] = useState(0);
    const [ UUU, setUUU ] = useState(0);
    
    // Don't show the modal animation upon first render
    const firstRender = useRef(true);
    
    // Whenever the modal comes up (i.e., showModel becomes true): run the fetch request from the database if the modal is needed to update, or reset 
    useEffect(() => {
        if (!firstRender) return;
        if (showTrackModal)  {
            // If the modal is used to add a new record, reset the feature values (in case the modal was previously used)
            if (trackModalAdd) {
                setAAA("Sample");
                setBBB(0);
                setCCC(0);
                setDDD(0);
                setEEE(0);
                setFFF(0);
                setGGG(0);
                setHHH(0);
                setIII(0);
                setJJJ(0);
                setKKK(0);
                setLLL(0);
                setMMM(0);
                setNNN(0);
                setOOO(0);
                setPPP(0);
                setQQQ(0);
                setRRR(0);
                setSSS(0);
                setTTT(0);
                setUUU(0);
            } else {
                // If the modal is used to update an existing record, fill in the feature values with what already exists.
                const fetchData = async () => {
                    // Get data about the tracker line highlighted
                    const response = await operFinder.get(`api/v1/tracker/${trackID}`);
                    setAAA(response.data.data.AAA);
                    setBBB(response.data.data.BBB);
                    setCCC(response.data.data.CCC);
                    setDDD(response.data.data.DDD);
                    setEEE(response.data.data.EEE);
                    setFFF(response.data.data.FFF);
                    setGGG(response.data.data.GGG);
                    setHHH(response.data.data.HHH);
                    setIII(response.data.data.III);
                    setJJJ(response.data.data.JJJ);
                    setKKK(response.data.data.KKK);
                    setLLL(response.data.data.LLL);
                    setMMM(response.data.data.MMM);
                    setNNN(response.data.data.NNN);
                    setOOO(response.data.data.OOO);
                    setPPP(response.data.data.PPP);
                    setQQQ(response.data.data.QQQ);
                    setRRR(response.data.data.RRR);
                    setSSS(response.data.data.SSS);
                    setTTT(response.data.data.TTT);
                    setUUU(response.data.data.UUU);
                };
                fetchData();
            } 
        }
    }, [showTrackModal]);

    // Need fade in and out for modal on every showTrackModal change except initial render
    useEffect(() => {
        if ( firstRender.current ) {
            firstRender.current = false
        } else {
            trackModalRef.current.className = showTrackModal ? 'backFadeIn' : 'back FadeOut';
        }
    }, [showTrackModal])

    // Define function for modal submit
    const handleSubmit = async (e) => {
        // Don't reload page on submit
        e.preventDefault();

        // Add a new record to the database
        if (trackModalAdd) {
            // Use a try-catch block with an asyncronous function
            try {
                // Post new entries to the Pool baseURL
                const response = await operFinder.post("api/v1/tracker/", {
                    AAA, BBB, CCC, DDD, EEE, FFF, GGG, HHH, III, JJJ, KKK, LLL, MMM, NNN, OOO, PPP, QQQ, RRR, SSS, TTT, UUU
                });
                // Add new entries to the local state object (no need for new server pull)
                addCommodities(response.data.data);
                console.log("Tracker post successfully added");
            } catch (e) {
                console.log(e);
            };
        } else {
            // Update database
            try {
                const updateCommodity = await operFinder.put(`api/v1/tracker/${trackID}`, {
                    AAA, BBB, CCC, DDD, EEE, FFF, GGG, HHH, III, JJJ, KKK, LLL, MMM, NNN, OOO, PPP, QQQ, RRR, SSS, TTT, UUU
                });
                // Update commodities context so cards show new results
                const updateTrack = {id: trackID, AAA, BBB, CCC, DDD, EEE, FFF, GGG, HHH, III, JJJ, KKK, LLL, MMM, NNN, OOO, PPP, QQQ, RRR, SSS, TTT, UUU};
                setCommodities(commodities.map(el => el.id === updateTrack.id ? updateTrack : el));
                console.log("Tracker post successfully updated");
            } catch (e) {
                console.log(e);
            }
            
        }

        // Don't show modal after submit
        setShowTrackModal(!showTrackModal);
    };
    
    // Close Modal if clicking on the background (i.e., outside the modal)
    const trackModalRef = useRef();
    const closeModal = e => {
        if(trackModalRef.current === e.target) {
            setShowTrackModal(false);
        }
    }

    // Set use to dismiss Modal on 'esc' key press only when Modal is up
    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showTrackModal) {
            setShowTrackModal(false);
        }
    }, [ showTrackModal ])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])

    return (
        <div className='back' ref={trackModalRef} onClick={closeModal}>
            <div className='ModalWrapper'>
                <div className='ModalContent'>
                    {trackModalAdd ? <h1>Add New Commodity</h1> : <h1>Update Commodity</h1>}
                    
                    <form action="" className='container'>
                        <div className='row'>
                        {/* Set commodity name on separate line */}
                        <div className="col-12 mb-2">
                            <label className='descriptor' htmlFor="modal_AAA">AAA</label>
                            <input id='modal_AAA' value={AAA} onChange={e => setAAA(e.target.value)} type="text" className='form-control required' />
                            <div className='descr'><span className='warning-text'>Required AAA Name and each value below</span></div>
                        </div>
                        {/* Every other input is a integer that can't be excluded */}
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_BBB">BBB</label>
                            <input id='modal_BBB' value={BBB} onChange={e => setBBB(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_CCC">CCC</label>
                            <input id='modal_CCC' value={CCC} onChange={e => setCCC(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_DDD">DDD</label>
                            <input id='modal_DDD' value={DDD} onChange={e => setDDD(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_EEE">EEE</label>
                            <input id='modal_EEE' value={EEE} onChange={e => setEEE(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_FFF">FFF</label>
                            <input id='modal_FFF' value={FFF} onChange={e => setFFF(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_GGG">GGG</label>
                            <input id='modal_GGG' value={GGG} onChange={e => setGGG(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_HHH">HHH</label>
                            <input id='modal_HHH' value={HHH} onChange={e => setHHH(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_III">III</label>
                            <input id='modal_III' value={III} onChange={e => setIII(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_JJJ">JJJ</label>
                            <input id='modal_JJJ' value={JJJ} onChange={e => setJJJ(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_KKK">KKK</label>
                            <input id='modal_KKK' value={KKK} onChange={e => setKKK(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_LLL">LLL</label>
                            <input id='modal_LLL' value={LLL} onChange={e => setLLL(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_MMM">MMM</label>
                            <input id='modal_MMM' value={MMM} onChange={e => setMMM(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_NNN">NNN</label>
                            <input id='modal_NNN' value={NNN} onChange={e => setNNN(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_OOO">OOO</label>
                            <input id='modal_OOO' value={OOO} onChange={e => setOOO(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_PPP">PPP</label>
                            <input id='modal_PPP' value={PPP} onChange={e => setPPP(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_QQQ">QQQ</label>
                            <input id='modal_QQQ' value={QQQ} onChange={e => setQQQ(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_RRR">RRR</label>
                            <input id='modal_RRR' value={RRR} onChange={e => setRRR(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_SSS">SSS</label>
                            <input id='modal_SSS' value={SSS} onChange={e => setSSS(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_TTT">TTT</label>
                            <input id='modal_TTT' value={TTT} onChange={e => setTTT(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        <div className="col-2 mb-2">
                            <label className='descriptor' htmlFor="modal_UUU">UUU</label>
                            <input id='modal_UUU' value={UUU} onChange={e => setUUU(e.target.value)} type="text" className='form-control required' />
                            {/* <div className='descr'><span className='warning-text'>Required Input</span></div> */}
                        </div>
                        </div>
                        <button type="submit" onClick={(e) => handleSubmit(e)} className='btn btn-dark center'>{trackModalAdd ? 'Add' : 'Update'}</button>
                    </form>
                </div>
                <button className='CloseModalButton' aria-label='Close Modal' onClick={() => setShowTrackModal(!showTrackModal)}><i className='fa fa-times' /></button>
            </div>
        </div>
    );
};

export default ModalTrack;