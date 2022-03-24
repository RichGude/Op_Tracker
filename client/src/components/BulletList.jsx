import React from 'react';

const BulletList = (elem) => {
    return (
        <ul className='list-group list-group-flush'>
            <li className="list-group-item">{elem.elem.bullet1}</li>
            {elem.elem.bullet2 ? <li className="list-group-item">{elem.elem.bullet2}</li> : ''}
            {elem.elem.bullet3 ? <li className="list-group-item">{elem.elem.bullet3}</li> : ''}
            {elem.elem.bullet4 ? <li className="list-group-item">{elem.elem.bullet4}</li> : ''}
            {elem.elem.bullet5 ? <li className="list-group-item">{elem.elem.bullet5}</li> : ''}
        </ul>
    );
};

export default BulletList;