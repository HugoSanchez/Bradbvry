import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {RiArrowLeftLine} from 'react-icons/ri'
import '../../App.css';


const CircularButton = props => {

    const [active, setActive] = useState(false); 

    window.onscroll = function() {
       if(window.pageYOffset === 0) {setActive(false)} else {setActive(true)}
    };

    return (
        <Link to="/">
        <div id="Circular-Button" className={active ? 'active' : null}>
            <IconContext.Provider value={{size:'25px', color: 'gray'}}>
                <div id="circular-button-icon">
                    <RiArrowLeftLine />
                </div>
            </IconContext.Provider> 
        </div>
        </Link>
    );
}

export default CircularButton;
