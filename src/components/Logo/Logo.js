import React from 'react';
import Tilt from 'react-tilt';
import ai from './ai.png';
import './Logo.css';

const Logo = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}} className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner">
                    <img width="200px" style={{paddingTop: '2px'}} src={ai} alt="ai logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;