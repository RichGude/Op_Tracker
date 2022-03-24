import React, { useContext, useState } from 'react';
import operFinder from '../apis/operFinder';
import { OperContext } from '../context/OperContext';

const AddOper = () => {
    // Set state values for each new entry variable
    const [ requirement, setRequirement ] = useState("");
    const [ team, setTeam ] = useState("");
    const [ team_id, setTeam_ID ] = useState("Team ID");
    const [ obj_opn, setObj_Opn ] = useState("");
    const [ capability, setCapability ] = useState("");
    const [ progress, setProgress ] = useState("Progress");
    const [ status, setStatus ] = useState("");
    const [ document, setDocument ] = useState("");
    const [ category, setCategory ] = useState("Category");
    const [ completed, setCompleted ] = useState("");
    const [ bullet1, setBullet1 ] = useState("");
    const [ bullet2, setBullet2 ] = useState("");
    const [ bullet3, setBullet3 ] = useState("");
    const [ bullet4, setBullet4 ] = useState("");
    const [ bullet5, setBullet5 ] = useState("");
    const [ poc, setPOC ] = useState("");

    const { addOperations } = useContext(OperContext)

    // Define a function for submit new additions to the database
    const handleSubmit = async (e) => {
        // Prevent the page from automatically reloading on form submit (loses State)
        e.preventDefault();
        try {
            // Post new entries to the Pool baseURL
            const response = await operFinder.post("/", {
                requirement,    team,   team_id,    obj_opn,    capability,     progress,   status,  document,
                category,       completed,  bullet1,    bullet2,    bullet3,    bullet4,    bullet5,    poc
            });
            addOperations(response.data.data);
            console.log("Post successfully added");
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <div className='container mb-4'>
            <form onSubmit={handleSubmit} className='form-inline'>
                <div className="row">
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_requirement">Requirement</label>
                        <input id='modal_requirement' value={requirement} onChange={e => setRequirement(e.target.value)} type="text" className='form-control' />
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_team">Team</label>
                        <input id='modal_team' value={team} onChange={e => setTeam(e.target.value)} type="text" className='form-control' />
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_team_id">Team ID</label>
                        <select id='modal_team_id' value={team_id} onChange={e => setTeam_ID(e.target.value)} className='custom-select my-1 mr-sm-2'>
                            <option disabled>Team ID</option>
                            <option value='AAA'>AAA</option>
                            <option value='BBB'>BBB</option>
                            <option value='CCC'>CCC</option>
                            <option value='DDD'>DDD</option>
                            <option value='EEE'>EEE</option>
                            <option value='FFF'>FFF</option>
                            <option value='GGG'>GGG</option>
                            <option value='HHH'>HHH</option>
                        </select>
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_obj_opn">Objective</label>
                        <input id='modal_obj_opn' value={obj_opn} onChange={e => setObj_Opn(e.target.value)} type="text" className='form-control' />
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_progress">Progress</label>
                        <select id='modal_progress' value={progress} onChange={e => setProgress(e.target.value)} className='custom-select my-1 mr-sm-2'>
                            <option disabled>Progress</option>
                            <option value='1'>Not Started</option>
                            <option value='2'>Underway</option>
                            <option value='3'>Deployed</option>
                        </select>
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_status">Status</label>
                        <input id='modal_status' value={status} onChange={e => setStatus(e.target.value)} type="text" className='form-control' />
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_document">Document</label>
                        <input id='modal_document' value={document} onChange={e => setDocument(e.target.value)} type="text" className='form-control' />
                    </div>
                    <div className="col-4 mb-2">
                        <label className='descriptor' htmlFor="modal_category">Category</label>
                        <select id='modal_category' value={category} onChange={e => setCategory(e.target.value)} className='custom-select my-1 mr-sm-2'>
                            <option disabled>Category</option>
                            <option value='1'>Upcoming</option>
                            <option value='2'>Ongoing</option>
                            <option value='3'>Completed</option>
                        </select>
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
                        <input id='modal_poc' value={poc} onChange={e => setPOC(e.target.value)} type="text" className='form-control' placeholder='Person of Contact Info' />
                    </div>
                    <button type="submit" className='btn btn-dark col'>Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddOper;