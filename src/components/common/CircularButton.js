import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {
    RiArrowLeftLine, 
    RiAddLine
} from 'react-icons/ri'
import '../../App.css';

/**
 * @param {path}: where to route on click if any.
 * @param {buttonId}: css id for the circle.
 * @param {iconId}: css id for the icon.
 * @param {arrow}: arrow-left icon. 
 * @param {plus}: plus sign icon.
 */

const CircularButton = props => {

    const  size  = props.arrow ? '25px' : '30px'

    return (
        <Link to={props.path}>
            <div id={props.buttonId}>
                <IconContext.Provider value={{size: size, color: 'gray'}}>
                    <div id={props.iconId}>
                        {props.arrow ? <RiArrowLeftLine /> : null }
                        {props.plus ? <RiAddLine /> : null}
                    </div>
                </IconContext.Provider> 
            </div>
        </Link>
    );
}

export default CircularButton;
