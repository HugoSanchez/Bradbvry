import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom'

import logo from '../../resources/Bradbury.png';
import {Text} from '../common'
import '../../App.css';

const Header = props => {
    
    let location = useLocation();
    const [active, setActive] = useState(false); 

    window.onscroll = function() {
        if(window.pageYOffset === 0) {setActive(false)} else {setActive(true)}
    };

    return (
        <div id="Header" className={active ? 'active' : null}>
            <img src={logo} id="Header-Image" alt=''/>
            <div className="small-circle-container">
                {
                    window.innerWidth < 600 ?
                    null
                :
                <div>
                    <Link to="/home" id="header-profile-link-container">
                        <HeaderText bold={location.pathname === "/home"}>Home</HeaderText>
                    </Link>
                    <Link to="/settings" id="header-profile-link-container">
                        <HeaderText bold={location.pathname === "/settings"}>Settings</HeaderText>
                    </Link>
                </div>
                }
                
            </div>
        </div>
    );
}

const HeaderText = styled(Text)`
    padding-left: 2.5vw;
    padding-right: 2.5vw;
    font-weight: ${props => props.bold ? '500' : '300'};
    
    display: inline;
    transition: 0.4s ease-out;

    &:hover{
        font-style: ${props => props.bold ? null : 'italic'};;
    }
`;

export {Header};
