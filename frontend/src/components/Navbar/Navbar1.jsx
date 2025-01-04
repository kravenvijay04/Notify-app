// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar1.css';


const Navbar1 = () => {


    return (
        <div className="navbar1">
            <div className='title'>
                <img src="./images/logo.png" alt="notify logo" className='logo' />
                <h1>Notify</h1>
            </div>
            <div>
                <img src="./images/calendar.png" alt="calender" className='calender'/>
            </div>
        </div>
    );
};

export default Navbar1;
