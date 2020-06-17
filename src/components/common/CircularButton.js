import React from 'react';
import {IconContext} from 'react-icons';
import styled from 'styled-components';
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
        <Button id={props.buttonId} onClick={props.onClick}>
            <IconContext.Provider value={{size: size, color: 'gray'}}>
                <IconContainer id={props.iconId}>
                    {props.arrow ? <RiArrowLeftLine /> : null }
                    {props.plus ? <RiAddLine /> : null}
                </IconContainer>
            </IconContext.Provider> 
        </Button>
    );
}



const Button = styled.div`
    z-index: 2;
    bottom: 7rem;
    right: 5rem;
    width: 3rem; 
    height: 3rem; 
    border-radius: 1.5rem;
    background-color: white; 
    position: fixed;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);     
`;


const IconContainer = styled.div`
    margin-top: 0.58rem;
`;

export {CircularButton};
