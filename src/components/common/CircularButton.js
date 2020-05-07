import React from 'react';
import {IconContext} from 'react-icons';
import {
    RiArrowLeftLine, 
    RiAddLine
} from 'react-icons/ri'
import '../../App.css';

/**
 * @param {onCLick}: function to execute.
 * @param {buttonId}: css id for the circle.
 * @param {iconId}: css id for the icon.
 * @param {arrow}: arrow-left icon. 
 * @param {plus}: plus sign icon.
 */

const CircularButton = props => {

    const  size  = props.arrow ? '25px' : '30px'

    return (
        <div id={props.buttonId} onClick={props.onClick}>
            <IconContext.Provider value={{size: size, color: 'gray'}}>
                <div id={props.iconId}>
                    {props.arrow ? <RiArrowLeftLine /> : null }
                    {props.plus ? <RiAddLine /> : null}
                </div>
            </IconContext.Provider> 
        </div>
    );
}

export {CircularButton};
