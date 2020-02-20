import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../resources/Bradbury.png';
import '../../App.css';

const Header = props => {

    const [active, setActive] = useState(false); 

    window.onscroll = function() {
        if(window.pageYOffset === 0) {setActive(false)} else {setActive(true)}
    };

    return (
        <div id="Header" className={active ? 'active' : null}>
            <img src={logo} id="Header-Image" alt=''/>
            <div className="small-circle-container">
                <Link to="/home" id="header-profile-link-container">
                    <p id="header-profile-link">Home</p>
                </Link>
                <Link to="/home" id="header-profile-link-container">
                    <p id="header-profile-link">Settings</p>
                </Link>
            </div>
        </div>
    );
}

export default Header;
