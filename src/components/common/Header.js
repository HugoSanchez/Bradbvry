import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

import logo from '../../resources/Bradbury.png';
import {Text} from '../common'
import '../../App.css';

const Header = React.memo((props) => {

    const location = useLocation();
    const [active, setActive] = useState(false); 
    const space = useSelector(state => state.user.data.space);
    const user = useSelector(state => state.user.data);

    useEffect(() => {
        let isMounted = true; 
        window.onscroll = function() {
            if(window.pageYOffset === 0 && isMounted) {setActive(false)} else {setActive(true)}
        };
        return () => {isMounted = false;};
    }, [])

    const renderLinks = () => {
        if (space) {
            return (
                <Fragment>
                    <Link to={'/app/' + user.address} id="header-profile-link-container">
                        <HeaderText bold={location.pathname === "/home"}>Home</HeaderText>
                    </Link>
                    <Link to="/settings" id="header-profile-link-container">
                        <HeaderText bold={location.pathname === "/settings"}>Settings</HeaderText>
                    </Link>
                </Fragment>
            );
        }
    }

    return (
        <div id="Header" className={active ? 'active' : null}>
            <img src={logo} id="Header-Image" alt=''/>
            <div className="small-circle-container">
                {
                    window.innerWidth < 600 ?
                    null
                :
                <div>
                    {renderLinks()}
                </div>
                }
                
            </div>
        </div>
    );
});

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
