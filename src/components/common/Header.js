import React, {useState} from 'react';
import logo from '../../resources/Bradbury.png'
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

            </div>
        </div>
    );
}

export default Header;
