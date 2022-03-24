import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OperDetailPage = () => {
    // Grab id from URL
    const {id} = useParams();

    return (
        <div className="container">
            <h1>Detail Page (to maybe be included)</h1>
        </div>
    );
};

export default OperDetailPage;