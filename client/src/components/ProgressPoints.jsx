// This file is for displaying the progress of each operation.  Each operation will have three dots, colored in as:
//    - An operation with '1' progress will be 1 full circle and 2 hollow, all colored red (for bad...)
//    - An operation with '2' progress will be 2 full circles and 1 hollow, all colored yellow (for moderate...)
//    - An operation with '3' progress will be 3 full circles and 0 hollow, all colored green (for green...)


import React from 'react';

const ProgressPoints = ({progress}) => {

    let canvas = [];
    // There are 
    if (progress === 1) {
        canvas = (
            <svg width="70" height="20">
                <rect x="0" y="0" width="20" height="20" stroke="#dc3545" fill="#dc3545" strokeWidth="2.5"/>
                <rect x="25" y="0" width="20" height="20" stroke="#dc3545" fill="transparent" strokeWidth="2.5"/>
                <rect x="50" y="0" width="20" height="20" stroke="#dc3545" fill="transparent" strokeWidth="2.5"/>
            </svg>)
    } else if (progress === 2) {
        canvas = (
            <svg width="70" height="20">
                <rect x="0" y="0" width="20" height="20" stroke="#ffc107" fill="#ffc107" strokeWidth="2.5"/>
                <rect x="25" y="0" width="20" height="20" stroke="#ffc107" fill="#ffc107" strokeWidth="2.5"/>
                <rect x="50" y="0" width="20" height="20" stroke="#ffc107" fill="transparent" strokeWidth="2.5"/>
            </svg>)
    } else {
        // For progress equals three - if this is not true, there's problems elsewhere in the code.
        canvas = (
            <svg width="70" height="20">
                <rect x="0" y="0" width="20" height="20" stroke="#198754" fill="#198754" strokeWidth="2.5"/>
                <rect x="25" y="0" width="20" height="20" stroke="#198754" fill="#198754" strokeWidth="2.5"/>
                <rect x="50" y="0" width="20" height="20" stroke="#198754" fill="#198754" strokeWidth="2.5"/>
            </svg>)
    };
    return (
        <>
            {canvas}
        </>
    );
};

export default ProgressPoints;